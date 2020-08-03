import { gql } from '@apollo/client';

export const loginUserQuery = gql`
  query loginUserQuery($input: LoginInput) {
    login(input: $input) {
      email
      username
      token
    }
  }
`;
