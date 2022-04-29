import React from 'react';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

function TopLeftBar(props) {
  return (
    <div className="TopLeftBar">
      <p className="userNameTopLeftBar">{props.userData.data.firstName}</p>
      <LogoutButton />
      <Link to="/" className="returnButtonTopLeftBar btn btn-4 btn-4b icon-arrow-left">
        Back
      </Link>
    </div>
  );
}

export default TopLeftBar;
