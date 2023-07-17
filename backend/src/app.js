const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3003', // Defina a origem permitida para o seu aplicativo React
    methods: 'GET, POST, PUT, DELETE', // Defina os métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Defina os cabeçalhos permitidos
  }));

app.use(express.json());

const loginRoutes = require('./routes/loginRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

app.use('/login', loginRoutes);
app.use('/conversation', conversationRoutes);

module.exports = app;
