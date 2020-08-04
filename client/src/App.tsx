import React, { useRef, useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { AppContext } from './lib/utils/context';
import { ViewerActionTypes } from './lib/utils/reducers';

import { Header } from './components/Header';

import { loginUserQuery } from './lib/graphql';
import { QueryLoginArgs, LoginUserQueryQuery } from './lib/graphql/types';

export const App = () => {
  console.log('app compo render');
  const { viewerDispatch } = useContext(AppContext);
  const [login] = useLazyQuery<LoginUserQueryQuery, QueryLoginArgs>(loginUserQuery, {
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

  const loginRef = useRef(login);

  useEffect(() => {
    console.log('app compo render');
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
      <Header />
    </Router>
  );
};

// import React, { useRef, useEffect, useContext } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { useLazyQuery } from '@apollo/client';
// import { AppContext } from './lib/utils/context';
// import { ViewerActionTypes } from './lib/utils/reducers';

// import { Header } from './components/Header';

// import { loginUserQuery } from './lib/graphql';
// import { Viewer, QueryLoginArgs, LoginUserQueryQuery } from './lib/graphql/types';

// export const App = () => {
//   // const [viewer] = React.useState<Viewer | void>(undefined);
//   const { viewerDispatch } = useContext(AppContext);
//   const [login] = useLazyQuery<LoginUserQueryQuery, QueryLoginArgs>(loginUserQuery, {
//     onCompleted: (data) => {
//       if (data.login && data.login) {
//         viewerDispatch({
//           type: ViewerActionTypes.CREATE_VIEWER,
//           payload: data.login,
//         });
//         // setViewer(data.login);
//         if (data.login.token) {
//           sessionStorage.setItem('token', data.login.token);
//         }
//       } else {
//         sessionStorage.removeItem('token');
//       }
//     },
//   });

//   const loginRef = useRef(login);

//   useEffect(() => {
//     console.log('app compo render');
//     loginRef.current({
//       variables: {
//         input: {
//           email: 'test123@test.com',
//           password: 'test123',
//         },
//       },
//     });
//   }, []);

//   return (
//     <Router>
//       <Header />
//       {/* <Header viewer={viewer} /> */}
//     </Router>
//   );
// };
