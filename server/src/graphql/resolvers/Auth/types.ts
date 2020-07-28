import {IUserModel} from '../../../database';
import {Response} from 'express';

export interface RegisterInput {
  input: {
    email: string;
    password: string;
  }
}

export interface LoginInput {
  input: {
    email: string;
    password: string;
  }
}

export interface IloginViaPinDrop {
  email: string;
  password: string;
  res: Response;
  token: string;
  db: IUserModel;
}