import express from 'express';
import cors from 'cors';
//Creamos la aplicacion atraves del paquete express y llamamos al constructor
const app = express();
//Configurar rutas para el acceso personal
import personalRutas from './routes/personalRutas';
//Todo lo que regresa al usuario es de tipo JSON
app.use(express.json())
app.use(cors());
//Puerto para escuchar la peticion del fronted
const PUERTO = 3001;
//Activar la ruta base
app.use('/api/personal', personalRutas);
//Ruta
// app.get('/hola',(_req, res) => {
//    let fecha = new Date().toLocaleDateString();
//    res.send('mundo con la fecha' + fecha + 'con TypeScript');
//})

//Encender el servidor y lo ponemos en escucha
app.listen(PUERTO,() => {
    console.log(`Servidor en ejecución y escuchando el puerto ${PUERTO}`);
})