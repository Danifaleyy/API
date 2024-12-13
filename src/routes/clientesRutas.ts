import express, { Request, Response } from 'express';
import * as clientesServices from '../services/clientesServices';
//Activamos las rutas
const router = express.Router();

// Obtener todos los clientes
router.get('/', async (_req: Request, res: Response) => {
    let clientes = await clientesServices.obtieneClientes();
    res.send(clientes);
});

// Obtener un cliente específico por ID
router.get('/:id', async (req: Request, res: Response) => {
    let cliente = await clientesServices.encuentraCliente(Number(req.params.id));
    res.send(cliente);
});

// Obtener clientes por teléfono
router.get('/telefono/:telefono', async (req: Request, res: Response) => {
    let cliente = await clientesServices.encuentraClienteTelefono(req.params.telefono);
    res.send(cliente);
});

// Insertar un nuevo cliente
router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, direccion, telefono, correo_electronico, ciudad } = req.body;
        const nuevo = await clientesServices.agregarCliente({
            nombre,
            direccion,
            telefono,
            correo_electronico,
            ciudad
        });
        res.send(nuevo);
    } catch (e) {
        res.status(400).send("No se puede agregar el cliente");
    }
});

// Modificar un cliente existente
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, direccion, telefono, correo_electronico, ciudad } = req.body;
        const modificado = await clientesServices.modificarCliente({
            id,
            nombre,
            direccion,
            telefono,
            correo_electronico,
            ciudad
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

// Eliminar un cliente
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const eliminado = await clientesServices.borrarCliente(Number(id));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

export default router;