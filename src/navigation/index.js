import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthLoadingScreen from '../screens/AuthLoading';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import ProductsScreen from '../screens/Products';
import NewProductScreen from '../screens/NewProduct';
import ProfileScreen from '../screens/Profile';
import EditProductScreen from '../screens/EditProduct';

import { colors } from '../utils/colors';

const TAB_ICON_SIZE = 20;

const TabsStack = TabNavigator(
  {
    Products: {
      screen: ProductsScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Products',
        tabBarIcon: ({ tintColor }) => <Icon size={TAB_ICON_SIZE} color={tintColor} name="home" />
      })
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon size={TAB_ICON_SIZE} color={tintColor} name="user" />
      })
    }
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5
      }
    }
  }
);

const AppStack = StackNavigator(
  {
    Products: {
      screen: TabsStack
    },
    NewProduct: {
      screen: NewProductScreen
    },
    EditProduct: {
      screen: EditProductScreen
    }
  },
  {
    mode: 'modal',
    cardStyle: {
      backgroundColor: '#F1F6FA'
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.WHITE
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY
      }
    })
  }
);

const AuthStack = StackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);
