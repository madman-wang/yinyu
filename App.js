import React from 'react';
import {
  createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator,
} from 'react-navigation';
import Feed from './src/page/feed';
import Live from './src/page/live';
import User from './src/page/user';
import Auth from './src/auth';
import AuthLoading from './src/auth/loading';
import { tabBarOptions } from './src/constants/style';

const TabNavigator = createMaterialTopTabNavigator({
  feed: {
    screen: Feed,
  },
  Live: {
    screen: Live,
  },
  user: {
    screen: User,
  },
}, {
  initialRouteName: 'Live',
  tabBarOptions,
  swipeEnabled: false,
});
const AuthScreen = createStackNavigator({
  screen: Auth,
});

export default createAppContainer(createSwitchNavigator({
  AuthLoading,
  App: TabNavigator,
  Auth: AuthScreen,
}));