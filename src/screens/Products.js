import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  AsyncStorage
} from 'react-native';
import { iOSColors } from 'react-native-typography';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import gql from 'graphql-tag';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import ProductCard from '../components/ProductCard';
import { TOKEN } from '../utils/constants';
import { addUser } from '../redux/actions'; // redux action

class Products extends Component {
  state = {
    isRefreshing: false
  };

  async componentDidMount() {
    const {
      data: { me }
    } = await this.props.client.query({ query: meQuery });

    this.props.addUser(me);
  }

  logout = async () => {
    await AsyncStorage.removeItem(TOKEN);
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
            <Icon name="md-create" style={styles.actionButtonIcon} size={22} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" title="Logout" onPress={this.logout}>
            <Icon name="ios-log-out" style={styles.actionButtonIcon} size={22} />
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

export const productsQuery = gql`
  {
    products {
      name
      pictureUrl
      id
      price
    }
  }
`;

const meQuery = gql`
  {
    me {
      name
      id
      email
    }
  }
`;

export default withApollo(compose(graphql(productsQuery), connect(null, { addUser }))(Products));
