const express = require('express');

const app = express();

// Directorio público
app.use(express.static('public'));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});