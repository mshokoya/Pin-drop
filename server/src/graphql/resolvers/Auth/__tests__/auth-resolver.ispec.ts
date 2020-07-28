import {gql} from 'apollo-server-express';

const user = {
  email: 'mayo_s@hotmail.co.uk',
  password: 'testpassword'
}


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

        const error = res.errors && res.errors[0].message
        const data = res.data
  
        expect(error).toEqual('Failed to register account: Invalid email');
        expect(res.data).toBeNull();
      });

      it('should return return {success: true} if valid params are provided', async () => {
        const res = await mutate({mutation: registerQuery, variables: {
          input: user
        }});

        const data = res.data?.register;
        const error = res.errors && res.errors[0].message

        expect(data).toEqual({success: true});
        expect(error).toBeUndefined();

      });
    });
  });
});