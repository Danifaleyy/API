//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Articulo, ArticuloNuevo} from '../services/typesArticulo';
import { articuloSchema } from '../schema/articulo.schema';
//Importamos las validaciones

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    //Evitar las multiples consultas a la vez
    multipleStatements: false
});
//Para mostrar todos
export const obtieneArticulo = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM articulos');
        return results;
    }catch(err){
        return{error: "No se puede obterner el articulo"};
    }
}
//Para mostrar uno en especifico
export const encuentraArticulo = async (id_articulo:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM articulos WHERE id_articulo = ? LIMIT 1', id_articulo);
        return results;
    }catch(err){
        return {error: "No se encuentra ese articulo"};
    }
}
//Para insertar
export const agregarArticulo = async(nuevo:ArticuloNuevo) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = articuloSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO articulos(descripcion,precio,cantidad_almacen,fecha_caducidad) values (?,?,?,?)',[nuevo.descripcion,nuevo.precio,nuevo.cantidad_almacen,nuevo.fecha_caducidad]);
        return results;
    }catch(err){
        return{error: "No se puede agregar al articulo"}
    }
}
//Para modificar
export const modificarArticulo = async (modificado:Articulo) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE articulos SET descripcion=?,precio=?,cantidad_almacen=?,fecha_caducidad=? WHERE id_articulo=?',[modificado.descripcion,modificado.precio,modificado.cantidad_almacen,modificado.fecha_caducidad,modificado.id_articulo]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro
export const borrarArticulo = async(id_articulo:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM articulos WHERE id_articulo=?',[id_articulo]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}