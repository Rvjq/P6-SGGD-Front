import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Login.css';

export function Login() {
  const { entrar, autenticado, verificandoSessao } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro('');
    setCarregando(true);

    try {
      await entrar(email.trim(), senha);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível realizar o login.'
      );
    } finally {
      setCarregando(false);
    }
  }

  if (verificandoSessao) {
    return (
      <div className="login-screen">
        <p>Verificando sessão...</p>
      </div>
    );
  }

  if (autenticado) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-mark">SG</div>

          <div>
            <div className="login-brand-title">SGGD</div>
            <div className="login-brand-sub">
              Sistema de Gestão da Gratificação por Desempenho
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {erro && (
            <p className="login-error" role="alert">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary login-submit"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-institucional">
          Sistema de Gestão da Gratificação por Desempenho.
          As demais funcionalidades ainda utilizam dados demonstrativos.
        </p>
      </div>
    </div>
  );
}