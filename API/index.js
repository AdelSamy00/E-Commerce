import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dbConnection from './db/index.js';
import { createServer } from 'http';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import { importData } from './assets/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
dbConnection();

const corsOptions = {
  origin: '*',
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(morgan('dev'));

app.use(router);

const httpServer = createServer(app);
//importData();
httpServer.listen(PORT, () => {
  console.log(`Dev Server Running On Port: ${PORT}`);
});