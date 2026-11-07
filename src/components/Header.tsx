import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Header.css';

export function Header() {
  const {
    usuarioLogado,
    usuarioAtual,
    competenciaId,
    competencias,
    definirCompetencia,
    sair,
  } = useApp();
  const navigate = useNavigate();
  const competenciaAtual = competencias.find((c) => c.id === competenciaId);
  const papeis = usuarioLogado?.papeis ?? [];
  const descricaoAcesso = usuarioLogado?.is_superuser
    ? 'Superusuário técnico'
    : papeis.length > 0
      ? papeis.join(' · ')
      : 'Sem papel funcional';

  async function handleSair() {
    try {
      await sair();
      navigate('/', { replace: true });
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Não foi possível encerrar a sessão.',
      );
    }
  }

  return (
    <header className="app-header">
      <div className="app-header-left">
        <label className="header-field">
          <span>Competência (demonstração)</span>
          <select value={competenciaId} onChange={(e) => definirCompetencia(e.target.value)}>
            {competencias.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>
        {competenciaAtual && (
          <span className={`header-comp-status header-comp-status--${competenciaAtual.status
            .toLowerCase().replace(/\s+/g, '-')}`}>
            {competenciaAtual.status}
          </span>
        )}
      </div>

      <div className="app-header-right">
        <button className="header-notif" title="Notificações (em desenvolvimento)" type="button" disabled>
          🔔
        </button>
        <div className="header-user">
          <div className="header-user-avatar">{usuarioAtual.charAt(0)}</div>
          <div className="header-user-info">
            <div className="header-user-name">{usuarioAtual}</div>
            <div className="header-user-role">{descricaoAcesso}</div>
          </div>
        </div>
        <button className="btn btn-sm" type="button" onClick={handleSair}>Sair</button>
      </div>
    </header>
  );
}
