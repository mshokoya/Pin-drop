import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { Header } from './components/Header';

import { loginUserQuery } from './lib/graphql';
import { Viewer, QueryLoginArgs, LoginUserQueryQuery } from './lib/graphql/types';

export const App = () => {
  const [viewer, setViewer] = React.useState<Viewer | void>(undefined);
  const [login] = useLazyQuery<LoginUserQueryQuery, QueryLoginArgs>(loginUserQuery, {
    onCompleted: (data) => {
      if (data.login && data.login) {
        setViewer(data.login);
        if (data.login.token) {
          sessionStorage.setItem('token', data.login.token);
        }
      } else {
        sessionStorage.removeItem('token');
      }
    },
  });

  const loginRef = useRef(login);

  useEffect(() => {
    loginRef.current({
      variables: {
        input: {
          email: 'test123@test.com',
          password: 'test123',
        },
      },
    });
  }, []);

  return (
    <Router>
      <Header viewer={viewer} />
    </Router>
  );
};
