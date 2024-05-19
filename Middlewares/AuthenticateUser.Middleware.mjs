import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function AuthenticateUser(req, res, next){
  let authToken = req.headers['auth-token'];
  // if token is not provided tell me they need to authenticate
    if(!authToken){
      res.status(401).json({
        success: false,
        message: "Invalid email or password !"
      });        
      return;
    }

  // is auth token in-valid? tell me to sign in once again
  try {
    const payload = jwt.verify(authToken, process.env.PRIVATE_KEY);
  // append id to req body
    req.body.userID = payload._id;  

  } catch (error) {
    console.log(error.message)
    res.status(401).json({
      success: false,
      message: "Invalid email or password !"
    });        
    return;    
  }

  // allow user to proceed
    next();
}