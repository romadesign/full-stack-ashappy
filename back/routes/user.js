var express = require('express');
var router = express.Router();

// Importamos modelo Tarea
import User from '../models/user';

const {verificarAuth, verificarAdministrador} = require('../middlewares/autenticacion')

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Filtrar campos Put
const _ = require('underscore');

router.post('/nuevo-usuario', async (req, res) => {

  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role,
    activo: req.body.activo
  }

  body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

  try {
    const userDB = await User.create(body);
    return res.json(userDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }

});

//Put usuario
router.put('/usuario/:id', async(req, res) =>{
    const _id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'pass', 'activo']);

    if(body.pass){
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }
    try {
        const usuarioDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: false})
        return res.json(usuarioDB)
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
          });
    }
});


//Get con parametros
router.get('/usuario/:id', async(req, res) =>{

  const _id = req.params.id;

  try {
    
    const usuarioDB = await User.findOne({_id})
    res.json(usuarioDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }

})




/* GET con todos los users */
router.get('/usuarios', async(req, res) => {
  try {
    const usuarioDB = await User.find();
    res.json(usuarioDB)
  } catch (error) {
    return res.status(400).json({
      mensaje: 'No tienes lo requerimientos para mirar los usuarios',
      error
    });
  }
});


//Delete eliminar un usuario
router.delete('/usuario/:id', async(req, res)=>{

  const _id = req.params.id;

  try {
    
    const usuarioDB = await User.findByIdAndDelete({_id});
    if(!usuarioDB){
      return res.status(400).json({
          mensaje: 'No se encontro el id indicado',
          error
      })
  }
    res.json(usuarioDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'No se encontro el ID',
      error
    });
  }

})




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
