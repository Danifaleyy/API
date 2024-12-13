"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const personalRutas_1 = __importDefault(require("./routes/personalRutas"));
const clientesRutas_1 = __importDefault(require("./routes/clientesRutas")); // Importa las rutas de clientes
const articuloRutas_1 = __importDefault(require("./routes/articuloRutas"));
const registroRutas_1 = __importDefault(require("./routes/registroRutas"));
// Creamos la aplicación a través de Express
const app = (0, express_1.default)();
// Configurar middleware para que Express entienda JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Puerto para escuchar la petición del frontend
const PUERTO = 3001;
// Registrar rutas
app.use('/api/personal', personalRutas_1.default); // Ruta de personal
app.use('/api/clientes', clientesRutas_1.default); // Ruta de clientes
app.use('/api/articulos', articuloRutas_1.default); // Ruta de articulos
app.use('/api/clientes/registro', registroRutas_1.default); // Ruta de registro
// Iniciar el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor en ejecución y escuchando el puerto ${PUERTO}`);
});
