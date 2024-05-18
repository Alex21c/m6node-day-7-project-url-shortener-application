import mongoose from "mongoose";
const {Schema} = mongoose;
/**
 * 
 * SCHEMA for shortURLS?
 * {
 *  destinationURL : String url where shorted url will point or redirect to
 *  shortedURI : String short url genrated for destination URL 
 *  generatedOnTimeStamp: String unix timestamp containing when this shortedURL was generated
 *  traffic : Number counts the number of traffic this shortedURL received, i.e. each time this shorted url is redirected to destination url resulting in incresae in traffic by plus one
 *  generatedByWhichUser: String ID of the user who have generated this shortedURL by providing destination URL
 * }
 */
const UrlShortenerSchema = new Schema({
  destinationURL : {type: String, required: true},
  shortedURI : {type : String, required: true},
  traffic : {type : Number, required: false, default:0},
  generatedByWhichUser : {type : String, required: false, default: "TestUser"}

});

// Here i'm specifying the my collection name and schema to be followed by all the documents inside it
const UrlShortenerModel = mongoose.model('UrlShortener', UrlShortenerSchema);
export default UrlShortenerModel;