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
import { NODE_ENV } from './config';
import newsRoutes from './routes/newsRoutes';
import usersRoutes from './routes/usersRoutes';
import videoRoutes from './routes/videoRoutes';
import resourceRoutes from './routes/resourceRoutes';
import { errorHandler } from './middleware/middleware';

export const app = express();

// configuracion de cors
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Cambia al puerto/URL de tu frontend
    credentials: true, // Permite cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Middleware para procesar datos JSON
app.use(express.json());

// Health check
app.get('/health', async (_req, res) => {
    try {
        await connectionDB.authenticate();
        res.json({ status: 'ok', db: 'ok' });
    } catch (err: any) {
        res.status(500).json({ status: 'error', db: 'down', message: err.message || err });
    }
});
// Rutas API
app.use('/api/news', newsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/resources', resourceRoutes);

//funcion para autenticcar y sincronizar las tablas de la base de datos
 
const initializeDatabase = async (Sequelize: Sequelize) => {
    try {
        await Sequelize.authenticate();
        console.log("Conexion exitosa a la base de datos");

        const forceSync = process.env.DB_SYNC_FORCE === 'true' || NODE_ENV === 'test';

        await UserModel.sync({ force: forceSync });
        console.log("tabla de usuarios sincronizada", { force: forceSync });

        await newsModel.sync({ force: forceSync });
        console.log("tabla de noticias sincronizada", { force: forceSync });

        await resourceModel.sync({ force: forceSync });
        console.log("tabla de recursos sincronizada", { force: forceSync });

        await videoModel.sync({ force: forceSync });
        console.log("tabla de videos sincronizada", { force: forceSync });
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

initializeDatabase(connectionDB);

// registrar middleware de errores (debe ir después de las rutas)
app.use(errorHandler);

export const server = app.listen(PORT || 3000, () => {
    console.log(`Servidor iniciado en el puerto en http://localhost:${PORT || 3000}`);
});