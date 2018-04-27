import React, { Component } from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native';
import { Jiro } from 'react-native-textinput-effects';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { TOKEN } from '../utils/constants';

const defState = {
  values: {
    name: '',
    email: '',
    password: ''
  },
  errors: {},
  isSubmitting: false
};
class Signup extends Component {
  state = defState;

  onBtnPress = async () => {
    try {
      const response = await this.props.mutate({
        variables: this.state.values
      });

      await AsyncStorage.setItem(TOKEN, response.data.signup.token);

      this.props.navigation.navigate('App');
    } catch (error) {
      this.setState({
        errors: {
          email: 'Already taken'
        }
      });
      return;
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
      values: { name, email, password },
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
            label={'name'}
            borderColor={'#9b537a'}
            inputStyle={{ color: 'white' }}
            value={name}
            onChangeText={value => this.onChangeText('name', value)}
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
        <View>
          <Button
            title="Create account"
            color="#841584"
            accessibilityLabel="Signup"
            onPress={this.onBtnPress}
          />
        </View>

        <View>
          <Button
            title="Login"
            color="#841584"
            accessibilityLabel="Signup"
            onPress={() => this.props.navigation.goBack(null)}
          />
        </View>
      </View>
    );
  }
}

const signUpMutation = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export default graphql(signUpMutation)(Signup);
