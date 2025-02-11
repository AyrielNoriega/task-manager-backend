const bcrypt = require('bcryptjs');
const express = require('express');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = express.response) => {
    const {name, email, password } = req.body;
    console.log(name, email, password);
    
    try {

        // validar email
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        // encryptar contraseña
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });

        // generar JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        });
    }

    // res.status(201).json({
    //     ok: true,
    //     msg: 'registro'
    // })
}

const loginUser = async (req, res = express.response) => {
    const {email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario incorrectos'
            });
        }


        // comparar contraseñas
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña incorrectos'
            });
        }

        // generar JWT
        const token = await generateJWT(user.id, user.name);
        console.log(token);
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error de autenticación'
        });
    }

}

const renewToken = async (req, res = express.response) => {

    res.status(201).json({
        ok: true,
        msg: 'renew'
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}