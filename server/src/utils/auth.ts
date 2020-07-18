import jwt from 'jsonwebtoken';


interface DataEncode {
  // eslint-disable-next-line
  [key: string]: any
}

export const authEncode = (data: DataEncode): string => {
  return jwt.sign(data, 'fdasads', {
    algorithm: 'RS256',
    expiresIn: 60000
  });
}

// eslint-disable-next-line
export const authDecode = (token: string): string | object => {
  return jwt.verify(
    token, 
    (process.env.JWT_KEY) as jwt.Secret
  );
}