/**
 * Tasks Routes
 * /routes/tasks
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');

const router = Router();

router.use(validateJWT); // esto se ejecutará en todas las rutas

// Obtener todas las tareas
router.get('/', getTasks);

// Crear una nueva tarea
router.post(
    '/',
    [
        check('description', 'El título es obligatorio').not().isEmpty(),
        check('completed', 'Completed es requerido').not().isEmpty().isBoolean(),
        validateFields
    ],
    createTask
);

// Actualizar una tarea
router.put(
    '/:id',
    [
        check('description', 'El título es obligatorio').not().isEmpty(),
        check('completed', 'Completed es requerido').not().isEmpty().isBoolean(),
        validateFields
    ],
    updateTask
);

// Eliminar una tarea
router.delete('/:id', deleteTask);

module.exports = router;