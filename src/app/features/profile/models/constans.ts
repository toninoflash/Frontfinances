import { Constans } from "../../../core/consts";

export const ProfileConstans = {
    title:"Asunto",

    tipo: {
        label:"Usuario",
        name:'tipe',
        option: [
            {value:"1", label:'Protectora'},
            {value:"2", label:'Particular'},
        ]
    },
    password: {
        label:"Contraseña",
        labelConfin:"Confirmar contraseña",
        nameConfin:"passconf",
        name:'password',
    },



    username: {
      label:"Nombre de usuario",
      name:'username',
  },
    name: {
        label:"Nombre",
        name:'name',
    },
    lastName: {
        label:"Apellidos",
        name:'lastname',
    },
    nick: {
        label:"Usuario",
        name:'nick',
    },
    email: {
        label:"email",
        name:'email',
    },
    bio: {
      label:"Biografía",
      name:'bio',
  },
    createAt: {
        label:"Fecha de nacimiento",
        name:'createAt',
    },
    birthDate: {
      label:"Fecha de nacimiento",
      name:'birthDate',
  },

  phone: {
        label:"Teléfono",
        name:'phone',

    },
    direction: {
        label:"Dirección",
        name:'direction',
    },
    website: {
        label:"Web",
        name:'website',
    },
    espacio: {
        label:"Espacio",
        name:'espacio',
        option: [
            {value:"1", label:'Si'},
            {value:"2", label:'No'},
        ]
    },
}
