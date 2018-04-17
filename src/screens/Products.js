import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { iOSColors } from 'react-native-typography';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class Products extends Component {
  state = {};
  render() {
    return (
      <View style={styles.root}>
        <Text>Products</Text>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Product"
            onPress={() => this.props.history.push('/new-product')}
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: iOSColors.customGray,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default Products;
