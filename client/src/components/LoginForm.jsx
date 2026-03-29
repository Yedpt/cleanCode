import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginForm = ({
  initialMode = 'login',
  lockMode = false,
  successRedirect = null,
  className = '',
}) => {
  const { login, register, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState('');

  const extractErrorMessage = (payload, fallback) => {
    if (payload?.message) return payload.message;
    if (Array.isArray(payload?.errors) && payload.errors.length) {
      return payload.errors[0]?.msg || fallback;
    }
    return fallback;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (mode === 'login') {
      const result = await login(email, password);
      if (!result?.ok) {
        const text = extractErrorMessage(result?.error, 'No se pudo iniciar sesion');
        setMessage(text);
      } else if (successRedirect) {
        navigate(successRedirect);
      }
    } else {
      const result = await register(email, password, name);
      if (result?.id) {
        if (successRedirect) {
          navigate(successRedirect);
        } else if (!lockMode) {
          setMessage('Registro exitoso. Ahora puedes iniciar sesion.');
          setMode('login');
        } else {
          setMessage('Registro exitoso. Ya puedes iniciar sesion.');
        }
      } else {
        setMessage(extractErrorMessage(result, 'No se pudo crear la cuenta'));
      }
    }
  };

  if (user) {
    return (
      <div className="auth-state">
        <div className="auth-state__line">Conectado como</div>
        <div className="auth-state__identity">{user.email} ({user.rol})</div>
        <button className="btn btn--primary" onClick={logout}>Cerrar sesion</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`auth-form ${className}`.trim()}>
      {mode === 'register' && (
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="email">Correo</label>
        <input
          id="email"
          placeholder="correo@dominio.com"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="password">Contrasena</label>
        <input
          id="password"
          placeholder="Contrasena"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {message ? <p className="form-message">{message}</p> : null}

      <div className="auth-actions">
        <button className="btn btn--primary" type="submit">
          {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
        </button>

        {!lockMode ? (
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Crear cuenta' : 'Tengo cuenta'}
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default LoginForm;
