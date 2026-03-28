import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/CodeYedServices';
import { AuthContext } from '../context/AuthContext';
import fallbackNews from '../assets/lenguajes.jpg';

const NewsList = ({ variant = 'grid' }) => {
  const { token, user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.getNews(token);
    setItems(Array.isArray(res) ? res : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm('Eliminar noticia?')) return;
    await api.deleteNews(id, token);
    load();
  };

  const onEdit = async (id) => {
    const title = prompt('Nuevo título');
    if (!title) return;
    await api.updateNews(id, { title }, token);
    load();
  };

  if (loading) return <div className="news-state">Cargando noticias...</div>;

  if (!items.length) {
    return <div className="news-state">No hay noticias todavia. Crea la primera desde tu panel.</div>;
  }

  const rootClass = variant === 'list' ? 'news-grid news-grid--list' : 'news-grid';

  return (
    <div className={rootClass}>
      {items.map((it) => (
        <article key={it.id} className="news-card">
          <Link to={`/noticias/${it.id}`}>
            <img className="news-card__image" src={it.image_url || fallbackNews} alt={it.title || 'Noticia'} />
          </Link>
          <div className="news-card__body">
            <h3>
              <Link to={`/noticias/${it.id}`}>{it.title}</Link>
            </h3>
            <p>{it.news?.slice(0, 200)}</p>
            <small>Autor: {it.user_id ?? 'Anonimo'}</small>
          </div>

          <div className="news-card__actions">
            {user && (user.rol === 'admin' || user.id === it.user_id) && (
              <>
                <button className="btn btn--ghost" onClick={() => onEdit(it.id)}>Editar</button>
                <button className="btn btn--danger" onClick={() => onDelete(it.id)}>Eliminar</button>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default NewsList;
