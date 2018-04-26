import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import Routes from './navigation';
import client from './graphql';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
