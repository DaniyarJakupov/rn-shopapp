import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import Navigation from './Navigation';
import client from './graphql';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Navigation />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
