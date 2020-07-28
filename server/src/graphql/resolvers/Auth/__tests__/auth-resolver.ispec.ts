import {gql} from 'apollo-server-express';


const invalidEmailQuery = gql`
  mutation($input: RegisterInput){
    register(input: $input){
      success
    }
  }
`


const {query, mutate} = global.ApolloTestServer;
describe('Auth resolver integration test', () => {
  describe('Mutations resolver', () => {
    describe('register', () => {
      it('should return error if email is invalid', async () => {
        const res = await mutate({mutation: invalidEmailQuery, variables: {
          input: {
            email: "mayo_shotmail.co.uk", 
            password: "testpassword"}
          }
        });

        const error = res.errors && res.errors[0].message;
  
        expect(error).toEqual('Failed to register account: Invalid email');
      });
    });
  });

  describe('Query resolver')
});