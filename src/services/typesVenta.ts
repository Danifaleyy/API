// Interfaz para la venta completa, tal como está en la base de datos
export interface Venta {
    id_venta: number;          // Identificador único de la venta
    id_articulo: number;       // Relación con el ID del artículo
    id: number;                // Relación con el ID del cliente
    cantidad: number;          // Cantidad de artículos vendidos
    precio: number;            // Precio unitario
    iva: number;               // Impuesto aplicado
    subtotal: number;          // Subtotal (sin incluir IVA)
    total: number;             // Total (incluyendo IVA)
    fecha_venta: Date;         // Fecha de la venta en formato Date
}

// Tipo para una nueva venta, excluyendo id_venta
export type VentaAgregar = Omit<Venta, 'id_venta'>;
