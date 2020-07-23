import {Users} from '../../../../database';
import {userResolver} from '../index';

jest.mock('../../../../database');

Users.build = jest.fn().mockReturnValueOnce({save: () => jest.fn().mockReturnValueOnce({})})
Users.findOne = jest.fn()

const user = {
  email: 'mayo_s@hotmail.co.uk',
  password: 'thisisatestpassword',
}

describe('Auth resolver unit test', () => {
  let resolver;
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Mutation resolver (register)', () => {
    it('should throw error if password length < 5', async () => {
      // eslint-disable-next-line
      // @ts-ignore
      await expect(userResolver.Mutation.register(undefined, {
        input: {
          password: 'w', //  <-- Test case 
          email: 'mayo_s@hotmail.co.uk',
        }
      })).rejects.toThrowError("Failed to register account: Password must be more than 5 characters")
      expect(Users.findOne).not.toBeCalled()
      expect(Users.build).not.toBeCalled()
    });

    it.skip('should throw error if email is incorrect', async () => {
      // eslint-disable-next-line
      // @ts-ignore
      await expect(userResolver.Mutation.register(undefined, {
        input: {
          password: 'wwjsdlajdasd',
          email: 'edklmdklamw' //  <-- Test case 
        }
      })).rejects.toThrowError('') //  <-- input error message 
      expect(Users.findOne).not.toBeCalled()
      expect(Users.build).not.toBeCalled()
    });

    it('should return {success: true} if all arguments are entered correctly', async () => {
      // eslint-disable-next-line
      // @ts-ignore
      resolver = await userResolver.Mutation.register(undefined, {
        input: user
      });
      expect(resolver).toEqual({success:true});
      expect(Users.findOne).toHaveBeenCalledTimes(1);
      expect(Users.findOne).toHaveBeenCalledTimes(1);

    })

  });

});