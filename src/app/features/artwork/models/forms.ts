import { FormData, Type } from "../../../core/interfaces";
import { ArtworkConstans } from "./constans";

export namespace FormsArtwork {

    const category = (grid:any = '', disabled?:boolean) => {
        return {
            type:'select',
            label:ArtworkConstans.category.label,
            name:ArtworkConstans.category.name,
            option:ArtworkConstans.category.option,
            required:true,
            grid,
            disabled
        }
    }
    const title = (grid?:any) => {
      return {
          type:'input',
          label:ArtworkConstans.title.label,
          name:ArtworkConstans.title.name,
          required:true,
          grid
      }
  }



const description = () => {
  return {
      type:'textarea',
      label:ArtworkConstans.description.label,
      name:ArtworkConstans.description.name,
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

    export const createGroup: FormData = {
        type: Type.update,
        data: [
          divider(),
          title(),
          category(),
          description()
        ],
    };

    export const updateGroup: FormData = {
        type: Type.update,
        data: [


        ],
    };
    export const pruebaGroup: FormData = {
      type: Type.update,
      data: [

      ],
  };


}
