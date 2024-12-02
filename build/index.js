"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Creamos la aplicacion atraves del paquete express y llamamos al constructor
const app = (0, express_1.default)();
//Configurar rutas para el acceso personal
const personalRutas_1 = __importDefault(require("./routes/personalRutas"));
//Todo lo que regresa al usuario es de tipo JSON
app.use(express_1.default.json());
//Puerto para escuchar la peticion del fronted
const PUERTO = 3001;
//Activar la ruta base
app.use('/api/personal', personalRutas_1.default);
//Ruta
// app.get('/hola',(_req, res) => {
//    let fecha = new Date().toLocaleDateString();
//    res.send('mundo con la fecha' + fecha + 'con TypeScript');
//})
//Encender el servidor y lo ponemos en escucha
app.listen(PUERTO, () => {
    console.log(`Servidor en ejecución y escuchando el puerto ${PUERTO}`);
});
