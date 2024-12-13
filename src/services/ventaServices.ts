//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Venta, VentaAgregar} from '../services/typesVenta';
import { VentaSchema } from '../schema/venta.schema';
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
export const obtieneVenta = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM ventas');
        return results;
    }catch(err){
        return{error: "No se puede obterner el Venta"};
    }
}
//Para mostrar uno en especifico
export const encuentraVenta = async (id_venta:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM ventas WHERE id_venta = ? LIMIT 1', id_venta);
        return results;
    }catch(err){
        return {error: "No se encuentra ese venta"};
    }
}
//Para insertar
export const agregarVenta = async(nuevo:VentaAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = VentaSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO ventas(id_articulo,id,cantidad,precio,iva,subtotal,total,fecha_venta) values (?,?,?,?,?,?,?,?)',[nuevo.id_articulo,nuevo.id,nuevo.cantidad,nuevo.precio,nuevo.iva,nuevo.subtotal,nuevo.total,nuevo.fecha_venta]);
        return results;
    }catch(err){
        return{error: "No se puede agregar al venta"}
    }
}
//Para modificar
export const modificarVenta = async (modificado:Venta) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE ventas SET id_articulo=?,id=?,cantidad=?,precio=?,iva=?,subtotal=?,total=?,fecha_venta=? WHERE id_venta=?',[modificado.id_articulo,modificado.id,modificado.cantidad,modificado.precio,modificado.iva,modificado.subtotal,modificado.total,modificado.fecha_venta,modificado.id_venta]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro
export const borrarVenta = async(id_venta:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM ventas WHERE id_venta=?',[id_venta]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}