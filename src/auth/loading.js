import React from 'react';
import { ActivityIndicator, View, AsyncStorage } from 'react-native';
import { _primary } from '../constants/style';

const AV = require('leancloud-storage');

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const currentUser = AV.User.currentAsync();
    this.props.navigation.navigate(currentUser ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator color={_primary} />
      </View>
    );
  }
}