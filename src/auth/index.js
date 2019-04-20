import React from 'react';
import { View, AsyncStorage, Fetch } from 'react-native';
import { Toast } from '@ant-design/react-native';
import { Input, Button } from 'react-native-elements';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };

  onChange = (e) => {
  }

  login = () => {
    fetch('url', {
      method: 'POST',
      body: JSON.stringify({
        username: 'xx',
        password: 'xx',
        code: '311',
      }),
    }).then((e) => {
      AsyncStorage.setItem('userToken', e);
    }).catch((e) => {
      Toast.show(JSON.stringify(e));
    });
  }

  render() {
    return (
      <View>
        <Input
          placeholder='手机号'
          onChange={this.onChange}
        />
        <Input
          placeholder='密码'
          onChange={this.onChange}
        />
        <Input
          placeholder='验证码'
          onChange={this.onChange}
        />
        <Button
          title="登录"
          onPress={this.login}
        />
      </View>
    );
  }
}