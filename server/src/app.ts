import express, { Request, Response } from 'express';
import i18n from 'i18n';
import locale from './locales';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import authRoutes from './routes/Auth.route'; // <-- IMPORTA LAS RUTAS
import multer from 'multer';
import { dbUrl, nodeEnv, port } from './configs/env';
import { connect, set } from 'mongoose';
import paymentRoutes from './routes/payment.routes.js';
import path from 'path';
import { initializeAdminDatabase } from './services/Initial.services';
import router from './routes';
import { logger, stream } from './utils/logger';

const app: express.Application = express();

// --- 1. CONFIGURACIÓN DE MIDDLEWARES (Esta parte está perfecta) ---
const initializeMiddlewares = () => {
    // Middlewares de logging y seguridad primero
    if (nodeEnv === 'development') {
        app.use(morgan('dev', { stream }));
    }
    app.use(hpp());
    app.use(helmet({ crossOriginEmbedderPolicy: false }));

    // Configuración de CORS
    app.use(cors({
        origin: 'http://localhost:5173', // Origen de tu app frontend
        credentials: true
    }));

    // Middlewares para procesar los datos de las peticiones
    app.use(compression());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(cookieParser());
    app.use(multer().any());
};


// --- 2. CONFIGURACIÓN DE RUTAS (Aquí está el cambio) ---
const initializeRoutes = () => {
    // Ahora todas las rutas se definen aquí, DESPUÉS de los middlewares
    app.use('/', router); // Tus rutas principales
    app.use('/api/webpay', paymentRoutes); // La ruta de pago
    
    // --- LÍNEA AÑADIDA ---
    app.use('/api/auth', authRoutes); // <-- USA LAS NUEVAS RUTAS DE AUTENTICACIÓN
    // ---------------------

    // Servir la aplicación de React (esto debe ir al final de las rutas de la API)
    app.use(express.static(path.resolve(__dirname, "../../client/build")));
    app.get('/*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
    });
};


// --- 3. FUNCIONES DE INICIALIZACIÓN (Sin cambios) ---
const connectToDB = async () => {
    try {
        if (nodeEnv === 'development') {
            set('debug', true);
        }
        console.log(dbUrl);
        await connect(dbUrl);
        logger.info('********************');
        logger.info('Conected to Mongo DB');
        logger.info('********************');
    } catch (error) {
        console.log(error);
    }
};

const configureI18n = () => {
    i18n.configure({
        directory: __dirname + '/locales',
        defaultLocale: 'es',
        queryParameter: 'language',
        cookie: 'language',
        register: global
    });
    app.use(i18n.init);
    i18n.setLocale('es');
};


// --- 4. FUNCIÓN PRINCIPAL DE ARRANQUE (Sin cambios) ---
export const App = () => {
    connectToDB();
    configureI18n();
    initializeMiddlewares(); // Primero los middlewares
    initializeRoutes();      // Luego las rutas

    app.listen(port, () => {
        console.log(i18n.__n(`${locale.es.serverMessage}`, port));
    });
};
