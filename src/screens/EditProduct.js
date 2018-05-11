import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';

import { productsQuery } from './Products';
import ProductForm from '../components/ProductForm';

class EditProduct extends Component {
  onSubmitPress = async values => {
    const { details } = this.props.navigation.state.params;
    const { name, price, pictureUrl } = values;
    let picture = null;
    if (details.pictureUrl !== pictureUrl) {
      picture = new ReactNativeFile({
        uri: pictureUrl,
        type: 'image/jpg',
        name
      });
    }

    try {
      await this.props.mutate({
        variables: { id: details.id, name, price, picture },
        update: (store, { data: { updateProduct } }) => {
          const data = store.readQuery({ query: productsQuery });
          data.products = data.products.map(
            prod => (prod.id === updateProduct.id ? updateProduct : prod)
          );
          store.writeQuery({ query: productsQuery, data });
        }
      });
    } catch (error) {
      console.log('ERROR', error);
      return;
    }

    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <ProductForm
        submit={this.onSubmitPress}
        details={this.props.navigation.state.params.details}
      />
    );
  }
}

const updateProduct = gql`
  mutation($id: ID!, $name: String, $price: Float, $picture: Upload) {
    updateProduct(id: $id, name: $name, price: $price, picture: $picture) {
      name
      pictureUrl
      id
      price
      seller {
        id
      }
    }
  }
`;

export default graphql(updateProduct)(EditProduct);
