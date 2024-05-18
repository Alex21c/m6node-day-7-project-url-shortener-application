import { json } from "express";
import UrlShortenerModel from "../Models/UrlShortener.Model.mjs";
import { nanoid } from "nanoid";

function getServerURL(req){
  return "http://" + req.headers.host;
}

async function doesCustomBackHalfAlreadyExist(UrlShortenerModel, customBackHalf, req){
  const result = await UrlShortenerModel.find({
    shortedURI: customBackHalf
  });
  
  if(result.length ===0 ){
    return false;
  }else{
    return true;
  }
}

async function writeShortedUrlToDB(UrlShortenerModel, jsonData){
  let obj = new UrlShortenerModel(jsonData);
  obj.save();
}

async function incrementTrafficCounterByOne(UrlShortenerModel, documentID, currentTraffic){
  await UrlShortenerModel.findByIdAndUpdate(documentID, {
    traffic: currentTraffic+1
  });
}
const shortUrl = async (req, res)=>{
  // first generate the short url from the destination url
    let {destinationURL, customBackHalf} = req.body;
    const jsonData = {
      destinationURL
    };
    // is customBackHalf Present ?
      if(customBackHalf){
        // customBack Half already exit
          if(await doesCustomBackHalfAlreadyExist(UrlShortenerModel, customBackHalf, req)){
            // then notify client about it
              res.status(409).json({
                sucess: false,
                message: `ERROR: Custom Back Half ${customBackHalf} already exist!`
              }); 
            return;
          }
      }
    // generate the customHalf hash, if does not exist
    // for e.g. http://localhost:4000/a7b83248
    // customBackHalf is : a7b83248
    //      
      if(!customBackHalf){
        customBackHalf = nanoid(9);
      }
    // does it already exist      
      if (await doesCustomBackHalfAlreadyExist(UrlShortenerModel, customBackHalf, req)){
          // then notify client about it
          res.status(500).json({
            sucess: false,
            message: `Internal Server Error, Custom Back Half ${customBackHalf} already exist!`
          }); 
        return;        
      }

    // just write to db
        jsonData.shortedURI = customBackHalf;
        await writeShortedUrlToDB(UrlShortenerModel, jsonData);
        // send response back to client
        res.json({
          success: true,
          shortedURL: getServerURL(req) + "/" + jsonData.shortedURI
        });


}
const redirectUser = async (req, res)=>{
  const {shortedURI} = req.params;
  // find it in db
    let result = await UrlShortenerModel.find({
      shortedURI: shortedURI
    });

  // if it exist then redirect user to destination url   
    if(result.length>0){
      result = result[0];
      // increase the traffic counter        
        incrementTrafficCounterByOne(UrlShortenerModel, result._id.toHexString(), result.traffic);

      res.redirect(result.destinationURL);
      return;
    }

  // otherwise end the reqeust
    res.status(404).json({
      success: false,
      message: `Not Found : Specified URI ${shortedURI}, doesn't exist in our records!`
    })


}

const UrlShortenerController = {
  shortUrl,
  redirectUser
};

export default UrlShortenerController;