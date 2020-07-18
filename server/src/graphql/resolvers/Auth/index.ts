import {IResolvers} from 'apollo-server-express';
import {Users} from '../../../database';
import {RegisterInput, LoginInput} from './types';
import {Status, Viewer} from '../../../utils/types';



export const userResolver: IResolvers = {
  Mutation: {
    register: async (
      _root: undefined,
      {input}: RegisterInput
    ): Promise<Status> => {
      try {
        const {email, password} = input;

        const existingUser = await Users.findOne({email});
  
        if (existingUser) {
          throw new Error('Email already in use');
        }

        if (password.length < 5) {
          throw new Error('Password must be more than 5 characters');
        }
  
        const user = new Users({
          email,
          password
        });
  
        await user.save();

        return {
          success: true
        }

      } catch (error) {
        console.error(error.message);
        throw new Error(`Failed to register account: ${error.message}`);
      }
    }
  },
  Query: {
    login: async (
      _root: undefined,
      {input}: LoginInput
    ): Promise<Viewer> => {
      try {
        const {email} = input;

        const existingUser = await Users.findOne({email});

        if (!existingUser) {
          throw new Error('User does not exist.');
        }

        return {
          email: existingUser.email
        } 

      } catch (error) {
        console.log(error.message);
        throw new Error(`failed to login user: ${error.message}`);
      }
    }
  } 
}
