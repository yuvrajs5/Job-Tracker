import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();


// express-async-errors 
import 'express-async-errors';

import morgan from 'morgan';

// Database and Authentication
import connectDB from './db/connect.js';

import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173', // for dev
  'https://job-tracker-7s7w40psm-yuvraj-singhs-projects-07fb547b.vercel.app', // vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.options('*', cors());


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
//   res.setHeader('Access-Control-Expose-Headers', 'auth'); // Expose the 'auth' header to the client
//   next();
// });


app.use(express.urlencoded({ extended: true }));


// Routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/authenticate.js';

// Deployment
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Security Packages
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// Cookie Parser
import cookieParser from 'cookie-parser';

if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// Only for Deployment
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json());
app.use(cookieParser());

// Use security packages for Express app
app.use(helmet());
app.use(mongoSanitize());

app.get('/api/v1', (req, res) => {
  res.send('Hello');
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// Only for Deployment
app.get('*', function(request, response){
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try{
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => { 
      console.log(`Server is listening on port ${port}...`)
    });

  } catch(error){
    console.log(error);
  }
};

start();