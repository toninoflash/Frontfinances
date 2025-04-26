import { FormData, Type } from "../../../core/interfaces";
import { ProfileConstans } from "./constans";

export namespace FormsProfile {

    const tipo = (grid:any = '', disabled?:boolean) => {
        return {
            type:'select',
            label:ProfileConstans.tipo.label,
            name:ProfileConstans.tipo.name,
            option:ProfileConstans.tipo.option,
            required:true,
            grid,
            disabled
        }
    }
    const name = (grid?:any) => {
      return {
          type:'input',
          label:ProfileConstans.name.label,
          name:ProfileConstans.name.name,
          required:true,
          grid
      }
  }
    const password = (grid?:any) => {
        return {
            type:'pass',
            label:ProfileConstans.password.label,
            name:ProfileConstans.password.name,
            required:true,
            grid
        }
    }
    const passwordRepeat = (grid?:any) => {
      return {
          type:'pass',
          label:ProfileConstans.password.labelConfin,
          name:ProfileConstans.password.nameConfin,
          required:true,
          grid
      }
  }
    const username = (grid?:any) => {
      return {
          type:'input',
          label:ProfileConstans.username.label,
          name:ProfileConstans.username.name,
          required:true,
          grid
      }
  }
  const email = (grid?:any) => {
    return {
        type:'input',
        label:ProfileConstans.email.label,
        name:ProfileConstans.email.name,
        required:true,
        grid
    }
}
const lastname = (grid?:any) => {
  return {
      type:'input',
      label:ProfileConstans.lastName.label,
      name:ProfileConstans.lastName.name,
      required:true,
      grid
  }
}
const bio = (grid?:any) => {
  return {
      type:'textarea',
      label:ProfileConstans.bio.label,
      name:ProfileConstans.bio.name,
      grid
  }
}
const phone = (grid?:any) => {
  return {
      type:'input',
      label:ProfileConstans.phone.label,
      name:ProfileConstans.phone.name,
      required:true,
      grid
  }
}
const direction = (grid?:any) => {
  return {
      type:'input',
      label:ProfileConstans.direction.label,
      name:ProfileConstans.direction.name,
      required:true,
      grid
  }
}

const website = (grid?:any) => {
  return {
      type:'input',
      label:ProfileConstans.website.label,
      name:ProfileConstans.website.name,
      required:true,
      grid
  }
}

    const createAt = () => {
        return {
            type:'date',
            label:ProfileConstans.createAt.label,
            name:ProfileConstans.createAt.name,
            required:true,
        }
    }
    const birthDate = () => {
      return {
          type:'date',
          label:ProfileConstans.birthDate.label,
          name:ProfileConstans.birthDate.name,
          required:true,
      }
  }
    const check = () => {
      return {
          type:'checkbox',
          label:ProfileConstans.createAt.label,
          name:ProfileConstans.createAt.name,
          required:true,
      }
  }
  const radio = () => {
    return {
        type:'radio',
        label:ProfileConstans.createAt.label,
        name:ProfileConstans.createAt.name,
        required:true,
    }
}
const textarea = () => {
  return {
      type:'textarea',
      label:ProfileConstans.createAt.label,
      name:ProfileConstans.createAt.name,
      required:true,
  }
}
const divider = () => {
  return {
    type: 'divider',
  };
};
const space = () => {
  return {
    type: 'space',
  };
};

    export const loginGroup: FormData = {
        type: Type.update,
        data: [
          name(),
          password()
        ],
    };

    export const updateGroup: FormData = {
        type: Type.update,
        data: [
          divider(),
          name(),
          lastname(),
          phone(),
          direction(),
          website(),
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
