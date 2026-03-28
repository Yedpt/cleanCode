import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import codeYedLogo from '../assets/CodeYed1.png'

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="top-nav">
      <div className="top-nav__inner">
        <Link to="/" className="brand" aria-label="Ir al inicio" onClick={() => setMenuOpen(false)}>
          <img src={codeYedLogo} alt="CodeYed" className="brand__logo" />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`top-nav__links ${menuOpen ? 'is-open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/noticias" onClick={() => setMenuOpen(false)}>Noticias</Link>
          <a href="/#about" onClick={() => setMenuOpen(false)}>Videos</a>
          <a href="/#about" onClick={() => setMenuOpen(false)}>Recursos para programar</a>
          {user ? (
            <Link to="/perfil" className="auth-chip" onClick={() => setMenuOpen(false)}>Mi perfil</Link>
          ) : (
            <Link to="/login" className="auth-chip" onClick={() => setMenuOpen(false)}>Iniciar sesion</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
