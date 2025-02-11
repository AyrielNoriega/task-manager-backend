const express = require('express');

const createUser = async (req, res = express.response) => {

    const {name, email, password } = req.body;
    res.json({
        ok: true,
        msg: 'registro'
    })
}

const loginUser = async (req, res = express.response) => {
    const {email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login'
    })
}

const renewToken = async (req, res = express.response) => {
    
    res.json({
        ok: true,
        msg: 'renew'
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}