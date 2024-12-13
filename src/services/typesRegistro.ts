//2 Tipos: Para cuando hace return,
// Interfaz para el registro completo, tal como está en la base de datos
export interface Registro {
    id_registro: number;         // Identificador único
    id: number;         // Relación con el ID de personal
    fecha: Date;                 // Fecha en formato Date
    hora: string;                // Hora en formato string (HH:mm:ss)
    movimiento: 'entrada' | 'salida'; // Movimiento puede ser 'entrada' o 'salida'
}

// Tipo para un nuevo registro, excluyendo id_registro
export type RegistroNuevo = Omit<Registro, 'id_registro'>;