//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Registro, RegistroNuevo} from '../services/typesRegistro';
import { RegistroSchema } from '../schema/registro.schema';
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
export const obtieneRegistro = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM registro');
        return results;
    }catch(err){
        return{error: "No se puede obterner el registro"};
    }
}
//Para mostrar uno en especifico
export const encuentraRegistro = async (id_registro:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM registro WHERE id_registro = ? LIMIT 1', id_registro);
        return results;
    }catch(err){
        return {error: "No se encuentra ese registro"};
    }
}
//Para insertar
export const agregarRegistro = async(nuevo:RegistroNuevo) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = RegistroSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO registro(id,fecha,hora,movimiento) values (?,?,?,?)',[nuevo.id,nuevo.fecha,nuevo.hora,nuevo.movimiento]);
        return results;
    }catch(err){
        return{error: "No se puede agregar al registro"}
    }
}
//Para modificar
export const modificarRegistro = async (modificado:Registro) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE registro SET id=?,fecha=?,hora=?,movimiento=? WHERE id_registro=?',[modificado.id,modificado.fecha,modificado.hora,modificado.movimiento,modificado.id_registro]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro
export const borrarRegistro = async(id_registro:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM registro WHERE id_registro=?',[id_registro]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}