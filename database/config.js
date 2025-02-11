// const { Pool } = require('pg');
require('dotenv').config();
const { Sequelize } = require('sequelize');

// const pool = new Pool({
//     connectionString: process.env.DB_CNN,
// });

const sequelize = new Sequelize(process.env.DB_CNN, {
    dialect: 'postgres',
    logging: false,
});

const dbConnection = async () => {
    try {
        // await pool.connect();
        await sequelize.authenticate();
        console.log('DB Online');
    } catch (error) {
        console.error('Error a la hora de iniciar la BD', error);
        throw new Error('Error a la hora de iniciar la BD');
    }
};

module.exports = {
    dbConnection,
    sequelize
};
