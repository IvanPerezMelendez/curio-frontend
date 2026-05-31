import { useState } from 'react';
import { motion } from 'framer-motion';
import { login, register } from '../api/auth';

export default function Login({ onAuth }) {
  const [mode, setMode]       = useState('login'); // 'login' | 'register'
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        await register(email, password);
        await login(email, password);
      } else {
        await login(email, password);
      }
      onAuth();
    } catch (err) {
      setError(err.message ?? 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="home-bar">
        <div className="brand">
          <span className="brand-mark">✱</span>
          <span>curio</span>
        </div>
      </div>

      <div className="home-hero" style={{ paddingBottom: '2rem' }}>
        <div className="home-date">Aprende algo nuevo</div>
        <h1 className="home-title" style={{ fontSize: '2.8rem' }}>
          cada día.
        </h1>
        <p className="home-subtitle">Historia, biología, geografía y más — en 5 minutos al día.</p>
      </div>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={{
            padding: '0.85rem 1rem',
            borderRadius: '0.75rem',
            border: '1.5px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--ink)',
            fontSize: '1rem',
            fontFamily: 'inherit',
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
          style={{
            padding: '0.85rem 1rem',
            borderRadius: '0.75rem',
            border: '1.5px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--ink)',
            fontSize: '1rem',
            fontFamily: 'inherit',
          }}
        />

        {error && (
          <div style={{ color: '#c44a2a', fontSize: '0.85rem', padding: '0 0.25rem' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
          style={{ marginTop: '0.25rem' }}
        >
          <span>{loading ? 'Un momento…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}</span>
          {!loading && <span className="btn-arrow">→</span>}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
        {mode === 'login' ? (
          <>¿Sin cuenta aún?{' '}
            <button
              onClick={() => { setMode('register'); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              Regístrate gratis
            </button>
          </>
        ) : (
          <>¿Ya tienes cuenta?{' '}
            <button
              onClick={() => { setMode('login'); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 'inherit' }}
            >
              Inicia sesión
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
