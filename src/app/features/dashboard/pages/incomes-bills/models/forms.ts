import { FormData, Type } from "../../../../../core/interfaces";
import { IncomesBillsConstans } from "./constans";

export namespace FormsIncomesBills {

    const tipo = (grid?:any, readonly:boolean = false) => {
        return {
            type:'select',
            label:IncomesBillsConstans.tipo.label,
            name:IncomesBillsConstans.tipo.name,
            option:IncomesBillsConstans.tipo.option,
            required:true,
            readonly,
            grid
        }
    }
    const name = (grid?:any, readonly:boolean = false) => {
      return {
          type:'input',
          label:IncomesBillsConstans.name.label,
          name:IncomesBillsConstans.name.name,
          required:true,
          readonly,
          grid
      }
  }
    const category = (grid?:any, readonly:boolean = false) => {
        return {
            type:'select',
            label:IncomesBillsConstans.category.label,
            name:IncomesBillsConstans.category.name,
            option:IncomesBillsConstans.category.option,
            required:true,
            readonly,
            grid

        }
    }
    const eventual = (grid?:any, readonly:boolean = false) => {
      return {
          type:'select',
          label:IncomesBillsConstans.eventual.label,
          name:IncomesBillsConstans.eventual.name,
          option:IncomesBillsConstans.eventual.option,
          required:true,
          readonly,
          grid,

      }
  }
    const createAt = (grid?:any, readonly:boolean = false) => {
        return {
            type:'date',
            label:IncomesBillsConstans.date.label,
            name:IncomesBillsConstans.date.name,
            required:true,
            readonly,
            grid
        }
    }
    const amount = (grid?:any, readonly:boolean = false) => {
        return {
            type:'number',
            label:IncomesBillsConstans.amount.label,
            name:IncomesBillsConstans.amount.name,
            required:true,
            readonly,
            grid
        }
    }

    export const createGroup: FormData = {
        type: Type.create,
        data: [
          tipo(),
          name(),
          eventual(),
          amount()
        ],
    };

    export const updateGroup: FormData = {
      type: Type.create,
      data: [
        tipo(null,true),
        name(null,true),
        eventual(null,true),
        amount(null,true),
        createAt(null,true)
      ],
  };

//   active
// amount
// category
// createAt
// id
// name
// tipe
// uid
}
