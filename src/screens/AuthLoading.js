import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import { TOKEN } from '../utils/constants';
import { addUser } from '../redux/actions'; // redux action

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

        //this.props.navigation.navigate(token ? 'App' : 'Auth');
      } catch (error) {
        console.log(error);
        this.props.navigation.navigate('Auth');
      }
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      // console.log(nextProps.data.me);
      this.props.addUser(nextProps.data.me);
      this.props.navigation.navigate('App');
    } else {
      this.props.addUser({
        user: "User's information wasn't fetch"
      });
      this.props.navigation.navigate('App');
    }
  }

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

const meQuery = gql`
  {
    me {
      name
      id
      email
    }
  }
`;

export default compose(graphql(meQuery), graphql(refreshTokenMutation), connect(null, { addUser }))(
  AuthLoading
);
