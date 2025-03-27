export class User {
    constructor(
        public name: string,
        public tipe: string,
        public uid: string,
        public img: string,
        public description: string,
        public active?: boolean,
        public createAt?:Date,
        public like?:string,
        public price?:string
    ){}


}
