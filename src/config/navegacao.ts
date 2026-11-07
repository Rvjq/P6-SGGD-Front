export interface ItemNavegacao {
  to: string;
  label: string;
  permissoes?: readonly string[];
}

export const ITENS_NAVEGACAO: ItemNavegacao[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
  },
  {
    to: '/indicadores',
    label: 'Indicadores',
    permissoes: [
      'acesso.consultar_resultados',
      'acesso.registrar_resultado',
      'acesso.homologar_resultado',
      'acesso.cadastrar_indicador',
    ],
  },
  {
    to: '/preenchimento',
    label: 'Preenchimento',
    permissoes: ['acesso.registrar_resultado'],
  },
  {
    to: '/validacao',
    label: 'Validação',
    permissoes: ['acesso.homologar_resultado'],
  },
  {
    to: '/fechamento',
    label: 'Fechamento',
    permissoes: ['acesso.encerrar_ciclo'],
  },
  {
    to: '/configuracao-indicadores',
    label: 'Configuração de Indicadores',
    permissoes: ['acesso.cadastrar_indicador'],
  },
];

export function podeAcessarRota(
  rota: string,
  permissoesUsuario: readonly string[],
): boolean {
  const item = ITENS_NAVEGACAO.find(
    (item) => item.to === rota
  );

  if (!item) return false;

  if (!item.permissoes) return true;

  return item.permissoes.some(
    (permissao) => permissoesUsuario.includes(permissao)
  );
}