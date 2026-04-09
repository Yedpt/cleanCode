import { Link, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const { user } = useContext(AuthContext)

  if (user) {
    return <Navigate to="/perfil" replace />
  }

  return (
    <div className="auth-page auth-page--login">
      <section className="auth-card">
        <h1>Inicia sesion</h1>
        <LoginForm initialMode="login" lockMode successRedirect="/perfil" className="auth-form--page" />
        <p className="auth-page__switch">
          Aun no tienes cuenta? <Link to="/registro">Crea una</Link>
        </p>
      </section>
    </div>
  )
}

export default Login
