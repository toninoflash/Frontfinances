import { FormData, Type } from "../../../../../core/interfaces";
import { IncomesBillsConstans } from "./constans";

export namespace FormsIncomesBills {

    const tipo = (grid?:any, disabled?:boolean) => {
        return {
            type:'select',
            label:IncomesBillsConstans.tipo.label,
            name:IncomesBillsConstans.tipo.name,
            option:IncomesBillsConstans.tipo.option,
            required:true,
            grid
        }
    }
    const name = (grid?:any) => {
      return {
          type:'input',
          label:IncomesBillsConstans.name.label,
          name:IncomesBillsConstans.name.name,
          required:true,
          grid
      }
  }
    const category = (grid?:any) => {
        return {
            type:'select',
            label:IncomesBillsConstans.category.label,
            name:IncomesBillsConstans.category.name,
            option:IncomesBillsConstans.category.option,
            required:true,
            grid

        }
    }
    const eventual = (grid:any = '', disabled?:boolean) => {
      return {
          type:'select',
          label:IncomesBillsConstans.eventual.label,
          name:IncomesBillsConstans.eventual.name,
          option:IncomesBillsConstans.eventual.option,
          required:true,
          grid,

      }
  }
    const createAt = (grid?:any) => {
        return {
            type:'date',
            label:IncomesBillsConstans.date.label,
            name:IncomesBillsConstans.date.name,
            required:true,
            grid
        }
    }
    const amount = (grid?:any) => {
        return {
            type:'number',
            label:IncomesBillsConstans.amount.label,
            name:IncomesBillsConstans.amount.name,
            required:true,
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
        tipo(),
        name(),
        eventual(),
        amount()
      ],
  };

}
