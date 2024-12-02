//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Personal, PersonalNuevo} from '../services/typesPersonal';
//Importamos las validaciones
import { personalSchema } from '../schema/personal.schema';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "daniel123",
    database: "pw2024",
    port: 3306,
    //Evitar las multiples consultas a la vez
    multipleStatements: false
});
//Para mostrar todos
export const obtienePersonal = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM personal');
        return results;
    }catch(err){
        return{error: "No se puede obterner el personal"};
    }
}
//Para mostrar uno en especifico
export const encuentraPersonal = async (id:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1', id);
        return results;
    }catch(err){
        return {error: "No se encuentra ese personal"};
    }
}
//Para mostrar usuarios con el mismo telefono
export const encuentraPersonalTelefono = async (telefono:string) => {
    try {
        const [results] = await conexion.query('SELECT * FROM personal WHERE telefono = ? AND estatus = 1', telefono);
        return results;
    }catch(err){
        return {error: "No se puede encontrar al personal con ese numero de telefono"}
    }
}
//Para insertar
export const agregarPersonal = async(nuevo:PersonalNuevo) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        //const validacion = personalSchema.safeParse(AquienVaA_Validar);
        const validacion = personalSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO personal(nombre,direccion,telefono,estatus) values (?,?,?,?)',[nuevo.nombre,nuevo.direccion,nuevo.telefono,nuevo.estatus]);
        return results;
    }catch(err){
        return{error: "No se puede agregar al personal"}
    }
}
//Para modificar
export const modificarPersonal = async (modificado:Personal) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE personal SET nombre=?,direccion=?,telefono=?,estatus=? WHERE id=?',[modificado.nombre,modificado.direccion,modificado.telefono,modificado.estatus,modificado.id]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro
export const borrarPersonal = async(id:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM personal WHERE id=?',[id]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}