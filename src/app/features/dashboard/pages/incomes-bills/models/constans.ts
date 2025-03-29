export const IncomesBillsConstans = {
  title: 'Asunto',

  tipo: {
    label: 'Tipo',
    name: 'tipe',
    option: [
      { value: '1', label: 'Ingreso' },
      { value: '2', label: 'Gasto' },
    ],
  },
  name: {
    label: 'Titulo',
    name: 'name',
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
  periody: {
    label: 'Periodos',
    name: 'periody',
    option: [
      { value: '1', label: 'Mes' },
      { value: '2', label: '3 meses' },
      { value: '3', label: '6 meses' },
      { value: '4', label: '12 meses' },
      { value: '5', label: 'Año actual' },
    ],
  },
  eventual: {
    label: 'Programado',
    name: 'event',
    option: [
      { value: '1', label: 'Eventual' },
      { value: '2', label: 'Mensual' },
      { value: '3', label: 'Trimestral' },
      { value: '4', label: 'Anual' },
    ],
  },
  amount: {
    label: 'Montante',
    name: 'amount',
  },
  date: {
    label: 'Fecha',
    name: 'createAt',
  },
  description: {
    label: 'Descripcion',
    name: 'description',
  },
};
