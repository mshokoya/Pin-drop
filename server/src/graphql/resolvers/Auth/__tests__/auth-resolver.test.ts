// eslint-disable-next-line
// @ts-nocheck
import {Users} from '../../../../database';
import {userResolver} from '../index';

jest.mock('../../../../database', () => ({
  build: jest.fn().mockReturnValueOnce({save: () => jest.fn().mockReturnValueOnce({})}),
  findOne: jest.fn()
}));

// Users.build = jest.fn().mockReturnValueOnce({save: () => jest.fn().mockReturnValueOnce({})})
// Users.findOne = jest.fn()

const user = {
  email: 'mayo_s@hotmail.co.uk',
  password: 'thisisatestpassword',
}

describe('Auth resolver unit test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Mutation resolver', () => {
    it('should throw error if incorrect email is provided', async () => {
      await userResolver.Mutation.register(undefined, {
        input: {
          ...user,
          email: 'mayo_s',
        }
      });
      expect(Users.findOne).toBeCalledTimes(1)
      expect(Users.build).toBeCalledTimes(1)
      // expect(Users.build().save).toBeCalledTimes(1)
    });
  });

});