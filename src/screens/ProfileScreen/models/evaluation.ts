export type Question = {
  id: string;
  text: string;
  options: string[];
};

export type Answers = Record<string, number>;

export const questions: Question[] = [
    {
    id: '1',
    text: 'Qual é a sua idade?',
    options: ['Até 25 anos', 'De 26 a 35 anos', 'De 36 a 55 anos', 'Acima de 55 anos'],
  },
  {
    id: '2',
    text: 'Qual é a sua principal fonte de renda?',
    options: ['Salário ou aposentadoria', 'Rendimento de empresa própria', 'Renda de investimentos ou imóveis', 'Outros'],
  },
  {
    id: '3',
    text: 'Qual é o seu objetivo com os investimentos?',
    options: ['Preservar meu capital', 'Obter rentabilidade acima da poupança', 'Acumular patrimônio no longo prazo', 'Obter alta rentabilidade, mesmo com riscos'],
  },
  {
    id: '4',
    text: 'Qual é o seu horizonte de investimento?',
    options: ['Até 1 ano', 'De 1 a 3 anos', 'De 3 a 5 anos', 'Acima de 5 anos'],
  },
  {
    id: '5',
    text: 'Como você se sentiria se seus investimentos sofressem uma perda de 10% em um curto período?',
    options: ['Muito desconfortável, retiraria o dinheiro', 'Preocupado, mas manteria', 'Entenderia como algo natural', 'Aproveitaria para investir mais'],
  },
  {
    id: '6',
    text: 'Qual a sua experiência com investimentos?',
    options: ['Nenhuma', 'Já investi em poupança e CDB', 'Já investi em fundos ou ações', 'Tenho experiência com derivativos, renda variável e criptos'],
  },
  {
    id: '7',
    text: 'Qual é a sua capacidade de lidar com perdas financeiras?',
    options: ['Até 10%', 'Entre 10% e 25%', 'Entre 25% e 50%', 'Acima de 50%'],
  },
  {
    id: '8',
    text: 'Quanto do seu capital pretende investir?',
    options: ['Até 10%', 'Entre 10% e 25%', 'Entre 25% e 50%', 'Acima de 50%'],
  },
];