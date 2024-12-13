import express, {Request,Response} from 'express';
import * as ventaServices from '../services/ventaServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos
//http://localhost:3001/api/personal/
router.get('/', async (_req: Request, res: Response)=>{
    let venta = await ventaServices.obtieneVenta();
    res.send(venta)
});

//Para mostrar uno en especifico
//http://localhost:3001/api/personal/1 <------Numero id del personal
router.get('/:id_venta', async (req: Request, res: Response)=>{
    let venta = await ventaServices.encuentraVenta(Number(req.params.id_venta));
    res.send(venta);
});
//Para insertar
//Rutas para hacer insercciones: Post es para insertar
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {id_articulo,id,cantidad,precio,iva,subtotal,total,fecha_venta} = req.body;
        const nuevo = await ventaServices.agregarVenta({
            id_articulo,
            id,
            cantidad,
            precio,
            iva,
            subtotal,
            total,
            fecha_venta
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar el venta");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_venta,id_articulo,id,cantidad,precio,iva,subtotal,total,fecha_venta} = req.body;
        const modificado = await ventaServices.modificarVenta({
            id_venta,
            id_articulo,
            id,
            cantidad,
            precio,
            iva,
            subtotal,
            total,
            fecha_venta
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_venta} = req.body;
        const eliminado = await ventaServices.borrarVenta(Number(id_venta));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;