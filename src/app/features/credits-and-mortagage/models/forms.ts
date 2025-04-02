import { FormData, Type } from "../../../core/interfaces";
import { CreditConstans } from "./constans";

export namespace FormsCredit {

    const name = (grid?:any, readonly:boolean = false) => {
      return {
          type:'input',
          label:CreditConstans.name.label,
          name:CreditConstans.name.name,
          required:true,
          readonly,
          grid
      }
  }
    const balancePending = (grid?:any, readonly:boolean = false) => {
        return {
            type:'number',
            label:CreditConstans.balancePending.label,
            name:CreditConstans.balancePending.name,
            readonly,
            grid
        }
    }
    const amount = (grid?:any, readonly:boolean = false) => {
      return {
          type:'number',
          label:CreditConstans.amount.label,
          name:CreditConstans.amount.name,
          readonly,
          grid

      }
  }
  const endAt = (grid?:any, readonly:boolean = false) => {
    return {
        type:'input',
        label:CreditConstans.endAt.label,
        name:CreditConstans.endAt.name,
        readonly,
        grid
    }
  }
  const recivePending = (grid?:any, readonly:boolean = false) => {
    return {
        type:'number',
        label:CreditConstans.recivePending.label,
        name:CreditConstans.recivePending.name,
        readonly,
        grid
    }
  }
  const titular = (grid?:any, readonly:boolean = false) => {
    return {
        type:'input',
        label:CreditConstans.titular.label,
        name:CreditConstans.titular.name,
        readonly,
        grid
    }
  }
  const accountId = (grid?:any, readonly:boolean = false) => {
    return {
        type:'input',
        label:CreditConstans.accountId.label,
        name:CreditConstans.accountId.name,
        readonly,
        grid
    }
  }
  const createAt = (grid?:any, readonly:boolean = false) => {
    return {
        type:'input',
        label:CreditConstans.createAt.label,
        name:CreditConstans.createAt.name,
        readonly,
        grid
    }
  }
  const balance = (grid?:any, readonly:boolean = false) => {
    return {
        type:'number',
        label:CreditConstans.balance.label,
        name:CreditConstans.balance.name,
        readonly,
        grid
    }
  }
  const interest = (grid?:any, readonly:boolean = false) => {
    return {
        type:'number',
        label:CreditConstans.interest.label,
        name:CreditConstans.interest.name,
        readonly,
        grid
    }
  }
  const divider = () => {
    return {
        type:'divider',
    }
  }
    export const createGroup: FormData = {
        type: Type.create,
        data: [
          name(),
          divider(),
          balancePending(null,true),
          amount(null,true),
          endAt(null,true),
          recivePending(null,true),
          divider(),
          titular(null,true),
          accountId(null,true),
          createAt(null,true),
          balance(),
          interest(null,true),

        ],
    };

    export const updateGroup: FormData = {
      type: Type.update,
      data: [

      ],
  };
}
