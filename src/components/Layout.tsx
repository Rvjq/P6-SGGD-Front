import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  const { autenticado, verificandoSessao } = useApp();

  if (verificandoSessao) {
    return <p>Verificando sessão...</p>;
  }

  if (!autenticado) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header />
        <div className="page-content">
          <p className="demo-notice" role="note">
            Autenticação e permissões conectadas ao Django. Competências, unidades,
            indicadores e ações desta área ainda são demonstrativos, sem persistência no PostgreSQL.
          </p>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
