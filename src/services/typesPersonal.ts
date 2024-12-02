//2 Tipos: Para cuando hace return,
export interface Personal{
    id:number,
    nombre: string,
    direccion: string,
    telefono: string,
    estatus: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type PersonalNuevo = Omit<Personal,'id'>