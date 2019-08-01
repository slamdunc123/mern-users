import React from 'react';

import { Switch, Route } from 'react-router-dom';

// view components
import Home from '../views/Home';
import Users from '../views/Users';

const Main = () => {
  return (
    <div>
      Main
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/users' component={Users} />
      </Switch>
    </div>
  );
};

export default Main;
