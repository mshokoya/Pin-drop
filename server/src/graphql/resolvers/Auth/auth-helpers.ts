import {IloginViaPinDrop} from './types';
import {authEncode} from '../../../utils/auth';
import {compare} from '../../../utils/hash';
import {IUserDoc} from '../../../database';

const INVALID_USER_MESSAGE = 'Email or password is incorrect. Please try again'

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true
}



export const loginViaPinDrop = async ({email, password, res, token, db}: IloginViaPinDrop): Promise<IUserDoc>  => {
  const user = await db.findOneAndUpdate({email},{token: token}, {new: true});

  if (!user){
    throw new Error(INVALID_USER_MESSAGE)
  }

  const isPassword = await compare(user.password, password);

  if(!isPassword){
    throw new Error(INVALID_USER_MESSAGE)
  }

  const encryptId = authEncode(user.id);

  res.cookie('viewer', encryptId, COOKIE_OPTIONS)

  return user;
}