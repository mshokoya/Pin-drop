import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { loginUserQuery } from '../../graphql';
import { QueryLoginArgs, LoginUserQueryQuery } from '../../graphql/types';

import { AppContext } from '../context';
import { ViewerActionTypes } from '../reducers';

export const useUserFetch = () => {
  const { viewerDispatch } = useContext(AppContext);

  useQuery<LoginUserQueryQuery, QueryLoginArgs>(loginUserQuery, {
    variables: {
      input: {
        email: 'test123@test.com',
        password: 'test123',
      },
    },
    onCompleted: (data) => {
      if (data.login && data.login) {
        viewerDispatch({
          type: ViewerActionTypes.CREATE_VIEWER,
          payload: data.login,
        });
        if (data.login.token) {
          sessionStorage.setItem('token', data.login.token);
        }
      } else {
        sessionStorage.removeItem('token');
      }
    },
  });
};
