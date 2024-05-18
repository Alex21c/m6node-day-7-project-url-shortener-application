import UserModel from '../Models/User.Model.mjs'
import bcrypt from "bcrypt";


async function isUserAlreadyExistInDB(UserModel, email){
  const result = await UserModel.find({
    email: email
  });
  // console.log(result);
  if(result.length==0){
    return false;
  }
  // default is
    return true;
}

async function generateHashedPassword(password){
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const signUpUser= async (req, res)=>{
  try {
    // Testing      
    // Safeguard does user already exist in DB?
      if(await isUserAlreadyExistInDB(UserModel, req.body.email)){
        // termniate
        res.status(409).json({
          success: false,
          message: "User already exist !"
        });
        return;      
      }

    req.body.accountCreatedOn = new Date();
    // encrypting the password
      req.body.password  = await generateHashedPassword(req.body.password);
      
    // storing into DB
      const objUserModel = new UserModel(req.body);
      await objUserModel.save();
    
    res.json({
      success: true,
      message: "User Account created successfully !"
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message : "Failure to add new user, internal sever error!"
    })
  }
  // console.log( req.body)

}
const signInUser= async(req, res)=>{  
  res.send(`request received : user sign-in`);

}


const UserController = {
  UserModel,
  signUpUser,
  signInUser
};
export default UserController;


