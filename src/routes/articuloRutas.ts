import express, {Request,Response} from 'express';
import * as articuloServices from '../services/articuloServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos
//http://localhost:3001/api/personal/
router.get('/', async (_req: Request, res: Response)=>{
    let articulo = await articuloServices.obtieneArticulo();
    res.send(articulo)
});

//Para mostrar uno en especifico
//http://localhost:3001/api/personal/1 <------Numero id del personal
router.get('/:id_articulo', async (req: Request, res: Response)=>{
    let articulo = await articuloServices.encuentraArticulo(Number(req.params.id_articulo));
    res.send(articulo);
});
//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {descripcion,precio,cantidad_almacen,fecha_caducidad} = req.body;
        const nuevo = await articuloServices.agregarArticulo({
            descripcion,
            precio,
            cantidad_almacen,
            fecha_caducidad
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar el articulo");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_articulo,descripcion,precio,cantidad_almacen,fecha_caducidad} = req.body;
        const modificado = await articuloServices.modificarArticulo({
            id_articulo,
            descripcion,
            precio,
            cantidad_almacen,
            fecha_caducidad
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_articulo} = req.body;
        const eliminado = await articuloServices.borrarArticulo(Number(id_articulo));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;