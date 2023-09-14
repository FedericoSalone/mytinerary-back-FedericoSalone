import 'dotenv/config';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser'; 
import './config/database.js';
import indexRouter from './router/indexRouter.js'; 

const server = express();

server.use(cors());
server.use(express.json());


server.use(bodyParser.json({ limit: "10mb" }));
server.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

server.use('/api', indexRouter);

server.get('/', (request, response) => {
    response.send('Servidor activo en /');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});

