import 'dotenv/config';
import express from 'express';
import UserRoutes from './Routes/User.Routes.mjs';
import UrlShortenerRoutes from './Routes/UrlShortener.Routes.mjs';
import mongoose from 'mongoose';
import AuthenticateUser from './Middlewares/AuthenticateUser.Middleware.mjs';

const PRJ_NAME = "m6node-day-7-project-url-shortener-application";
  try {
   
  
  // Creating a express server
    let server = express();
    const PORT = process.env.PORT ? process.env.PORT : 3000;
  
  // Connecting to DB

    console.log(process.env.MONGODB_CONNECTION_STRING);
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(()=>{ console.log('Connection Established with Database!');})
    .catch((error)=>{
      throw new Error('Unable to connect to DB');
    });

  // Making a Database Connection
  
  // Middleware for logging errors
    // server.use(morgan('combined'));
  
  // Allowing me to parse req.body
    server.use(express.json());
  
  // Linking Routes
    server.use("/api/v1/user", UserRoutes);
    server.use("/", UrlShortenerRoutes);
    server.use("/api/v1", AuthenticateUser, UrlShortenerRoutes);
  
    
  
  // launching server
    server.listen(PORT, (req, res)=>{
      console.log(`Express Server is up and running at port ${PORT}`);
    });

  } catch (error) {
    console.log('Index.mjs ERROR: ' +  error.message)
  }


