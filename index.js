/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */

const express = require('express');
// const cors = require('cors');
require('dotenv').config();


const app = express();

// Directorio público
app.use(express.static('public'));

// Rutas
// TODO:  CRUD AUTH
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD EVENTOS

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});