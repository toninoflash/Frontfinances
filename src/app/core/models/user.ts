import { environment } from "../../../enviroments/environment";

export class User {
    constructor(
        public username: string,
        public name: string,
        public lastname: string,
        public email: string,
        public uid: string,
        public profileImageUrl: string,
        public role?: string,
        public password?: string,
        public active?: boolean,
        public createAt?:Date,
        public country?: string,
        public city?: string,
        public bio?: string,

    ){}
}
