const express = require('express');
const Task = require('../models/Task');
const { user } = require('pg/lib/defaults');

const getTasks = async (req, res = express.response) => {
    try {
        const tasks = await Task.findAll();
        res.json({
            ok: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las tareas'
        });
    }
};

const createTask = async (req, res = express.response) => {
    const { description, completed  } = req.body;
    console.log(description, completed, req.uid);

    try {
        const task = await Task.create({ description, completed, userId: req.uid });
        res.status(201).json({
            ok: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la tarea'
        });
    }
};

const updateTask = async (req, res = express.response) => {
    const { id } = req.params;
    const { completed, description } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada'
            });
        }

        task.completed = completed;
        task.description = description;
        await task.save();

        res.json({
            ok: true,
            task
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la tarea'
        });
    }
};

const deleteTask = async (req, res = express.response) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada'
            });
        }

        await task.destroy();

        res.json({
            ok: true,
            msg: 'Tarea eliminada'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la tarea'
        });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};