export const AccountConstans = {
  title: 'Asunto',

  IBAN: {
    label: 'IBAN',
    name: 'iban',
  },
  name: {
    label: 'Titulo',
    name: 'name',
  },
  amount: {
    label: 'Saldo',
    name: 'amount',
  },
  category: {
    label: 'Categoria',
    name: 'category',
    option: [
      { value: '1', label: 'Ingreso fijo' },
      { value: '2', label: 'Ingreso extra' },
      { value: '3', label: 'Gasto fijo' },
      { value: '4', label: 'Gasto extra' },
      { value: '5', label: 'Crédito' },
      { value: '6', label: 'Hipoteca' },
      { value: '7', label: 'Hucha' },
    ],
  },

};
