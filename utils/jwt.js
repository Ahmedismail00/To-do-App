import jwt from 'jsonwebtoken';

export function signJwt(payload) {
  return jwt.sign(payload,getJwtSecret(),{
    expiresIn: '15d' 
  });
}

export function verifyJwt(token) {
  return jwt.verify(token,getJwtSecret());
}


function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if(!secret){
    console.error('Missing JWT secret');
    process.exit(1);
  }
  return secret;
}