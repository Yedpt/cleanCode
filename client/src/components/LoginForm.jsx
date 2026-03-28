import  { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const { login, register, user, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState('login');

  const submit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, password);
    } else {
      await register(email, password, name);
      setMode('login');
    }
  };

  if (user) {
    return (
      <div>
        <div>Conectado como {user.email} ({user.rol})</div>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      {mode === 'register' && (
        <div>
          <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      )}
      <div>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit">{mode === 'login' ? 'Entrar' : 'Registrar'}</button>
        <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ marginLeft: 8 }}>
          {mode === 'login' ? 'Crear cuenta' : 'Tengo cuenta'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
