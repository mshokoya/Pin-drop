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
  comments?: ICommentDoc['_id'];
  pins?: IPinDoc['_id'];
  accountType: AccountType;
  token?: string;
}

export interface IUserAttrs {
  email: string;
  password: string;
  name?: string;
  username: string;
  avatar?: string;
  comments?: ICommentDoc['_id'];
  pins?: IPinDoc['_id'];
  accountType: AccountType;
  token?: string;
}

export interface IUserModel extends mongoose.Model<IUserDoc> {
  build(atts: IUserAttrs): IUserDoc
}

