import express from 'express'
const router = express.Router();

//importar modelo tarea
import Tarea from '../models/tareas';

const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion')


//Agregar una Tarea
router.post('/nueva-tarea', [verificarAuth, verificarAdministrador], async(req, res) => {
    const body = req.body;
    body.usuarioId = req.usuario._id;
    try{
        const tareaDB = await Tarea.create(body);
        res.status(200).json(tareaDB)
    }catch(error){
        return res.status(500).json({
            mensaje: 'ocurrio un error',
            error
        })
    }
});

//Get con parametros
router.get('/tarea/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const tareaDB = await Tarea.findOne({_id})
        res.json(tareaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio un error',
            error
        })
    }
});

//Get con todos los documentos TAREAS
router.get('/tareas', verificarAuth, async(req, res)=> {   
    const usuarioId = req.usuario._id
    try {
        const tareaDB = await Tarea.find({usuarioId});
        res.json(tareaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio un error',
            error
        })
    }
});


//Delete Eliminar una Tarea
router.delete('/tarea/:id', async(req, res) =>{
    const _id = req.params.id;
    try {
        const tareaDB = await Tarea.findByIdAndDelete({_id});
        if(!tareaDB){
            return res.status(400).json({
                mensaje: 'No se encontro el id indicado',
                error
            })
        }
        res.json(tareaDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio un error',
            error
        })
    }
});

//Put actualiza tarea
router.put('/tarea/:id', async(req, res)=> {
    const _id = req.params.id;
    const body = req.body;
    try {
        const tareaDb = await Tarea.findByIdAndUpdate(_id,body, {new:true})
        res.json(tareaDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrio un error',
            error
        })
    }
})

//expotacion de Router
module.exports = router;