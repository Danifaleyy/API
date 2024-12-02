import express, {Request,Response} from 'express';
import * as personalServices from '../services/personalServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos
//http://localhost:3001/api/personal/
router.get('/', async (_req: Request, res: Response)=>{
    let personal = await personalServices.obtienePersonal();
    res.send(personal)
});

//Para mostrar uno en especifico
//http://localhost:3001/api/personal/1 <------Numero id del personal
router.get('/:id', async (req: Request, res: Response)=>{
    let personal = await personalServices.encuentraPersonal(Number(req.params.id));
    res.send(personal);
});
//Para mostrar usuarios con el mismo telefono
//http://localhost:3001/api/personal/telefono/1234567890 <------telefono
router.get('/telefono/:telefono', async (req: Request, res: Response)=>{
    let personal = await personalServices.encuentraPersonalTelefono(req.params.telefono);
    res.send(personal);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre,direccion,telefono,estatus} = req.body;
        const nuevo = await personalServices.agregarPersonal({
            nombre,
            direccion,
            telefono,
            estatus
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar el personal");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id,nombre,direccion,telefono,estatus} = req.body;
        const modificado = await personalServices.modificarPersonal({
            id,
            nombre,
            direccion,
            telefono,
            estatus
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id} = req.body;
        const eliminado = await personalServices.borrarPersonal(Number(id));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;