import {IUserModel} from '../database';
import {Request} from 'express';

export interface Viewer {
  email: string;
  username: string;
}


export interface Status {
  success: boolean;
}

export interface IAuthorize {
  db: IUserModel;
  req: Request;
}

export interface IDataEncode {
  // eslint-disable-next-line
  [key: string]: any
}