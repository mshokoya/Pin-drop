import {gql} from 'apollo-server-express';
import {responseMock} from '../../../../test/apollo-server-setup';

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

const loginQuery = gql`
  query($input: LoginInput){
    login(input: $input){
      email
      username
      token
    }
  }
`

const {query, mutate} = global.ApolloTestServer;

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
        const data = res.data?.register;
  
        expect(error).toEqual('Failed to register account: Invalid email');
        expect(data).toBeUndefined();
      });

      it('should return return {success: true} if valid params are provided', async () => {
        const res = await mutate({mutation: registerQuery, variables: {
          input: user
        }});

        const data = res.data?.register;
        const error = res.errors && res.errors[0].message;

        expect(data).toEqual({success: true});
        expect(error).toBeUndefined();

      });
    });
  });

  describe('Query resolver', () => {
    beforeEach(async () => {
      await mutate({mutation: registerQuery, variables: {input: user}});
    })
    describe('login', () => {
      it('should return error if email is invalid', async () => {
        const res = await query({query: loginQuery, variables: {
          input: {
            email: "mayo_shotmail.co.uk", 
            password: "testpassword"}
          }
        });

        const error = res.errors && res.errors[0].message;
        const data = res.data?.register;
  
        expect(error).toEqual('Failed to login: Invalid email');
        expect(data).toBeUndefined();
        expect(responseMock.cookie).not.toBeCalled()
      });

      it('should throw error is email is not found if email is not is database', async () => {
        const res = await query({query: loginQuery, variables: {
          input: {
            email: 'fakeValidEmail@outlook.com',
            password: 'fakepassword1010'
          }
        }});

        const data = res.data?.login;
        const error = res.errors && res.errors[0].message;

        expect(data).toBeUndefined()
        expect(error).toEqual('Failed to login: Email or password is incorrect. Please try again');
        expect(responseMock.cookie).not.toBeCalled()
      });

      it('should throw error is password is incorrect', async () => {
        const res = await query({query: loginQuery, variables: {
          input: {
            email: user.email,
            password: 'incorrectPassoword2020'
          }
        }});

        const data = res.data?.login;
        const error = res.errors && res.errors[0].message;

        expect(data).toBeUndefined()
        expect(error).toEqual('Failed to login: Email or password is incorrect. Please try again');
        expect(responseMock.cookie).not.toBeCalled()
      });

      it('should return user login details if login input is valid', async () => {
        const res = await query({query: loginQuery, variables: {
          input: user
        }});

        const data = res.data?.login;
        const error = res.errors && res.errors[0].message;

        expect(error).toBeUndefined();
        expect(data).toEqual(
          expect.objectContaining({
            email: 'mayo_s@hotmail.co.uk', 
            username: user.email.split('@')[0]
          })
        ); // <-- replace with expect({}).toMatchObject({})
        expect(data).toHaveProperty('token');
        expect(data.token).not.toBeUndefined();
        expect(responseMock.cookie).toBeCalledTimes(1);
      })
    });
  })
});