import React, { Component } from 'react';
import { View, Button, Text, TouchableOpacity, Image } from 'react-native';
import { Jiro } from 'react-native-textinput-effects';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ImagePicker from 'react-native-image-picker';

class NewProduct extends Component {
  state = {
    values: {
      name: '',
      price: '',
      pictureUrl: null
    }
  };

  onBtnPress = async () => {};

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
        //let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: `data:image/jpeg;base64,${response.data}` };

        this.setState({
          values: {
            pictureUrl: response.uri,
            source
          }
        });
        console.log(this.state.values);
      }
    });
  };

  render() {
    const {
      values: { name, pictureUrl, price }
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
            onPress={this.onBtnPress}
          />
        </View>
      </View>
    );
  }
}

export default NewProduct;
