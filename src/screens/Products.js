import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { iOSColors } from 'react-native-typography';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ProductCard from '../components/ProductCard';

class Products extends Component {
  state = {
    isRefreshing: false
  };

  refreshRequest = async () => {
    this.setState({ isRefreshing: true });
    await this.props.data.refetch();
    this.setState({ isRefreshing: false });
  };

  renderItem = ({ item }) => <ProductCard {...item} />;

  render() {
    const {
      data: { loading, products }
    } = this.props;

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color="red" size="large" />
        </View>
      );
    }

    return (
      <View style={styles.root}>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.refreshRequest} />
          }
        />

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
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: iOSColors.lightGray
  }
});

const productsQuery = gql`
  {
    products {
      name
      pictureUrl
      id
      price
    }
  }
`;

export default graphql(productsQuery)(Products);
