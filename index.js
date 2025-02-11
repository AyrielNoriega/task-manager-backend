const express = require('express');
const { dbConnection, sequelize } = require('./database/config');
// const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());

// base de datos
dbConnection();

// Sincronizar modelos
sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

// Directorio público
app.use(express.static('public'));

// Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});