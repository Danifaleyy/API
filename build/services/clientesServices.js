"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarCliente = exports.modificarCliente = exports.agregarCliente = exports.encuentraClienteTelefono = exports.encuentraCliente = exports.obtieneClientes = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const clientes_schema_1 = require("../schema/clientes.schema");
const conexion = promise_1.default.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    multipleStatements: false
});
// Obtener todos los clientes
const obtieneClientes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM clientes');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener los clientes" };
    }
});
exports.obtieneClientes = obtieneClientes;
// Obtener un cliente específico
const encuentraCliente = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM clientes WHERE id = ? LIMIT 1', id);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra ese cliente" };
    }
});
exports.encuentraCliente = encuentraCliente;
// Obtener clientes por teléfono
const encuentraClienteTelefono = (telefono) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM clientes WHERE telefono = ?', telefono);
        return results;
    }
    catch (err) {
        return { error: "No se puede encontrar al cliente con ese número de teléfono" };
    }
});
exports.encuentraClienteTelefono = encuentraClienteTelefono;
// Insertar un nuevo cliente
const agregarCliente = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validacion = clientes_schema_1.clienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = yield conexion.query('INSERT INTO clientes(nombre, direccion, telefono, correo_electronico, ciudad) VALUES (?, ?, ?, ?, ?)', [
            nuevo.nombre,
            nuevo.direccion,
            nuevo.telefono,
            nuevo.correo_electronico,
            nuevo.ciudad
        ]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar el cliente" };
    }
});
exports.agregarCliente = agregarCliente;
// Modificar un cliente
const modificarCliente = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('UPDATE clientes SET nombre=?, direccion=?, telefono=?, correo_electronico=?, ciudad=? WHERE id=?', [
            modificado.nombre,
            modificado.direccion,
            modificado.telefono,
            modificado.correo_electronico,
            modificado.ciudad,
            modificado.id
        ]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar el cliente" };
    }
});
exports.modificarCliente = modificarCliente;
// Eliminar un cliente
const borrarCliente = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('DELETE FROM clientes WHERE id=?', [id]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar el cliente" };
    }
});
exports.borrarCliente = borrarCliente;
