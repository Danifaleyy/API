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
exports.borrarRegistro = exports.modificarRegistro = exports.agregarRegistro = exports.encuentraRegistro = exports.obtieneRegistro = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
const registro_schema_1 = require("../schema/registro.schema");
//Importamos las validaciones
const conexion = promise_1.default.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    //Evitar las multiples consultas a la vez
    multipleStatements: false
});
//Para mostrar todos
const obtieneRegistro = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM registro');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner el registro" };
    }
});
exports.obtieneRegistro = obtieneRegistro;
//Para mostrar uno en especifico
const encuentraRegistro = (id_registro) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM registro WHERE id_registro = ? LIMIT 1', id_registro);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra ese registro" };
    }
});
exports.encuentraRegistro = encuentraRegistro;
//Para insertar
const agregarRegistro = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = registro_schema_1.RegistroSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO registro(id,fecha,hora,movimiento) values (?,?,?,?)', [nuevo.id, nuevo.fecha, nuevo.hora, nuevo.movimiento]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar al registro" };
    }
});
exports.agregarRegistro = agregarRegistro;
//Para modificar
const modificarRegistro = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE registro SET id=?,fecha=?,hora=?,movimiento=? WHERE id_registro=?', [modificado.id, modificado.fecha, modificado.hora, modificado.movimiento, modificado.id_registro]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarRegistro = modificarRegistro;
//Eliminar un registro
const borrarRegistro = (id_registro) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM registro WHERE id_registro=?', [id_registro]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarRegistro = borrarRegistro;
