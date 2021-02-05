import React from 'react';
// import logo from './assets/pin-logo.png';
// import { AppContext } from '../../../../lib/utils/context';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { faSearch, faHeart, faBars } from '@fortawesome/free-solid-svg-icons'

export const Header = (): JSX.Element => {
  // const { viewerState } = useContext(AppContext);

  return (
    <div className="header" data-testid="header">
      {/* <div className="header__logo-wrapper">
          <img className="header__logo" src={logo} alt="Pin Drop logo" />
      </div> */}
      
      <div className='header__search-wrapper'>
        <div className='header__search'/>
      </div>

      {/* <div className='header__menu'>
        <div className='header__menu--search-icon'>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className='header__menu--fav-icon'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className='header__menu--burger-icon'>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div> */}


        {/* <div className="header__menu-item" data-testid="header__menu-item">
          {viewerState
            ? (<Link to="/profile">Profile</Link>)
            : (<Link to="/login">Login</Link>)}
        </div>
        <div className="header__menu-item" data-testid="header__menu-item">
          {viewerState
            ? (<Link to="/logout">Logout</Link>)
            : (<Link to="/register">Register</Link>)}
        </div> */}

    </div>
  );
};
