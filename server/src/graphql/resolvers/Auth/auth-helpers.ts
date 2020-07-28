import {IloginViaPinDrop} from './types';
import {authEncode} from '../../../utils/auth';
import {IUserDoc} from '../../../database';

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true
}



export const loginViaPinDrop = async ({email, res, token, db}: IloginViaPinDrop): Promise<IUserDoc>  => {
  const user = await db.findOneAndUpdate({email},{token: token}, {new: true});

  if (!user){
    throw new Error('User does not exist')
  }

  const encryptId = authEncode(user.id);

  res.cookie('viewer', encryptId, COOKIE_OPTIONS)

  return user;
}