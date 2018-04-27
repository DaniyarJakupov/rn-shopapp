import React from 'react';
import { NativeRouter, Route, Link, Switch } from 'react-router-native';

import CheckToken from './CheckToken';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Products from '../screens/Products';
import NewProduct from '../screens/NewProduct';

export default () => {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={CheckToken} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/new-product" component={NewProduct} />
      </Switch>
    </NativeRouter>
  );
};
