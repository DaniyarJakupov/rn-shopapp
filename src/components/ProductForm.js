import React, { Component } from 'react';
import { View, Button, Text, TouchableOpacity, Image } from 'react-native';
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
        }
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

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', marginBottom: 15 }}>
          <Jiro
            label={'name'}
            borderColor={'#9b537a'}
            inputStyle={{ color: 'white' }}
            value={name}
            onChangeText={value => this.onChangeText('name', value)}
            autoCapitalize={'none'}
          />

          <Jiro
            label={'price'}
            borderColor={'#9b537a'}
            inputStyle={{ color: 'white' }}
            value={price}
            keyboardType="numeric"
            onChangeText={value => this.onChangeText('price', value)}
            autoCapitalize={'none'}
          />

          <View style={{ alignSelf: 'center', margin: 20 }}>
            {pictureUrl && (
              <Image source={{ uri: pictureUrl }} style={{ width: 200, height: 200 }} />
            )}
          </View>

          <TouchableOpacity onPress={this.selectPhotoTapped}>
            <View
              style={{
                padding: 20,
                margin: 20,
                backgroundColor: 'salmon',
                width: '50%',
                borderRadius: 5,
                alignSelf: 'center'
              }}
            >
              <Text style={{ textAlign: 'center', color: '#fff' }}>Select a Photo</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Button
            title="Add Product"
            color="#841584"
            accessibilityLabel="Add Product"
            onPress={this.onSubmitPress}
            disabled={!isReady}
          />
        </View>
      </View>
    );
  }
}

export default ProductForm;
