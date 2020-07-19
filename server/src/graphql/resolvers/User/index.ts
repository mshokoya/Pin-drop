import {IResolvers} from 'apollo-server-express';
import {Request} from 'express';
import {Users} from '../../../database';
import {authorize} from '../../../utils/auth';
import {Viewer} from '../../../utils/types'

export const userResolver: IResolvers = {
  Query: {
    getUser: async (
      _root: undefined, 
      // Record<string, unknown>
      // eslint-disable-next-line @typescript-eslint/ban-types
      _input: {},
      {req}: {req: Request} 
    ): Promise<Viewer> => {
      try {
        const isAuth = await authorize({db: Users, req});

        if (!isAuth){
          throw new Error('Unauthorized access')
        }

        return isAuth;
        
      } catch (error) {
        console.log(error);
        throw new Error(`Failed to get user: ${error.message}`)
      }
    }
  }
}