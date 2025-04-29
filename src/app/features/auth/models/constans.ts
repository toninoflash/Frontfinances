import { Constans } from "../../../core/consts";

export const AuthConstans = {
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
      label:"Descripción",
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

    country: {
        label:"Pais",
        name:'country',
        option: [
            {value:"1", label:'España'},
        ]
    },
    city: {
        label:"Provincia",
        name:'city',
        option: Constans.PROVINCIAS_ESPAÑA
    },

}
