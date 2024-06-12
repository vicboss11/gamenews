import type { Heading } from '../models/interfaces/html';
import type {
  Shortcode,
  ShortcodeAttributes,
} from '../models/interfaces/shortcodes';

export function getShortcodesFromHtml(html: string): Shortcode[] {
  const shortcodes: Shortcode[] = [];
  const shortcodeRegex = /\[(\w+)(.*?)\]/g;

  let match;

  while ((match = shortcodeRegex.exec(html)) !== null) {
    const name = match[1];
    const attributesString = match[2].trim();

    const shortcodeAttributes: ShortcodeAttributes = {};
    const attrRegex = /(\w+)=['"](.*?)['"]/g;

    let attrMatch;

    while ((attrMatch = attrRegex.exec(attributesString)) !== null) {
      shortcodeAttributes[attrMatch[1]] = attrMatch[2];
    }

    shortcodes.push({
      name,
      attributes: shortcodeAttributes,
      original: match[0],
      index: match.index,
    });
  }

  return shortcodes;
}

export function updateTocShortcodeWithHeadings(
  shortcodes: Shortcode[],
  headings: Heading[],
) {
  return shortcodes.map((shortcode) =>
    shortcode.name === 'ToC'
      ? {
          ...shortcode,
          attributes: {
            headings: JSON.stringify(headings),
          },
        }
      : shortcode,
  );
}

export function getComponentFromShortcode(shortcode: Shortcode): {
  component: string | null;
  props: {
    [key: string]: string | null;
  };
} {
  switch (shortcode.name) {
    case 'GameNews':
      return {
        component: 'GameNews',
        props: {
          from: shortcode.attributes?.from,
        },
      };
    case 'LinkCards': {
      return {
        component: 'LinkCards',
        props: {},
      };
    }
    case 'Posts':
      return {
        component: 'Posts',
        props: {
          category: shortcode.attributes?.category,
        },
      };
    case 'PostInfo':
      return {
        component: 'PostInfo',
        props: {},
      };
    case 'ToC':
      return {
        component: 'TableOfContents',
        props: {
          title: shortcode.attributes?.title,
          headings: shortcode.attributes?.headings,
        },
      };
    default:
      return { component: null, props: {} };
  }
}
