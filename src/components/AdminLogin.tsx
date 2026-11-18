import { useState, FormEvent } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAdminStore } from '../stores/adminStore';
import { Button } from './Button';

export function AdminLogin({ onBack }: { onBack: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAdminStore((s) => s.login);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const ok = await login(username, password);
      if (!ok) {
        setError('Usuario o contraseña incorrectos');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <Lock size={28} />
          </div>
          <h2>Panel de Administración</h2>
          <p>Ingresá con tus credenciales para acceder al panel.</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label className="admin-field-label">Usuario</label>
            <div className="admin-input-wrapper">
              <User size={18} className="admin-input-icon" />
              <input
                type="text"
                className="admin-input"
                placeholder="Ingresá tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-field-label">Contraseña</label>
            <div className="admin-input-wrapper">
              <Lock size={18} className="admin-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="admin-input admin-input-password"
                placeholder="Ingresá tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <Button
            type="submit"
            variant="primary"
            disabled={loading || !username || !password}
            style={{ width: '100%', marginTop: '8px' }}
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </Button>
        </form>

        <div className="admin-login-footer">
          <Button variant="ghost" onClick={onBack}>
            ← Volver al formulario
          </Button>
        </div>
      </div>
    </div>
  );
}
