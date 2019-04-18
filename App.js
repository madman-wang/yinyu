import React from 'react';
import {
  createAppContainer, createMaterialTopTabNavigator,
} from 'react-navigation';
import Feed from './src/page/feed';
import Live from './src/page/live';
import User from './src/page/user';

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
  tabBarOptions: {
    // 整个tabs的style
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    // 单个tab的style
    tabStyle: {
      width: 60,
    },
    // label的style
    labelStyle: {
      color: '#333',
    },
    // 指示器的style
    indicatorStyle: {
      backgroundColor: '#333',
    }
  },
});

export default createAppContainer(TabNavigator);