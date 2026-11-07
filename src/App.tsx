import type { ReactNode } from 'react';
import {
  HashRouter,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';

import { AppProvider, useApp } from './context/AppContext';
import { podeAcessarRota } from './config/navegacao';

import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Indicadores } from './pages/Indicadores';
import { Preenchimento } from './pages/Preenchimento';
import { Validacao } from './pages/Validacao';
import { Fechamento } from './pages/Fechamento';
import { ConfiguracaoIndicadores } from './pages/ConfiguracaoIndicadores';

import './components/ui.css';

interface RotaComPermissaoProps {
  caminho: string;
  children: ReactNode;
}

function RotaComPermissao({
  caminho,
  children,
}: RotaComPermissaoProps) {
  const { usuarioLogado } = useApp();

  const permitido = podeAcessarRota(
    caminho,
    usuarioLogado?.permissoes ?? [],
  );

  if (!permitido) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/indicadores"
              element={
                <RotaComPermissao caminho="/indicadores">
                  <Indicadores />
                </RotaComPermissao>
              }
            />

            <Route
              path="/preenchimento"
              element={
                <RotaComPermissao caminho="/preenchimento">
                  <Preenchimento />
                </RotaComPermissao>
              }
            />

            <Route
              path="/validacao"
              element={
                <RotaComPermissao caminho="/validacao">
                  <Validacao />
                </RotaComPermissao>
              }
            />

            <Route
              path="/fechamento"
              element={
                <RotaComPermissao caminho="/fechamento">
                  <Fechamento />
                </RotaComPermissao>
              }
            />

            <Route
              path="/configuracao-indicadores"
              element={
                <RotaComPermissao caminho="/configuracao-indicadores">
                  <ConfiguracaoIndicadores />
                </RotaComPermissao>
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}