import {gql} from 'apollo-server-express';


const registerQuery = gql`
  mutation($input: RegisterInput){
    register(input: $input){
      success
    }
  }
`

const { mutate} = global.ApolloTestServer;
describe('Auth resolver integration test', () => {
  describe('Mutations resolver', () => {
    describe('register', () => {
      it('should return error if email is invalid', async () => {
        const res = await mutate({mutation: registerQuery, variables: {
          input: {
            email: "mayo_shotmail.co.uk", 
            password: "testpassword"}
          }
        });

        const error = res.errors && res.errors[0].message;
  
        expect(error).toEqual('Failed to register account: Invalid email');
      });

      // it('should return ')
    });
  });

  // describe('Query resolver', () => {
  //   describe('login', () => {
      
  //   });
  // })
});