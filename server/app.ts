// aqui va las conexiones 
import express from 'express';
import { Sequelize } from 'sequelize';
import connectionDB from './database/conectionDB';
import UserModel from './models/userModel';
import newsModel from './models/newsModel';
import resourceModel from './models/resourceModel';
import videoModel from './models/videoModel';
import cors from 'cors';
// import path from 'path';
import { PORT } from './config';

export const app = express();

// configuracion de cors
app.use(cors({
    origin: 'http://localhost:5173', // Cambia al puerto de tu frontend
    credentials: true, // Permite cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Middleware para procesar datos JSON
app.use(express.json());

//rutas API
// app.use('/api', UserModel);

//funcion para autenticcar y sincronizar las tablas de la base de datos
 
const initializeDatabase = async (Sequelize: Sequelize) => {
    try {
        await Sequelize.authenticate();
        console.log("Conexion exitosa a la base de datos");

        await UserModel.sync({force: true});
        console.log("tabla de usuarios sincronizada");

        await newsModel.sync({force: true});
        console.log("tabla de noticias sincronizada");

        await resourceModel.sync({force: true});
        console.log("tabla de recursos sincronizada");

        await videoModel.sync({force: true});
        console.log("tabla de videos sincronizada");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

initializeDatabase(connectionDB);

//iniciar servidor 

export const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto en http://localhost:${PORT}`);
});