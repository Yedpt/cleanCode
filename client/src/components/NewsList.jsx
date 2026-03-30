import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/CodeYedServices';
import { AuthContext } from '../context/AuthContext';
import fallbackNews from '../assets/lenguajes.jpg';

const NewsList = ({ variant = 'grid' }) => {
  const { token, user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', news: '', image_url: '' });
  const [message, setMessage] = useState('');

  const isAdmin = user?.rol === 'admin';

  const load = async () => {
    setLoading(true);
    const res = await api.getNews(token);
    setItems(Array.isArray(res) ? res : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [token]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onCreate = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      title: form.title.trim(),
      news: form.news.trim(),
      image_url: form.image_url.trim() || undefined,
    };

    const res = await api.createNews(payload, token);

    if (res?.id) {
      setForm({ title: '', news: '', image_url: '' });
      setMessage('Noticia creada correctamente');
      await load();
      return;
    }

    setMessage(res?.message || 'No se pudo crear la noticia');
  };

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

  const rootClass = variant === 'list' ? 'news-grid news-grid--list' : 'news-grid';
  const skeletonCards = Array.from({ length: 3 }, (_, index) => index);

  return (
    <>
      {isAdmin ? (
        <form className="admin-form" onSubmit={onCreate}>
          <input name="title" placeholder="Titulo" value={form.title} onChange={onChange} required />
          <textarea name="news" placeholder="Contenido de la noticia" value={form.news} onChange={onChange} required rows={4} />
          <input name="image_url" placeholder="URL de imagen (opcional)" value={form.image_url} onChange={onChange} />
          <button type="submit" className="btn btn--primary">Crear noticia</button>
          {message ? <p className="form-message">{message}</p> : null}
        </form>
      ) : null}

      {loading ? (
        <div className={`${rootClass} grid-skeleton`} aria-hidden="true">
          {skeletonCards.map((item) => (
            <article className="news-card skeleton-card" key={`news-skeleton-${item}`}>
              <div className="skeleton skeleton--image" />
              <div className="news-card__body">
                <div className="skeleton skeleton--line" />
                <div className="skeleton skeleton--line skeleton--line-short" />
                <div className="skeleton skeleton--line" />
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {!loading && !items.length ? (
        <div className="news-state">No hay noticias todavia. Crea la primera desde tu panel.</div>
      ) : null}

      {!loading && items.length ? (
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
                {isAdmin ? (
                  <>
                    <button className="btn btn--ghost" onClick={() => onEdit(it.id)}>Editar</button>
                    <button className="btn btn--danger" onClick={() => onDelete(it.id)}>Eliminar</button>
                  </>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default NewsList;
