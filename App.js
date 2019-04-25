import React from 'react';
import {
  createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator,
} from 'react-navigation';
import {Provider, Toast} from '@ant-design/react-native';
import { ThemeProvider } from 'react-native-elements';
import Message from './src/page/message';
import Chat from './src/page/chat';
import Feed from './src/page/feed';
import Live from './src/page/live';
import User from './src/page/user';
import Auth from './src/auth';
import AuthLoading from './src/auth/loading';
import { tabBarOptions, elementTheme } from './src/constants/style';
import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const message = error.response.data.message;
  Toast.show(message);
  return Promise.reject(message);
});

const TabNavigator = createMaterialTopTabNavigator({
  Chat: {
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
    initialRouteName: 'Live',
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
  componentWillMount() {
  }
  render() {
    return (
      <Provider>
        <ThemeProvider theme={elementTheme}>
          <AppContainer />
        </ThemeProvider>
      </Provider>
    );
  }
};