import express, {Request,Response} from 'express';
import * as registroServices from '../services/registroServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos
//http://localhost:3001/api/personal/
router.get('/', async (_req: Request, res: Response)=>{
    let registro = await registroServices.obtieneRegistro();
    res.send(registro)
});

//Para mostrar uno en especifico
//http://localhost:3001/api/personal/1 <------Numero id del personal
router.get('/:id_registro', async (req: Request, res: Response)=>{
    let registro = await registroServices.encuentraRegistro(Number(req.params.id_registro));
    res.send(registro);
});
//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {id,fecha,hora,movimiento} = req.body;
        const nuevo = await registroServices.agregarRegistro({
            id,
            fecha,
            hora,
            movimiento
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar el registro");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_registro,id,fecha,hora,movimiento} = req.body;
        const modificado = await registroServices.modificarRegistro({
            id_registro,
            id,
            fecha,
            hora,
            movimiento
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_registro} = req.body;
        const eliminado = await registroServices.borrarRegistro(Number(id_registro));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;