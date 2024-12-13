import mysql from 'mysql2/promise';
import { Cliente, ClienteAgregar } from './typesClientes';
import { clienteSchema } from '../schema/clientes.schema';

const conexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    multipleStatements: false
});

// Obtener todos los clientes
export const obtieneClientes = async () => {
    try {
        const [results] = await conexion.query('SELECT * FROM clientes');
        return results;
    } catch (err) {
        return { error: "No se puede obtener los clientes" };
    }
};

// Obtener un cliente específico
export const encuentraCliente = async (id: number) => {
    try {
        const [results] = await conexion.query('SELECT * FROM clientes WHERE id = ? LIMIT 1', id);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese cliente" };
    }
};

// Obtener clientes por teléfono
export const encuentraClienteTelefono = async (telefono: string) => {
    try {
        const [results] = await conexion.query('SELECT * FROM clientes WHERE telefono = ?', telefono);
        return results;
    } catch (err) {
        return { error: "No se puede encontrar al cliente con ese número de teléfono" };
    }
};

// Insertar un nuevo cliente
export const agregarCliente = async (nuevo: ClienteAgregar) => {
    try {
        const validacion = clienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await conexion.query('INSERT INTO clientes(nombre, direccion, telefono, correo_electronico, ciudad) VALUES (?, ?, ?, ?, ?)', [
            nuevo.nombre,
            nuevo.direccion,
            nuevo.telefono,
            nuevo.correo_electronico,
            nuevo.ciudad
        ]);
        return results;
    } catch (err) {
        return { error: "No se puede agregar el cliente" };
    }
};

// Modificar un cliente
export const modificarCliente = async (modificado: Cliente) => {
    try {
        const [results] = await conexion.query('UPDATE clientes SET nombre=?, direccion=?, telefono=?, correo_electronico=?, ciudad=? WHERE id=?', [
            modificado.nombre,
            modificado.direccion,
            modificado.telefono,
            modificado.correo_electronico,
            modificado.ciudad,
            modificado.id
        ]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar el cliente" };
    }
};

// Eliminar un cliente
export const borrarCliente = async (id:number) => {
    try {
        const [results] = await conexion.query('DELETE FROM clientes WHERE id=?',[id]);
        return results;
    } catch (err) {
        return { error: "No se puede eliminar el cliente" };
    }
};