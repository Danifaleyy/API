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
exports.borrarArticulo = exports.modificarArticulo = exports.agregarArticulo = exports.encuentraArticulo = exports.obtieneArticulo = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
const articulo_schema_1 = require("../schema/articulo.schema");
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
const obtieneArticulo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM articulos');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner el articulo" };
    }
});
exports.obtieneArticulo = obtieneArticulo;
//Para mostrar uno en especifico
const encuentraArticulo = (id_articulo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM articulos WHERE id_articulo = ? LIMIT 1', id_articulo);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra ese articulo" };
    }
});
exports.encuentraArticulo = encuentraArticulo;
//Para insertar
const agregarArticulo = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = articulo_schema_1.articuloSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO articulos(descripcion,precio,cantidad_almacen,fecha_caducidad) values (?,?,?,?)', [nuevo.descripcion, nuevo.precio, nuevo.cantidad_almacen, nuevo.fecha_caducidad]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar al articulo" };
    }
});
exports.agregarArticulo = agregarArticulo;
//Para modificar
const modificarArticulo = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE articulos SET descripcion=?,precio=?,cantidad_almacen=?,fecha_caducidad=? WHERE id_articulo=?', [modificado.descripcion, modificado.precio, modificado.cantidad_almacen, modificado.fecha_caducidad, modificado.id_articulo]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarArticulo = modificarArticulo;
//Eliminar un registro
const borrarArticulo = (id_articulo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM articulos WHERE id_articulo=?', [id_articulo]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarArticulo = borrarArticulo;
