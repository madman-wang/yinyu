import React from 'react';
import { ActivityIndicator, View, AsyncStorage } from 'react-native';
import { _primary } from '../constants/style';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('access_token');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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