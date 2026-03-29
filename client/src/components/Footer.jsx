import React from 'react'
import { Link } from 'react-router-dom'
import codeYedLogo from '../assets/CodeYed1.png'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand" aria-label="CodeYed">
          <img src={codeYedLogo} alt="CodeYed" className="site-footer__logo" />
        </div>

        <div className="site-footer__content">
          <div className="site-footer__links">
            <Link to="/">Inicio</Link>
            <Link to="/noticias">Noticias</Link>
            <Link to="/videos">Videos</Link>
            <Link to="/recursos">Recursos</Link>
            <Link to="/registro">Registro</Link>
            <Link to="/perfil">Perfil</Link>
            <Link to="/login">Login</Link>
          </div>
          <p className="site-footer__copy">Todos los derechos reservados. CleanCode {year}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
