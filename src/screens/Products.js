import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { iOSColors } from 'react-native-typography';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Products extends Component {
  state = {
    isRefreshing: false
  };

  refreshRequest = async () => {
    this.setState({ isRefreshing: true });
    await this.props.data.refetch();
    this.setState({ isRefreshing: false });
  };

  renderItem = ({ item }) => <Text {...item}> {item.name} </Text>;

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
    backgroundColor: iOSColors.customGray
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
