const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Task = sequelize.define('Task', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tasks',
    timestamps: true
});

module.exports = Task;