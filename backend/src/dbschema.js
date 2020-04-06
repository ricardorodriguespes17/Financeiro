const usuario = {
  id: '124j1kl2',
  nome: 'Ricardo Rodrigues',
  email: 'ricardor662@gmail.com',
  password: '123456',
}

const tables =
  [{
    id: 1,
    type: 'revenue',
    date: 'março/2020',
    title: 'Conta Banco do Brasil',
    value: 600,
    description: 'Bolsa Mais futuro',
    userId: '124j1kl2'
  },
  {
    id: 2,
    type: 'expense',
    title: 'Aluguel',
    date: '31/03/2020',
    value: 255,
    description: '',
    userId: '124j1kl2'
  },
  {
    id: 3,
    type: 'receipt',
    title: 'Thiago',
    date: 'março/2020',
    value: 4,
    description: 'Para pagar spotify',
    userId: '124j1kl2'
  }]

const notifications =
  [{
    id: 1,
    date: '21/03/2020',
    userId: '124j1kl2',
    tableId: 2
  }]

