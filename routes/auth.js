/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const {createUser, loginUser, renewToken} = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');


router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    loginUser
);  

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    createUser);

router.get('/renew', renewToken);


module.exports = router;