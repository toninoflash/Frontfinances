import { Constans } from "../../../core/consts";

export const ArtworkConstans = {

    category: {
        label:"Categoría",
        name:'category',
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
  title: {
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
  description: {
        label:"Descripción",
        name:'description',
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
    tiempo: {
        label:"Horas diarias",
        name:'tiempo',
        option: Constans.TIME
    },
    viaje: {
        label:"mmm...",
        name:'viaje',
        option: Constans.VIAJE
    },
    gastos: {
        label:"mmm...",
        name:'gastos',
        option: [
            {value:"1", label:'Si'},
            {value:"2", label:'No'},
        ]
    },
    nocuidar: {
        label:"mmm...",
        name:'nocuidar',
        option: [
            {value:"1", label:'Buscaría un nuevo hogar adecuado para el animal.'},
            {value:"2", label:'Contactaría con la organización de adopción para devolver al animal.'},
            {value:"3", label:'Pediría ayuda a amigos o familiares para que se hagan cargo del animal.'},
            {value:"4", label:'Buscaría una organización de rescate o refugio que pueda hacerse cargo del animal.'},
            {value:"5", label:'Intentaría encontrar una solución temporal hasta poder retomar el cuidado del animal.'},
        ]
    },
}
