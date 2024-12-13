//2 Tipos: Para cuando hace return,
export interface Articulo {
    id_articulo: number;                     // Identificador único
    descripcion: string;            // Descripción del artículo
    precio: number;                 // Precio del artículo (usar number, no int)
    cantidad_almacen: number;       // Cantidad en el almacén (usar number para cálculos)
    fecha_caducidad: Date;          // Fecha de caducidad como tipo Date
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type ArticuloNuevo = Omit<Articulo, 'id_articulo'>;
