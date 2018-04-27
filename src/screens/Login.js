import React, { Component } from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native';
import { Jiro } from 'react-native-textinput-effects';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { TOKEN } from '../utils/constants';

const defState = {
  values: {
    email: '',
    password: ''
  },
  errors: {},
  isSubmitting: false
};

class Login extends Component {
  state = defState;

  onBtnPress = async () => {
    const response = await this.props.mutate({
      variables: this.state.values
    });

    const { payload, error } = response.data.login;

    if (payload) {
      await AsyncStorage.setItem(TOKEN, payload.token);

      this.props.navigation.navigate('App');
    } else {
      this.setState({
        errors: {
          [error.field]: error.msg
        }
      });
    }
  };

  onChangeText = (key, value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [key]: value
      }
    }));
  };

  render() {
    const {
      values: { email, password },
      errors
    } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', marginBottom: 15 }}>
          <Jiro
            label={'email'}
            borderColor={'#9b537a'}
            inputStyle={{ color: 'white' }}
            value={email}
            onChangeText={value => this.onChangeText('email', value)}
            autoCapitalize={'none'}
          />

          <Jiro
            label={'password'}
            borderColor={'#9b537a'}
            inputStyle={{ color: 'white' }}
            value={password}
            onChangeText={value => this.onChangeText('password', value)}
            secureTextEntry
            autoCapitalize={'none'}
          />
        </View>
        {errors.email && <Text style={{ color: 'crimson' }}>{errors.email}</Text>}
        {errors.password && <Text style={{ color: 'crimson' }}>{errors.password}</Text>}
        <View>
          <Button
            title="Login"
            color="#841584"
            accessibilityLabel="Login"
            onPress={this.onBtnPress}
          />
        </View>
        <View>
          <Button
            title="Create account"
            color="#841584"
            accessibilityLabel="Signup"
            onPress={() => this.props.navigation.navigate('Signup')}
          />
        </View>
      </View>
    );
  }
}

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload {
        token
      }
      error {
        field
        msg
      }
    }
  }
`;

export default graphql(loginMutation)(Login);
