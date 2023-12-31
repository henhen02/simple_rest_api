// import express from 'express';
// import authRoutes from './src/routes/authRoute.js';
// import userRoutes from './src/routes/userRoute.js';
// import profileRoute from './src/routes/profileRoute.js';
// import bookRoutes from './src/routes/bookRoute.js';

const express = require('express');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const bookRoutes = require('./routes/bookRoute');

const port = 8080;
const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/me', profileRoute);
app.use('/api/v1/books', bookRoutes);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// })

module.exports = app;