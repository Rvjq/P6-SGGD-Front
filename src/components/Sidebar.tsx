import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ITENS_NAVEGACAO,
  podeAcessarRota,
} from '../config/navegacao';

import './Sidebar.css';

export function Sidebar() {
  const { usuarioLogado } = useApp();

  const permissoes = usuarioLogado?.permissoes ?? [];

  const itensVisiveis = ITENS_NAVEGACAO.filter(
    (item) => podeAcessarRota(item.to, permissoes)
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">SG</div>
        <div>
          <div className="sidebar-brand-title">SGGD</div>
          <div className="sidebar-brand-sub">
            Gestão da Gratificação
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {itensVisiveis.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="helper-text">
          Protótipo v1 · dados fictícios
        </p>
      </div>
    </aside>
  );
}