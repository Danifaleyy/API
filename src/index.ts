import express from 'express';
import cors from 'cors';
import personalRutas from './routes/personalRutas';
import clientesRutas from './routes/clientesRutas'; // Importa las rutas de clientes
import articuloRutas from './routes/articuloRutas';
import registroRutas from './routes/registroRutas';
import ventaRutas from './routes/ventaRutas';
import compraRutas from './routes/compraRutas';

// Creamos la aplicación a través de Express
const app = express();

// Configurar middleware para que Express entienda JSON
app.use(express.json());
app.use(cors());

// Puerto para escuchar la petición del frontend
const PUERTO = 3001;

// Registrar rutas
app.use('/api/personal', personalRutas); // Ruta de personal
app.use('/api/clientes', clientesRutas); // Ruta de clientes
app.use('/api/articulos', articuloRutas); // Ruta de articulos
app.use('/api/registro', registroRutas);
app.use('/api/venta', ventaRutas);
app.use('/api/compra', compraRutas);
// Iniciar el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor en ejecución y escuchando el puerto ${PUERTO}`);
});
