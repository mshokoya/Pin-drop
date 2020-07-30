import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/pin-logo.png';
import { Props } from './types';

export const Header = ({ viewer }: Props): JSX.Element => (
  <div className="header">
    <div className="header__logo-wrapper">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Pin Drop logo" />
      </Link>
    </div>

    <div className="header__menu">
      <div className="header__menu-item">
        {viewer
          ? (<Link to="/profile">Profile</Link>)
          : (<Link to="/login">Login</Link>)}
      </div>
      <div className="header__menu-item">
        {viewer
          ? (<Link to="/logout">Logout</Link>)
          : (<Link to="/register">Register</Link>)}
      </div>
    </div>
  </div>
);
