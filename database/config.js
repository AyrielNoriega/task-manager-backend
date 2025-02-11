const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DB_CNN,
});

const dbConnection = async () => {
    try {
        await pool.connect();
        console.log('DB Online');
    } catch (error) {
        console.error('Error a la hora de iniciar la BD', error);
        throw new Error('Error a la hora de iniciar la BD');
    }
};

module.exports = {
    dbConnection,
    pool
};
