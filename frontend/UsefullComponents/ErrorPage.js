import React from 'react';
import BackButton from './BackButton';

function ErrorPage() {
  return (
    <div className="background-dashboard">
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h3>Page not found</h3>
            <h1>
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
          </div>
          <div className="notfound-404">
            <h3>Click Back to return on Dasboard</h3>
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  );
}

export default ErrorPage;
