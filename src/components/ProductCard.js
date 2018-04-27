import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProductCard = ({ name, pictureUrl, price }) => (
  <View style={styles.root}>
    <View style={styles.sellerWrapper}>
      <Text style={styles.seller}>Seller</Text>
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

const styles = StyleSheet.create({
  root: {
    width,
    height: height * 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  sellerWrapper: {
    flex: 0.1,
    marginLeft: 10,
    justifyContent: 'center'
  },
  seller: {
    fontWeight: 'bold',
    fontSize: 16
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
export default ProductCard;
