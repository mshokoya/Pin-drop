// eslint-disable-next-line
// @ts-nocheck
import {Users, AccountType} from '../../../../database';
import {userResolver} from '../index';
// import {loginViaPinDrop} from '../auth-helpers';

const user = {
  email: 'mayo_s@hotmail.co.uk',
  password: 'thisisatestpassword',
}


// ========== Mocks ==========
jest.mock('../../../../database/users', () => {
  return {
    __esModule: true,
    Users: {
      build: jest.fn().mockReturnValue({
        save: jest.fn() // <-- inorder to access save in test.. build must be called (Users.build().save)
      }),
      findOne: jest.fn()
    }
  }
});

jest.mock('../auth-helpers', () => {
  return {
    __esModule: true,
    loginViaPinDrop: jest.fn(() => ({
      email: user.email,
      username: user.email.split('@')[0]
    }))
  }
})

// ========== Tests ==========

describe('Auth resolver unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  });
  // ========== Mutations tests ==========
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
        
        await expect(
          userResolver.Mutation.register(undefined, {input: user})
        ).resolves.toEqual({success:true});
        expect(Users.findOne).toHaveBeenCalledTimes(1);
        expect(Users.findOne).toHaveBeenCalledWith({email: user.email})
        expect(Users.build).toHaveBeenCalledTimes(1);
        expect(Users.build).toHaveBeenCalledWith({
          ...user, 
          accountType: AccountType.PinDrop,
          username: user.email.split('@')[0]
        });
        expect(Users.build().save).toBeCalledTimes(1);
      });
    });
  });

  // ========== Queries tests ==========
  describe('Query resolver', () => {
    describe('Login', () => {

      it.todo('should throw error if email is invalid');

      it.todo('it should throw error if username is invalid');


      it('should return username & email when input is correct', async () => {
        await expect(
          userResolver.Query.login(undefined, {input: user}, {res: {}})
        ).resolves.toEqual({email: 'mayo_s@hotmail.co.uk', username: 'mayo_s'})
      });
      
    });
  });

});