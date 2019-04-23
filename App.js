import React from 'react';
import {
  createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator,
} from 'react-navigation';
import { Provider } from '@ant-design/react-native';
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
const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading,
  App: TabNavigator,
  Auth: AuthScreen,
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