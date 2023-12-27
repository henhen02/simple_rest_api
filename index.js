import express from 'express';
import authRoutes from './src/routes/authRoute.js';
import userRoutes from './src/routes/userRoute.js';

const port = 8080;
const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
