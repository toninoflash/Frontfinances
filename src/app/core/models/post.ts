
export class Post {
    constructor(
        public uid: string,
        public imageId: string,
        public like: number,
        public createAt?:Date,
    ){}


}
