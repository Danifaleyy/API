// 2 Tipos: Para cuando hace return,
// Interfaz para la compra completa, tal como está en la base de datos
export interface Compra {
    id_compra: number;          // Identificador único de la compra
    id_articulo: number;        // Relación con el ID del artículo
    cantidad: number;           // Cantidad comprada
    precio: number;             // Precio del artículo
    iva: number;                // IVA aplicado
    subtotal: number;           // Subtotal de la compra
    total: number;              // Total de la compra
    fecha_compra: Date;         // Fecha de la compra en formato Date
}

// Tipo para una nueva compra, excluyendo id_compra
export type CompraAgregar = Omit<Compra, 'id_compra'>;