"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteSchema = void 0;
const zod_1 = require("zod");
// Expresiones regulares para validaciones
const telefonoRegEx = new RegExp(/^\+?[0-9]{10,15}$/);
const nombreRegEx = new RegExp(/^[a-zA-Z\s]+$/);
const direccionRegEx = new RegExp(/^[a-zA-Z0-9\s,.\-]+$/);
const ciudadRegEx = new RegExp(/^[a-zA-Z\s]+$/);
const correoRegEx = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
// Esquema de validaciones para clientes
exports.clienteSchema = zod_1.z.object({
    nombre: zod_1.z.string().regex(nombreRegEx, {
        message: "El nombre solo puede contener letras y espacios."
    }).min(2, "Mínimo 2 caracteres").max(200, "Máximo 200 caracteres"),
    direccion: zod_1.z.string().regex(direccionRegEx, {
        message: "La dirección solo puede contener letras, números, espacios, comas, puntos y guiones."
    }).min(2, "Mínimo 2 caracteres").max(200, "Máximo 200 caracteres"),
    telefono: zod_1.z.string().regex(telefonoRegEx, {
        message: "El teléfono debe tener entre 10 y 15 dígitos, con o sin el prefijo '+'."
    }),
    correo_electronico: zod_1.z.string().regex(correoRegEx, {
        message: "El correo electrónico no es válido."
    }),
    ciudad: zod_1.z.string().regex(ciudadRegEx, {
        message: "La ciudad solo puede contener letras y espacios."
    }).min(2, "Mínimo 2 caracteres").max(100, "Máximo 100 caracteres")
});
