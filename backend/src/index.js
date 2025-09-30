import express from 'express';
import apiRoutes from './routes/api.js'
import jwt from 'jsonwebtoken';
import cookieParser  from 'cookie-parser';

const app = express();

app.use(cookieParser("pisello"));

app.use('/', apiRoutes);
app.use('/api', apiRoutes);

app.listen(3000, async () => {
    console.log("Server in ascolto su http://localhost:3000")
});