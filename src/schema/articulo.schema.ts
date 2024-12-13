import { z } from "zod";

// Esquema de validación para un artículo
export const articuloSchema = z.object({
    descripcion: z.string()
        .max(200, "La descripción no puede superar los 200 caracteres."), // Menos de 200 caracteres
    precio: z.number()
        .positive("El precio debe ser un número positivo."), // Cualquier cantidad positiva
    cantidad_almacen: z.number(), // Cualquier cantidad
    fecha_caducidad: z.string()
        .refine((fecha) => !isNaN(Date.parse(fecha)), {
            message: "La fecha de caducidad debe ser una fecha válida.",
        })
        .transform((fecha) => new Date(fecha)), // Convertir a Date automáticamente
});