import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tareaSchema = new Schema({
    nombre: {type: String, required: [true, 'Nombre de tarea obligatorio']},
    descripcion: { type: String, required: [true, 'Nombre de tarea obligatorio']},
    usuarioId: String,
    date: {type: Date, default: Date.now},
    activo: {type: Boolean, default: true}
});

//Convertido a modelo
const Tarea = mongoose.model('Tarea', tareaSchema)

export default Tarea;