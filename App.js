import React from 'react';
import {
  createAppContainer, createMaterialTopTabNavigator,
} from 'react-navigation';
import Feed from './src/page/feed';
import Live from './src/page/live';
import User from './src/page/user';
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

export default createAppContainer(TabNavigator);