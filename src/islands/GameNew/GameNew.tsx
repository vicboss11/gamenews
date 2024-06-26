import type { GameNew } from '../../models/interfaces/gamenews';
import type { ReactElement } from 'react';
import '@github/relative-time-element';
import './GameNew.scss';
import { isToday } from '../../scripts/date-utils';

interface Props {
  gamenew: GameNew;
}

const imageSize = 100;

function GameNew({ gamenew }: Props): ReactElement {
  const { brand, brandKey, title, author, publishedAt, url } = gamenew;
  const publishedAtString = publishedAt.toString();

  const formattedPublishedAt = new Date(publishedAt)
    .toLocaleDateString('es-ES', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .split(' de ')
    .join(' ')
    .toUpperCase();

  const getBrandLogo = (brandKey: string) => {
    return new URL(`../../assets/web-brands/${brandKey}.webp`, import.meta.url)
      .href;
  };

  return (
    <a
      className={`gamenew gamenew-${brandKey}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="gamenew-brand-logo"
        src={getBrandLogo(brandKey)}
        alt={`Logo de ${brand}`}
        width={imageSize}
        height={imageSize}
        loading="lazy"
      />

      <h3 className="gamenew-title">{title}</h3>

      <p className="gamenew-info">
        <span className="gamenew-brand">{brand}</span>
        <span className="gamenew-author">{author}</span>

        {isToday(publishedAtString) ? (
          <time className="gamenew-date" dateTime={publishedAtString}>
            <relative-time datetime={publishedAtString}>
              {formattedPublishedAt}
            </relative-time>
          </time>
        ) : (
          <time className="gamenew-date" dateTime={publishedAtString}>
            {formattedPublishedAt}
          </time>
        )}
      </p>
    </a>
  );
}

export default GameNew;
