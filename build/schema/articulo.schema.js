"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articuloSchema = void 0;
const zod_1 = require("zod");
// Esquema de validación para un artículo
exports.articuloSchema = zod_1.z.object({
    descripcion: zod_1.z.string()
        .max(200, "La descripción no puede superar los 200 caracteres."), // Menos de 200 caracteres
    precio: zod_1.z.number()
        .positive("El precio debe ser un número positivo."), // Cualquier cantidad positiva
    cantidad_almacen: zod_1.z.number(), // Cualquier cantidad
    fecha_caducidad: zod_1.z.string()
        .refine((fecha) => !isNaN(Date.parse(fecha)), {
        message: "La fecha de caducidad debe ser una fecha válida.",
    })
        .transform((fecha) => new Date(fecha)), // Convertir a Date automáticamente
});
