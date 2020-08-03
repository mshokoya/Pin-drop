import { gql } from '@apollo/client';

export const registerUserMutation = gql`
  mutation createUserMutation($input: RegisterInput) {
    register(input: $input) {
      success
    }
  }
`;
