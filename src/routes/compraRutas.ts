import express, {Request,Response} from 'express';
import * as compraServices from '../services/compraServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos
//http://localhost:3001/api/personal/
router.get('/', async (_req: Request, res: Response)=>{
    let compra = await compraServices.obtieneCompra();
    res.send(compra)
});

//Para mostrar uno en especifico
//http://localhost:3001/api/personal/1 <------Numero id del personal
router.get('/:id_compra', async (req: Request, res: Response)=>{
    let compra = await compraServices.encuentraCompra(Number(req.params.id_compra));
    res.send(compra);
});
//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {id_articulo,cantidad,precio,iva,subtotal,total,fecha_compra} = req.body;
        const nuevo = await compraServices.agregarCompra({
            id_articulo,
            cantidad,
            precio,
            iva,
            subtotal,
            total,
            fecha_compra
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar el compra");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_compra,id_articulo,cantidad,precio,iva,subtotal,total,fecha_compra} = req.body;
        const modificado = await compraServices.modificarCompra({
            id_compra,
            id_articulo,
            cantidad,
            precio,
            iva,
            subtotal,
            total,
            fecha_compra
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_compra} = req.body;
        const eliminado = await compraServices.borrarCompra(Number(id_compra));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;