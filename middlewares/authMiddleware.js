import {verifyJwt} from '../utils/jwt.js'
import UserModel from '../models/user.js';


export default async (req,res,next)=> {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token){
    return res.sendStatus(401);
  }
  
  try {
    const payload = verifyJwt(token) 
    const user = await UserModel.findById(payload.userId)
    if(!user){
      return res.sendStatus(401);
    }
    res.locals.userId = user.id;
    next()
    
  } catch (error) {
    return res.status(401).send({error: "bad token"})
  }
}

