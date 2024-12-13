import { z } from 'zod';

// Esquema para la interfaz Compra
export const CompraSchema = z.object({
    id_articulo: z.number()
        .int()
        .positive({ message: "El id del artículo debe ser un entero positivo" }), // id_articulo debe ser un entero positivo
    cantidad: z.number()
        .int()
        .positive({ message: "La cantidad debe ser un entero positivo" }), // cantidad debe ser un entero positivo
    precio: z.number()
        .positive({ message: "El precio debe ser un número positivo" }), // precio debe ser un número positivo
    iva: z.number()
        .nonnegative({ message: "El IVA no puede ser negativo" }), // IVA no puede ser negativo
    subtotal: z.number()
        .positive({ message: "El subtotal debe ser un número positivo" }), // subtotal debe ser un número positivo
    total: z.number()
        .positive({ message: "El total debe ser un número positivo" }), // total debe ser un número positivo
    fecha_compra: z.string()
        .refine((val) => !isNaN(Date.parse(val)), { message: "La fecha debe ser válida" }) // Validación de fecha válida
        .transform((val) => new Date(val)), // Convertir a Date automáticamente
});
