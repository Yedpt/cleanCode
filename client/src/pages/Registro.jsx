import { Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import LoginForm from '../components/LoginForm'

const Registro = () => {
  const { user } = useContext(AuthContext)

  if (user) {
    return <Navigate to="/perfil" replace />
  }

  return (
    <div className="auth-page auth-page--register">
      <section className="auth-card">
        <h1>Registrate</h1>
        <LoginForm initialMode="register" lockMode successRedirect="/login" className="auth-form--page" />
        <p className="auth-page__switch">
          Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
        </p>
      </section>
    </div>
  )
}

export default Registro
