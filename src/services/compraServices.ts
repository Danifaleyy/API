//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Compra, CompraAgregar} from '../services/typesCompra';
import { CompraSchema } from '../schema/compra.schema';
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
export const obtieneCompra = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM compras');
        return results;
    }catch(err){
        return{error: "No se puede obterner el compras"};
    }
}
//Para mostrar uno en especifico
export const encuentraCompra = async (id_compra:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM compras WHERE id_compra = ? LIMIT 1', id_compra);
        return results;
    }catch(err){
        return {error: "No se encuentra ese Compra"};
    }
}
//Para insertar
export const agregarCompra = async(nuevo:CompraAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = CompraSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO compras(id_articulo,cantidad,precio,iva,subtotal,total,fecha_compra) values (?,?,?,?,?,?,?)',[nuevo.id_articulo,nuevo.cantidad,nuevo.precio,nuevo.iva,nuevo.subtotal,nuevo.total,nuevo.fecha_compra]);
        return results;
    }catch(err){
        return{error: "No se puede agregar al Compra"}
    }
}
//Para modificar
export const modificarCompra = async (modificado:Compra) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE compras SET id_articulo=?,cantidad=?,precio=?,iva=?,subtotal=?,total=?,fecha_compra=? WHERE id_compra=?',[modificado.id_articulo,modificado.cantidad,modificado.precio,modificado.iva,modificado.subtotal,modificado.total,modificado.fecha_compra,modificado.id_compra]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro
export const borrarCompra = async(id_compra:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM compras WHERE id_compra=?',[id_compra]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}