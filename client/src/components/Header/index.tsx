import React, { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/pin-logo.png';
import { AppContext } from '../../lib/utils/context';

export const Header = memo((): JSX.Element => {
  const { viewerState } = useContext(AppContext);

  console.log('head');

  return (
    <div className="header">
      <div className="header__logo-wrapper">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Pin Drop logo" />
        </Link>
      </div>

      <div className="header__menu">
        <div className="header__menu-item" data-testid="header__menu-item">
          {viewerState
            ? (<Link to="/profile">Profile</Link>)
            : (<Link to="/login">Login</Link>)}
        </div>
        <div className="header__menu-item" data-testid="header__menu-item">
          {viewerState
            ? (<Link to="/logout">Logout</Link>)
            : (<Link to="/register">Register</Link>)}
        </div>
      </div>
    </div>
  );
});

// useState
// export const Header = ({ viewer }: Props): JSX.Element => (
//   <div className="header">
//     <div className="header__logo-wrapper">
//       <Link to="/">
//         <img className="header__logo" src={logo} alt="Pin Drop logo" />
//       </Link>
//     </div>

//     <div className="header__menu">
//       <div className="header__menu-item" data-testid="header__menu-item">
//         {viewer
//           ? (<Link to="/profile">Profile</Link>)
//           : (<Link to="/login">Login</Link>)}
//       </div>
//       <div className="header__menu-item" data-testid="header__menu-item">
//         {viewer
//           ? (<Link to="/logout">Logout</Link>)
//           : (<Link to="/register">Register</Link>)}
//       </div>
//     </div>
//   </div>
// );
