import { FormData, Type } from "../../../core/interfaces";
import { AccountConstans } from "./constans";

export namespace FormsAccount {

    const IBAN = (grid?:any, readonly:boolean = false) => {
        return {
            type:'input',
            label:AccountConstans.IBAN.label,
            name:AccountConstans.IBAN.name,
            required:true,
            readonly,
            grid
        }
    }
    const name = (grid?:any, readonly:boolean = false) => {
      return {
          type:'input',
          label:AccountConstans.name.label,
          name:AccountConstans.name.name,
          required:true,
          readonly,
          grid
      }
  }
    const amount = (grid?:any, readonly:boolean = false) => {
        return {
            type:'number',
            label:AccountConstans.amount.label,
            name:AccountConstans.amount.name,
            required:true,
            readonly,
            grid

        }
    }


    export const createGroup: FormData = {
        type: Type.create,
        data: [
          IBAN(),
          name(),
        ],
    };

    export const updateGroup: FormData = {
      type: Type.update,
      data: [

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
