export interface IFabricObjectProps {
    type: string;
    left: number;
    top: number;
    width: number;
    height: number;
    // ...other properties depending on object type
    [key: string]: unknown;
}

export interface IFabricCanvasObject {
    version: string;
    objects: Array<IFabricObjectProps>;
    //dynamic properties not use specific typing here or any
    [key: string]: unknown;

}
