import { FormData, Type } from "../../../core/interfaces";
import { AuthConstans } from "./constans";

export namespace FormsAuth {

    const tipo = (grid:any = '', disabled?:boolean) => {
        return {
            type:'select',
            label:AuthConstans.tipo.label,
            name:AuthConstans.tipo.name,
            option:AuthConstans.tipo.option,
            required:true,
            grid,
            disabled
        }
    }
    const name = (grid?:any) => {
      return {
          type:'input',
          label:AuthConstans.email.label,
          name:AuthConstans.email.name,
          required:true,
          grid:100
      }
  }
    const password = (grid?:any) => {
        return {
            type:'pass',
            label:AuthConstans.password.label,
            name:AuthConstans.password.name,
            required:true,
            grid:100


        }
    }
    const createAt = () => {
        return {
            type:'date',
            label:AuthConstans.createAt.label,
            name:AuthConstans.createAt.name,
            required:true,
        }
    }
    const check = () => {
      return {
          type:'checkbox',
          label:AuthConstans.createAt.label,
          name:AuthConstans.createAt.name,
          required:true,
      }
  }
  const radio = () => {
    return {
        type:'radio',
        label:AuthConstans.createAt.label,
        name:AuthConstans.createAt.name,
        required:true,
    }
}
const textarea = () => {
  return {
      type:'textarea',
      label:AuthConstans.createAt.label,
      name:AuthConstans.createAt.name,
      required:true,
  }
}


    export const loginGroup: FormData = {
        type: Type.update,
        data: [
          name(),
          password()
        ],
    };

    export const registerGroup: FormData = {
        type: Type.update,
        data: [




        ],
    };
    export const pruebaGroup: FormData = {
      type: Type.update,
      data: [
          tipo(100),
          password(),
          check(),
          textarea(),
          radio(),
          createAt()
      ],
  };


}
