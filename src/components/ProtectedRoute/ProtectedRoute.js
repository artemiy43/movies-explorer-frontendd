import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props  }) => {
  console.log('protectedRoute');
  if (props.loggedIn === false)
    return null;
  else
    return (
      <Route>
        {
          () => props.loggedIn ? <Component {...props} /> : <Redirect to="./" />
        }
      </Route>
    );
}

export default ProtectedRoute;
