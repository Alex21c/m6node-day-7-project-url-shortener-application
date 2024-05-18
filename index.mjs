import 'dotenv/config';
import express from 'express';
import UserRoutes from './Routes/User.Routes.mjs';
import UrlShortenerRoutes from './Routes/UrlShortener.Routes.mjs';
import mongoose from 'mongoose';


const PRJ_NAME = "m6node-day-7-project-url-shortener-application";


  mongoose.connect(`mongodb://127.0.0.1:27017/${PRJ_NAME}`)
  .then(()=>{ console.log('Connection Established with Database!');})
  .catch((error)=>{
    console.log('ERROR: Unable to connect to DB');
    console.log('Exiting...');
    process.exit(1);
  });

 

// Creating a express server
  let server = express();
  const PORT = process.env.PORT ? process.env.PORT : 3000;

// Making a Database Connection

// Middleware for logging errors
  // server.use(morgan('combined'));

// Allowing me to parse req.body
  server.use(express.json());

// Linking Routes
  server.use(UserRoutes);
  server.use(UrlShortenerRoutes);

  

// launching server
  server.listen(PORT, (req, res)=>{
    console.log(`Express Server is up and running at port ${PORT}`);
  });

