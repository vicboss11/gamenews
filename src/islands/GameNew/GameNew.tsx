import { Image } from 'astro:assets';
import type { GameNew } from '../../models/interfaces/gamenews';
import type { ReactElement } from 'react';
import './GameNew.scss';

interface Props {
  gamenew: GameNew;
}

function GameNew({ gamenew }: Props): ReactElement {
  const { brand, brandKey, title, author, publishedAt, url } = gamenew;

  const images = import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/web-brands/*.webp',
  );

  const size = 100;
  const formattedPublishedAt = new Date(publishedAt)
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .split(' de ')
    .join(' ')
    .toUpperCase();

  return (
    <a
      className={`gamenew gamenew-${brandKey}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="gamenew-brand-logo"
        src={`/src/assets/web-brands/${brandKey}.webp`}
        alt={`Logo de ${brand}`}
        width={size}
        height={size}
        loading="lazy"
      />

      <h3 className="gamenew-title">{title}</h3>

      <p className="gamenew-info">
        <span className="gamenew-brand">{brand}</span>
        <span className="gamenew-author">{author}</span>

        <time className="gamenew-date" dateTime={publishedAt.toString()}>
          {formattedPublishedAt}
        </time>
      </p>
    </a>
  );
}

export default GameNew;
