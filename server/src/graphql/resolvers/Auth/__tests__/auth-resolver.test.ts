// eslint-disable-next-line
// @ts-nocheck

import {Users, AccountType} from '../../../../database';
import {userResolver} from '../index';

//find a way to test Users.save (Users.build().save())
// build is already mocked; find out how to access jest.fn inside a jest.fn

jest.mock('../../../../database/users');
const save = jest.fn().mockReturnValue({})
Users.build = jest.fn().mockReturnValue({save})
Users.findOne = jest.fn()

const user = {
  email: 'mayo_s@hotmail.co.uk',
  password: 'thisisatestpassword',
}

describe('Auth resolver unit tests', () => {
  let resolver;
  afterEach(() => {
    // jest.clearAllMocks()
  })
  describe('Mutation resolver', () => {
    describe('Register', () => {
    // ========== Failure case ==========

      it('should throw error if password length < 5', async () => {
        await expect(userResolver.Mutation.register(undefined, {
          input: {
            password: 'w', //  <-- Test case 
            email: 'mayo_s@hotmail.co.uk',
          }
        })).rejects.toThrowError("Failed to register account: Password must be more than 5 characters")
        expect(Users.findOne).not.toBeCalled()
        expect(Users.build).not.toBeCalled()
      });
  
      it('should throw error if email is incorrect', 
      async () => {
        await expect(userResolver.Mutation.register(undefined, {
          input: {
            password: 'wwjsdlajdasd',
            email: 'edklmdklamw' //  <-- Test case 
          }
        })).rejects.toThrowError('Failed to register account: Invalid email');
        expect(Users.findOne).not.toBeCalled()
        expect(Users.build).not.toBeCalled()
      }
      );

      it('should fail id Users.findOne mock return a value', async () => {
        Users.findOne = jest.fn(() => user) // DB MOCK MODIFICATION (REMEMBER TO RESET ITS RETURN VALUE)

        await expect(
          userResolver.Mutation.register(undefined, {input: user})
        ).rejects.toThrowError('Failed to register account: Email already in use');
        expect(Users.findOne).toHaveBeenCalledTimes(1);
        expect(Users.findOne).toHaveBeenCalledWith({email: user.email})
        expect(Users.build).not.toBeCalled();

        Users.findOne = jest.fn() // DB MOCK RESET
      });
      
    // ========== Success case ==========

      it('should return {success: true} if all arguments are entered correctly', async () => {
        resolver = await userResolver.Mutation.register(undefined, {
          input: user
        });
        expect(resolver).toEqual({success:true});
        expect(Users.findOne).toHaveBeenCalledTimes(1);
        expect(Users.findOne).toHaveBeenCalledWith({email: user.email})
        expect(Users.build).toHaveBeenCalledTimes(1);
        expect(Users.build).toHaveBeenCalledWith({
          ...user, 
          accountType: AccountType.PinDrop,
          username: user.email.split('@')[0]
        });
      });
    });
  });

  // describe('Query resolver', () => {
  //   describe('Login', () => {
  //     it('should ', () => {

  //     });
  //   })
  // });

});