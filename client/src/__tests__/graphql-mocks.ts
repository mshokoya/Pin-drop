import { loginUserQuery } from '../lib/graphql';

export const mocks = [
  {
    request: {
      query: loginUserQuery,
      variables: {
        input: {
          email: 'test123@test.com',
          password: 'test123',
        },
      },
    },
    result: {
      data: {
        login: {
          email: 'test101@email.com', username: 'test101', token: 'testtoken',
        },
      },
    },
  },
];
