import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { productsQuery } from '../screens/Products';

const { width, height } = Dimensions.get('window');

const ProductCard = ({ name, pictureUrl, price, seller, user, id, mutate, navigation }) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.seller}>{seller.name}</Text>
        {seller.id === user.id && (
          <View style={styles.headerIcons}>
            <Icon
              name="md-create"
              size={20}
              onPress={() =>
                navigation.navigate('EditProduct', { details: { name, price, id, pictureUrl } })
              }
            />
            <Icon
              name="md-trash"
              size={20}
              onPress={() => {
                return mutate({
                  variables: { id },
                  update: store => {
                    const data = store.readQuery({ query: productsQuery });
                    data.products = data.products.filter(prod => prod.id !== id);
                    store.writeQuery({ query: productsQuery, data });
                  }
                });
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: `http://localhost:4000/${pictureUrl}` }} style={styles.image} />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.name}>{name.toUpperCase()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    height: height * 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  header: {
    flex: 0.1,
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  seller: {
    fontWeight: 'bold',
    fontSize: 16
  },
  headerIcons: {
    flexDirection: 'row',
    width: 60,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  imageWrapper: {
    flex: 0.75
  },
  image: {
    flex: 1
  },
  textWrapper: {
    flex: 0.15,
    marginLeft: 10,
    marginTop: 5
  },
  name: {
    fontWeight: 'bold'
  },
  price: {
    marginBottom: 5
  }
});

const mapStateToProps = state => ({
  user: state.user
});

const deleteProductMutation = gql`
  mutation($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
    }
  }
`;

export default compose(graphql(deleteProductMutation), connect(mapStateToProps))(ProductCard);
