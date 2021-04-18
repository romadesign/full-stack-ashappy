const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

// Importamos modelo Tarea
import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async(req, res) => {

    const body = req.body

    try {
        const usuarioDB = await User.findOne({email: body.email})

        //evaluar email
        if(!usuarioDB){
            return res.status(400).json({
                mensaje: 'Email no encontrado'
            })
        }
        //evaluar contraseña
        if(!bcrypt.compareSync(body.pass, usuarioDB.pass)){
            return res.status(400).json({
                mensaje: 'contraseña incorrecta'
            })
        };
        const token = jwt.sign({
            data: usuarioDB
          }, 'secret', { expiresIn: 60 * 60 });

        res.json({
            usuarioDB,
            token
        });


    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }

});

module.exports = router;