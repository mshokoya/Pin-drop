import {Response} from 'express';
import {IResolvers} from 'apollo-server-express';
import {Users, AccountType} from '../../../database';
import {RegisterInput, LoginInput} from './types';
import {Status, Viewer} from '../../../utils/types';
import {validateEmail} from '../../../utils/validate';
import {randomBytes} from 'crypto';
import {loginViaPinDrop} from './auth-helpers';



export const userResolver: IResolvers = {
  Mutation: {
    register: async (
      _root: undefined,
      {input}: RegisterInput
    ): Promise<Status> => {
      try {
        const {email, password} = input;

        if (password.length < 5) {
          throw new Error('Password must be more than 5 characters');
        }

        const isValidEmail = validateEmail(email);

        if (!isValidEmail){
          throw new Error('Invalid email');
        }

        const existingUser = await Users.findOne({email});
  
        if (existingUser) {
          throw new Error('Email already in use');
        }

        // upon registration use username will be first part of email
        const username = email.split('@')[0];
  
        const user = Users.build({
          email,
          password,
          accountType: AccountType.PinDrop,
          username
        });
  
        await user.save();

        return {
          success: true
        }

      } catch (error) {
        throw new Error(`Failed to register account: ${error.message}`);
      }
    }
  },
  Query: {
    login: async (
      _root: undefined,
      {input}: LoginInput,
      {res}: {res: Response}
    ): Promise<Viewer> => {
      try {
        const {email} = input;

        const isValidEmail = validateEmail(email);
        if (!isValidEmail){
          throw new Error('Invalid email');
        }

        const token = randomBytes(16).toString('hex');
        
        const user = await loginViaPinDrop({email, res, db:Users, token})

        return {
          email: user.email,
          username: user.username
        } 

      } catch (error) {
        throw new Error(`Failed to login: ${error.message}`);
      }
    }
  } 
}
