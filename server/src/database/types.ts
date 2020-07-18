import mongoose from 'mongoose';

export enum AccountType {
  Google = 'GOOGLE',
  PinDrop = 'PINDROP'
}

export type IPinDoc = mongoose.Document

export type ICommentDoc = mongoose.Document

export interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
  name?: string;
  username: string;
  avatar?: string;
  salt: string;
  comments?: ICommentDoc['_id'];
  pins?: IPinDoc['_id'];
  accountType: AccountType;
  token?: string;
}



