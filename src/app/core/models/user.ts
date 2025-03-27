import { environment } from "../../../enviroments/environment";

export class User {
    constructor(
        public tipe: string,
        public name: string,
        public lastname: string,
        public email: string,
        public uid: string,
        public img: string,
        public role?: string,
        public password?: string,
        public active?: boolean,
        public createAt?:Date,
        public country?: string,
        public city?: string,

    ){}


}
