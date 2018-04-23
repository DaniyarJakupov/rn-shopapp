import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { AsyncStorage } from 'react-native';
import { TOKEN } from '../utils/constants';

const uploadLink = createUploadLink({ uri: 'http://localhost:4000/' });
//const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });
const cache = new InMemoryCache();

let token;
const getToken = async () => {
  if (token != null) {
    return token;
  }
  token = await AsyncStorage.getItem(TOKEN);
  return token;
};
const authLink = setContext(async (_, { headers }) => {
  await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    // remove cached token on 401 from the server
  }
});
const authFlowLink = authLink.concat(resetToken);
const link = authFlowLink.concat(uploadLink);

const client = new ApolloClient({
  link: from([link]),
  cache
});

export default client;
