import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';

import { productsQuery } from './Products';
import ProductForm from '../components/ProductForm';

class NewProduct extends Component {
  onSubmitPress = async values => {
    const { name, price, pictureUrl } = values;
    const picture = new ReactNativeFile({
      uri: pictureUrl,
      type: 'image/jpg',
      name
    });

    try {
      await this.props.mutate({
        variables: { name, price, picture },
        update: (store, { data: { createProduct } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: productsQuery });
          // Add our product from the mutation to the end.
          data.products.push(createProduct);
          // Write our data back to the cache.
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
    return <ProductForm submit={this.onSubmitPress} />;
  }
}

const createProduct = gql`
  mutation($name: String!, $price: Float!, $picture: Upload!) {
    createProduct(name: $name, price: $price, picture: $picture) {
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

export default graphql(createProduct)(NewProduct);
