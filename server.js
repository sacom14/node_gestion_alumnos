import express from 'express';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.emit.env.PORT || 3000;

app.use(express.json());


app.use('/students', studentsRoutes);

app.listen( PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});