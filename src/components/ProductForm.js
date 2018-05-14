import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { Jiro } from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-picker';

class ProductForm extends Component {
  state = {
    values: {
      name: '',
      price: '',
      pictureUrl: null
    },
    isReady: false
  };

  componentDidMount() {
    if (this.props.details) {
      const { name, price, pictureUrl } = this.props.details;
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          name,
          price: price.toString(),
          pictureUrl: `http://localhost:4000/${pictureUrl}`
        },
        isReady: true
      }));
    }
  }

  onSubmitPress = () => {
    this.props.submit(this.state.values);
  };

  onChangeText = (key, value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [key]: value
      }
    }));
  };

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          values: {
            ...this.state.values,
            pictureUrl: response.uri
          },
          isReady: true
        });
      }
    });
  };

  render() {
    const {
      values: { name, pictureUrl, price },
      isReady
    } = this.state;
    let disabledBtn = {};
    !isReady ? (disabledBtn = { backgroundColor: 'lightgrey', shadowColor: 'grey' }) : {};

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.root}>
          <View style={styles.formWrapper}>
            <View style={styles.pictureWrapper}>
              {pictureUrl ? (
                <TouchableOpacity onPress={this.selectPhotoTapped}>
                  <Image source={{ uri: pictureUrl }} style={styles.pic} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.selectPhotoTapped} style={styles.placeholder}>
                  <Text>Select a Photo</Text>
                </TouchableOpacity>
              )}
            </View>
            <KeyboardAvoidingView behavior="padding" enabled>
              <View style={styles.inputsWrapper}>
                <View style={styles.input}>
                  <Jiro
                    label={'name'}
                    borderColor={'#9b537a'}
                    inputStyle={{ color: 'white' }}
                    value={name}
                    onChangeText={value => this.onChangeText('name', value)}
                    autoCapitalize={'none'}
                  />
                </View>
                <View style={styles.input}>
                  <Jiro
                    label={'price'}
                    borderColor={'#9b537a'}
                    inputStyle={{ color: 'white' }}
                    value={price}
                    keyboardType="numeric"
                    onChangeText={value => this.onChangeText('price', value)}
                    autoCapitalize={'none'}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>

          <TouchableOpacity
            onPress={this.onSubmitPress}
            disabled={!isReady}
            style={[styles.submitBtn, disabledBtn]}
          >
            <Text style={{ textAlign: 'center', color: '#fff' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around'
  },
  formWrapper: {},
  submitWrapper: {},
  inputsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%'
  },
  pictureWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pic: {
    width: 250,
    height: 250,
    borderRadius: 25
  },
  placeholder: {
    width: 250,
    height: 250,
    borderRadius: 25,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '100%'
  },
  submitBtn: {
    padding: 20,
    margin: 20,
    backgroundColor: 'salmon',
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1
  }
});

export default ProductForm;
