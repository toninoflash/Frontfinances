import { FormData, Type } from "../../../core/interfaces";
import { AuthConstans } from "./constans";

export namespace FormsAuth {

    const tipo = (grid?:any, disabled?:boolean) => {
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
          label:AuthConstans.name.label,
          name:AuthConstans.name.name,
          required:true,
          grid
      }
  }
    const password = (grid?:any) => {
        return {
            type:'pass',
            label:AuthConstans.password.label,
            name:AuthConstans.password.name,
            required:true,
            grid
        }
    }
    const passwordRepeat = (grid?:any) => {
      return {
          type:'pass',
          label:AuthConstans.password.labelConfin,
          name:AuthConstans.password.nameConfin,
          required:true,
          grid
      }
  }
    const username = (grid?:any) => {
      return {
          type:'input',
          label:AuthConstans.username.label,
          name:AuthConstans.username.name,
          required:true,
          grid
      }
  }
  const email = (grid?:any) => {
    return {
        type:'input',
        label:AuthConstans.email.label,
        name:AuthConstans.email.name,
        required:true,
        grid
    }
}
const lastname = (grid?:any) => {
  return {
      type:'input',
      label:AuthConstans.lastName.label,
      name:AuthConstans.lastName.name,
      required:true,
      grid
  }
}
const bio = (grid?:any) => {
  return {
      type:'textarea',
      label:AuthConstans.bio.label,
      name:AuthConstans.bio.name,
      grid
  }
}
const country = (grid?:any) => {
  return {
      type:'select',
      label:AuthConstans.country.label,
      name:AuthConstans.country.name,
      option:AuthConstans.country.option,
      required:true,
      grid
  }
}
const city = (grid?:any) => {
  return {
      type:'select',
      label:AuthConstans.city.label,
      name:AuthConstans.city.name,
      option:AuthConstans.city.option,
      required:true,
      grid
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
    const birthDate = () => {
      return {
          type:'date',
          label:AuthConstans.birthDate.label,
          name:AuthConstans.birthDate.name,
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
const divider = () => {
  return {
    type: 'divider',
  };
};

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

          email(),
          username(),
          divider(),

          password(),
          passwordRepeat(),
          divider(),
          name(),
          lastname(),
          country(),
          city(),
          birthDate(),
          divider(),
          bio()

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
