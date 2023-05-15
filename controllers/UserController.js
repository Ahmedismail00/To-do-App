import UserModel from '../models/user.js';
import crypto from 'crypto';
import {signJwt} from '../utils/jwt.js'

export const getAll = async (req, res) => {
    try {
        const users = await UserModel.find().populate('todos');
        res.json(users);
    }
     catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existing = await UserModel.findOne({ email }) || await UserModel.findOne({ username })
        if (existing) {
            return res.status(403).send({ error: 'User already exists' })
        }

        const passwordHash = hashPassword(password)
        const doc = new UserModel({
            username: username,
            email: email,
            password: passwordHash,
        });
        await doc.save();

        const jwt = signJwt({userId: doc._id});
        return res.status(200).json({
            jwt
        });
    }
     catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body
    const existing = await UserModel.findOne({ email })
    
    const passwordHash = hashPassword(password)
    
    if (!existing || existing.password != passwordHash){
      return res.status(403).send({error:"User is not existing"})
    }
    
    const jwt = signJwt({userId: existing.id})
    
    return res.json({
      user: {
        email: existing.email,
        username: existing.username,
        id: existing.id
      },
      jwt
    })
  }

function hashPassword(password) {
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, 42, 64, 'sha512').toString('hex')
}