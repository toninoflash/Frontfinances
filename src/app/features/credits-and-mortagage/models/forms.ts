import { FormData, Type } from '../../../core/interfaces';
import { IncomesBillsConstans } from '../../dashboard/pages/incomes-bills/models/constans';
import { CreditConstans } from './constans';

export namespace FormsCredit {
  const name = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'input',
      label: CreditConstans.name.label,
      name: CreditConstans.name.name,
      required,
      readonly,
      grid,
    };
  };
  const balancePending = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'number',
      label: CreditConstans.balancePending.label,
      name: CreditConstans.balancePending.name,
      readonly,
      required,
      grid,
    };
  };
  const amount = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'number',
      label: CreditConstans.amount.label,
      name: CreditConstans.amount.name,
      readonly,
      required,
      grid,
    };
  };
  const endAt = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'input',
      label: CreditConstans.endAt.label,
      name: CreditConstans.endAt.name,
      readonly,
      required,
      grid,
    };
  };
  const recivePending = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'number',
      label: CreditConstans.recivePending.label,
      name: CreditConstans.recivePending.name,
      readonly,
      required,
      grid,
    };
  };
  const titular = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'input',
      label: CreditConstans.titular.label,
      name: CreditConstans.titular.name,
      readonly,
      required,
      grid,
    };
  };
  const accountId = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'input',
      label: CreditConstans.accountId.label,
      name: CreditConstans.accountId.name,
      readonly,
      required,
      grid,
    };
  };
  const accountSelect = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'select',
      label: CreditConstans.accountId.label,
      name: CreditConstans.accountId.name,
      option: IncomesBillsConstans.category.option,
      readonly,
      required,
      grid,
    };
  };
  const cuota = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'select',
      label: CreditConstans.cuota.label,
      name: CreditConstans.cuota.name,
      option: CreditConstans.cuota.option,
      readonly,
      required,
      grid,
    };
  };

  const numCuotas = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'number',
      label: CreditConstans.numCuotas.label,
      name: CreditConstans.numCuotas.name,
      readonly,
      required,
      grid,
    };
  };
  const amortiCuota = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'number',
      label: CreditConstans.amortiCuota.label,
      name: CreditConstans.amortiCuota.name,
      showWen:{
        name:CreditConstans.cuota.name
      },
      selectionValueShowWen: { value: '1', label: 'Número' },
      readonly,
      required,
      grid,
    };
  };
  const createAt = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'input',
      label: CreditConstans.createAt.label,
      name: CreditConstans.createAt.name,
      readonly,
      required,
      grid,
    };
  };
  const balance = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'number',
      label: CreditConstans.balance.label,
      name: CreditConstans.balance.name,
      readonly,
      required,
      grid,
    };
  };
  const interest = (
    readonly: boolean = false,
    required: boolean = false,
    grid?: any
  ) => {
    return {
      type: 'number',
      label: CreditConstans.interest.label,
      name: CreditConstans.interest.name,
      readonly,
      required,
      grid,
    };
  };
  const divider = () => {
    return {
      type: 'divider',
    };
  };
  export const createGroup: FormData = {
    type: Type.create,
    data: [
      name(false, true),
      divider(),
      balancePending(true),
      amount(true),
      endAt(true),
      recivePending(true),
      divider(),
      titular(true),
      accountId(true),
      createAt(true),
      balance(true),
      interest(true),
    ],
  };

  export const createCreditGroup: FormData = {
    type: Type.update,
    data: [
      name(false, true),
      titular(true, true),
      divider(),
      balance(false, true),
      interest(false, true),
      numCuotas(false, true),
    ],
  };
  export const resultCreditGroup: FormData = {
    type: Type.update,
    data: [
      divider(),
      balancePending(true),
      amount(true),
      endAt(true),
      recivePending(true),
      createAt(true),
    ],
  };
  export const updateCreditGroup: FormData = {
    type: Type.update,
    data: [
      name(),
      titular(true),
      accountId(true),
      divider(),
      balance(true),
      interest(true),
      amount(true),
    ],
  };
}
