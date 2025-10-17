export type Portfolio = {
  nome: string;
  ativos: string[];
};

// Dados mockados das carteiras de investimento
export const portfoliosData: Record<string, Portfolio[]> = {
  Conservador: [
    { nome: 'Carteira Conservadora A', ativos: ['Tesouro Selic', 'CDB de grandes bancos', 'Fundos de Renda Fixa'] },
    { nome: 'Carteira Conservadora B', ativos: ['Tesouro Selic', 'Poupança com reforço mensal', 'LCI de bancos médios'] },
    { nome: 'Carteira Conservadora C', ativos: ['CDB de bancos médios', 'Fundos de Renda Fixa', 'Poupança'] },
  ],
  Moderado: [
    { nome: 'Carteira Moderada A', ativos: ['Tesouro IPCA+', 'Fundos Multimercado', 'Ações de empresas estáveis'] },
    { nome: 'Carteira Moderada B', ativos: ['LCI/LCA', 'Tesouro IPCA+', 'Fundos de ações'] },
    { nome: 'Carteira Moderada C', ativos: ['Fundos Multimercado', 'ETFs', 'Ações blue chips'] },
  ],
  Arrojado: [
    { nome: 'Carteira Arrojada A', ativos: ['Ações', 'ETFs', 'Criptomoedas'] },
    { nome: 'Carteira Arrojada B', ativos: ['Fundos de ações', 'Criptomoedas', 'Investimentos internacionais'] },
    { nome: 'Carteira Arrojada C', ativos: ['Ações internacionais', 'Criptoativos', 'Small caps'] },
  ],
};