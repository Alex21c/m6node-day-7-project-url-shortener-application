import validator from "validator";

export default function inputValidationUrlShortener(req, res, next){
  // is destination url is a valid url?
    const {destinationURL} = req.body;   
    // terminate the req 
      if(!validator.isURL(destinationURL)){
        res.status(409).json({
          sucess: false,
          message: `Invalid URL`
        }); 
        return;
      }

  // allow to proceed
      next();
    
}