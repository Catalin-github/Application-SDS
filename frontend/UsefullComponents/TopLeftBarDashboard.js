import React from 'react';
import LogoutButton from './LogoutButton';

function TopLeftBarDashboard(props) {
  return (
    <div className="TopLeftBar">
      <p className="userNameTopLeftBar">{props.userData.data.firstName}</p>
      <LogoutButton />
    </div>
  );
}

export default TopLeftBarDashboard;
