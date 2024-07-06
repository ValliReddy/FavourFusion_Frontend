// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ token }) => {
  return (
    <header id="header">
      <div className="inner">
        <Link to="/" className="logo">
          <span className="symbol"><img src="/images/logo.png" alt="" /></span>
          <span className="title">FlavourFusion</span>
        </Link>
        <nav>
          <ul>
            {!token && <li><Link to="/signup">Sign up</Link></li>}
            {!token && <li><Link to="/login">Login</Link></li>}
            <li><Link to="/meal-planner">Meal Plan</Link></li>
            {/* {token && <li><Link to="/editprofile">Edit Profile</Link></li>} */}
            {token && <li><Link to="/myprofile">My Profile</Link></li>}
            
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
