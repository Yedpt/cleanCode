import { useEffect, useState, useContext } from 'react';
import * as api from '../services/CodeYedServices';
import { AuthContext } from '../context/AuthContext';

const NewsList = () => {
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

  if (loading) return <div>Cargando noticias...</div>;

  return (
    <div>
      {items.map((it) => (
        <div key={it.id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 8 }}>
          <h3>{it.title}</h3>
          <p>{it.news?.slice(0, 200)}</p>
          <small>Autor: {it.user_id ?? 'Anónimo'}</small>
          <div>
            {user && (user.rol === 'admin' || user.id === it.user_id) && (
              <>
                <button onClick={() => onEdit(it.id)} style={{ marginRight: 8 }}>Editar</button>
                <button onClick={() => onDelete(it.id)}>Eliminar</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
