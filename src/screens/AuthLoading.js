import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { TOKEN } from '../utils/constants';

class AuthLoading extends Component {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem(TOKEN);

    if (token) {
      try {
        const response = await this.props.mutate({
          variables: {
            token
          }
        });
        await AsyncStorage.setItem(TOKEN, response.data.refreshToken);

        this.props.navigation.navigate(token ? 'App' : 'Auth');
      } catch (error) {
        console.log(error);
        this.props.navigation.navigate('Auth');
      }
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="lightblue" size="large" />
      </View>
    );
  }
}

const refreshTokenMutation = gql`
  mutation($token: String!) {
    refreshToken(token: $token)
  }
`;

export default graphql(refreshTokenMutation)(AuthLoading);
