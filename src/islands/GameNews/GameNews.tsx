import { useEffect, useState } from 'react';
import type { GameNew as IGameNew } from '../../models/interfaces/gamenews';
import GameNew from '../GameNew/GameNew';
import './GameNews.scss';

interface Props {
  from: string | null;
  api: {
    url: string;
    token: string;
  };
}

const newsPerPage = 20;

function GameNews({ from, api }: Props) {
  const brandClass = from ? ` gamenews-${from}` : '';
  const { url, token } = api;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const [gamenews, setGamenews] = useState<IGameNew[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const fetchGamenews = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`${url}?skip=${skip}&take=${newsPerPage}`, {
        headers,
      });

      if (!res.ok) {
        throw new Error('Ha ocurrido un error al cargar las noticias');
      }

      const result: { data: IGameNew[]; hasMore: boolean } = await res.json();

      setGamenews((prevNews) => [...prevNews, ...result.data]);
      setSkip((prevSkip) => prevSkip + newsPerPage);
      setHasMore(result.hasMore);
      setInitialLoadComplete(true);
    } catch (error) {
      setInitialLoadComplete(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGamenews();
  }, []);

  return (
    <section className={`gamenews${brandClass}`}>
      {gamenews.length > 0
        ? gamenews.map((gamenew) => (
            <GameNew key={gamenew.id} gamenew={gamenew} />
          ))
        : initialLoadComplete &&
          !loading &&
          !hasMore && (
            <p className="gamenews-no-news">
              No hay noticias. Vuelve más tarde
            </p>
          )}

      {hasMore && !loading && (
        <button className="gamenews-more-news-btn" onClick={fetchGamenews}>
          <span className="gamenews-more-news-btn-text">Ver más</span>
        </button>
      )}

      {loading && <p className="gamenews--is-loading">Cargando noticias...</p>}
    </section>
  );
}

export default GameNews;
