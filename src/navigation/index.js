import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Products from '../screens/Products';

export default () => {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Login} />
        <Route exact path="/products" component={Products} />
      </Switch>
    </NativeRouter>
  );
};
