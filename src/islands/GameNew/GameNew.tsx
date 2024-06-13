import type { GameNew } from '../../models/interfaces/gamenews';
import type { ReactElement } from 'react';
import './GameNew.scss';

interface Props {
  gamenew: GameNew;
}

const imageSize = 100;

function GameNew({ gamenew }: Props): ReactElement {
  const { brand, brandKey, title, author, publishedAt, url } = gamenew;

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
        width={imageSize}
        height={imageSize}
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
