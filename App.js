import React from 'react';
import {
  createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator,
} from 'react-navigation';
import { Provider } from '@ant-design/react-native';
import Message from './src/page/message';
import Chat from './src/page/chat';
import Feed from './src/page/feed';
import Live from './src/page/live';
import User from './src/page/user';
import Auth from './src/auth';
import AuthLoading from './src/auth/loading';
import { tabBarOptions } from './src/constants/style';

var net = require('net');

const TabNavigator = createMaterialTopTabNavigator({
  Chat: {//不知道怎么跳转
    screen: Chat,
  },
  Message: {
    screen: Message,
  },
  Live: {
    screen: Live,
  },
  feed: {
    screen: Feed,
  },

  user: {
    screen: User,
  },
}, {
    initialRouteName: 'Chat',
    tabBarOptions,
    swipeEnabled: false,
  });
const AuthScreen = createStackNavigator({
  screen: Auth,
});
const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading,
  App: TabNavigator,
  Auth: AuthScreen,
  Chat: Chat
}))

export default class Main extends React.Component {
  render() {
    return (
      <Provider>
        <AppContainer />
      </Provider>
    );
  }
};