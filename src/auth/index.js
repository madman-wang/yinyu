import React from 'react';
import { View, AsyncStorage, Fetch } from 'react-native';
import { Toast } from '@ant-design/react-native';
import { Input, Button } from 'react-native-elements';
import qs from 'qs'

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };

  onChange = (e) => {
  }

  login = () => {//这个登陆接口偷点特殊，我也不知道为啥要这么写
    fetch('http://172.254.224.125:9999/auth/oauth/token?username=test5&password=rKu1%2F348LvKp0rsVC06eCA%3D%3D&code=m4dg&grant_type=password', {
      method: 'POST',
      headers: {
        Authorization: 'Basic dGVzdDp0ZXN0',
        system_code: '1001',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: qs.stringify({
      //   username: 'test5',
      //   password: 'rKu1%2F348LvKp0rsVC06eCA%3D%3D', //password需要使用 CryptoJS 进行aes加密
      //   'grant_type': 'password',
      //   scope: 'server',
      //   code: '311',
      // }),
    }).then((response) => response.json())
      .then((responseJson) => {
        AsyncStorage.setItem('access_token', responseJson.access_token);
        AsyncStorage.setItem('token_type', responseJson.token_type);
        AsyncStorage.setItem('refresh_token', responseJson.refresh_token);
        AsyncStorage.setItem('expires_in', responseJson.expires_in);
        AsyncStorage.setItem('user_id', responseJson.user_id);
        AsyncStorage.setItem('username', responseJson.username);
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