import jwt from 'jsonwebtoken';
import {IAuthorize, IDataEncode} from './types';
import {IUserDoc} from '../database';

export const authEncode = (data: IDataEncode): string => {

  // {expiresIn: 60000} ---> causes error "invalid expiresIn option for string payload"
  return jwt.sign(
    data, 
    (process.env.JWT_KEY) as jwt.Secret);
}

// eslint-disable-next-line
export const authDecode = (token: string): string | object => {
  return jwt.verify(
    token, 
    (process.env.JWT_KEY) as jwt.Secret
  );
}

export const authorize = async ({db, req}: IAuthorize): Promise<IUserDoc | null> => {
  const token = req.get('X-CSRF-TOKEN');
  const _id = authDecode(req.cookies.viewer);
  const user = await db.findOne({
    _id,
    token
  });

  return user;
}