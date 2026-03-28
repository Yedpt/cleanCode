import { Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Perfil = () => {
  const { user, logout } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="profile-page">
      <section className="profile-card">
        <h1>Mi perfil</h1>
        <p className="profile-card__welcome">
          Buen dia,
          <span> {user.name || user.email}</span>
        </p>

        <div className="profile-menu">
          <button type="button">Usuarios</button>
          <button type="button">Noticias</button>
          <button type="button">Videos</button>
          <button type="button">Recursos para programar</button>
        </div>

        <div className="profile-card__block">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>
        <div className="profile-card__block">
          <span>Rol</span>
          <strong>{user.rol}</strong>
        </div>

        <nav className="profile-links">
          <Link to="/">Inicio</Link>
          <Link to="/noticias">Noticias</Link>
          <Link to="/registro">Crear usuario</Link>
        </nav>

        <button className="btn btn--primary" onClick={logout}>Cerrar sesion</button>
      </section>
    </div>
  )
}

export default Perfil
