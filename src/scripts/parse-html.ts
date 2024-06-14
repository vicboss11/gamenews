import type { Heading } from '../models/interfaces/html';
import type { Segment } from '../models/interfaces/segments';
import type { Shortcode } from '../models/interfaces/shortcodes';
import {
  getComponentFromShortcode,
  getShortcodesFromHtml,
  updateTocShortcodeWithHeadings,
} from './shortcode';

function parseHtml(html: string): { html: string; segments: Segment[] } {
  let sanitizedHtml = sanitizeHtml(html);

  let shortcodes = getShortcodesFromHtml(sanitizedHtml);

  if (shortcodes.some((shortcode) => shortcode.name === 'ToC')) {
    const { html: resultHtml, headings } = parseHTMLHeadings(sanitizedHtml, [
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ]);

    sanitizedHtml = resultHtml;
    shortcodes = updateTocShortcodeWithHeadings(shortcodes, headings);
  }

  return {
    html: sanitizedHtml,
    segments: getHtmlSegments(sanitizedHtml, shortcodes),
  };
}

function sanitizeHtml(html: string): string {
  return html.replace(/<br\s*\/?>/gi, '');
}

function getHtmlSegments(html: string, shortcodes: Shortcode[]): Segment[] {
  const segments: Segment[] = [];

  let lastIndex = 0;

  for (const shortcode of shortcodes) {
    const replacement = getComponentFromShortcode(shortcode);

    segments.push({
      type: 'html',
      content: html.substring(lastIndex, shortcode.index),
    });

    segments.push({
      type: 'component',
      component: replacement.component,
      props: replacement.props,
    });

    lastIndex = shortcode.index + shortcode.original.length;
  }

  segments.push({
    type: 'html',
    content: html.substring(lastIndex),
  });

  return segments;
}

function parseHTMLHeadings(
  html: string,
  headingTags: string[],
): { html: string; headings: Heading[] } {
  const headings = [];

  const headingsTagPattern = headingTags
    .map((tag) => tag.toLowerCase())
    .join('|');

  const regex = new RegExp(
    `<(${headingsTagPattern})\\b[^>]*>(.*?)</\\1>`,
    'gi',
  );

  let match;

  while ((match = regex.exec(html)) !== null) {
    const tag = match[1];
    const text = match[2].trim();
    const id = generateIdFromText(text);

    headings.push({
      tag,
      text,
      id,
    });

    html = html.replace(match[0], `<${tag} id="${id}">${text}</${tag}>`);
  }

  return { html, headings };
}

function generateIdFromText(text: string): string {
  const accentMap: { [key: string]: string } = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U',
    ä: 'a',
    ë: 'e',
    ï: 'i',
    ö: 'o',
    ü: 'u',
    Ä: 'A',
    Ë: 'E',
    Ï: 'I',
    Ö: 'O',
    Ü: 'U',
    ñ: 'n',
    Ñ: 'N',
    ç: 'c',
    Ç: 'C',
  };

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, (char) => accentMap[char] || '')
    .replace(/\s+/g, '-');
}

export function extractCleanSectionContent(html: string): string {
  const sectionRegex =
    /<section\b[^>]*class\s*=\s*["'][^"']*\bpost-description\b[^"']*["'][^>]*>(.*?)<\/section>|<section\b[^>]*>(.*?)<\/section>/is;

  const matches = html.match(sectionRegex);

  let sectionContent = '';

  if (matches) {
    const postDescriptionSection = matches.find((match) =>
      /class\s*=\s*["'][^"']*\bpost-description\b[^"']*["']/.test(match),
    );

    if (postDescriptionSection) {
      sectionContent = postDescriptionSection;
    } else {
      sectionContent = matches[0];
    }
  } else {
    return '';
  }

  if (sectionContent) {
    const contentRegex = /<section\b[^>]*>(.*?)<\/section>/is;
    const contentMatch = sectionContent.match(contentRegex);

    if (contentMatch) {
      sectionContent = contentMatch[1];
    }

    const strippedContent = sectionContent.replace(/<\/?[^>]+(>|$)/g, '');
    const cleanedContent = strippedContent.replace(/\[.*?\]/g, '');

    return cleanedContent;
  }

  return '';
}

export default parseHtml;
