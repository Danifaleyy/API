"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroNuevoSchema = exports.RegistroSchema = void 0;
const zod_1 = require("zod");
// Esquema para la interfaz Registro
exports.RegistroSchema = zod_1.z.object({
    id_registro: zod_1.z.number().int().positive(), // id_registro debe ser un entero positivo
    id: zod_1.z.number().int().positive(), // id (id_personal) debe ser un entero positivo
    fecha: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Fecha inválida"
    }), // Validación de fecha válida
    hora: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: "Hora debe estar en formato HH:mm:ss"
    }), // Validación de hora en formato HH:mm:ss
    movimiento: zod_1.z.enum(['entrada', 'salida']), // movimiento puede ser solo 'entrada' o 'salida'
});
// Esquema para RegistroNuevo (sin id_registro)
exports.RegistroNuevoSchema = exports.RegistroSchema.omit({
    id_registro: true, // Excluimos id_registro del esquema
});
