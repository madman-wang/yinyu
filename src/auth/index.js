import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Toast, InputItem } from '@ant-design/react-native';
import { Button } from 'react-native-elements';
import Wego from '../wego';
import axios from 'axios';

const maxLength = 11;

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };

  state = {
    username: '',
    password: '',
    code: '',
  }

  login = () => {
    const { username, password } = this.state;
    if (!username) {
      return Toast.show('请输入手机号');
    }
    if (username.length !== maxLength) {
      return Toast.show('手机号输入不合法');
    }
    if (!password) {
      return Toast.show('请输入密码');
    }

    axios({
      url: 'http://21479e44c8.iask.in/auth/oauth/token',
      method: 'POST',
      params: {
        username,
        password,
        code: 'm4dg',
        grant_type: 'password',
      },
      headers: {
        Authorization: 'Basic dGVzdDp0ZXN0',
        system_code: '1001',
      },
    }).then((responseJson) => {
      return  Toast.show(JSON.stringify(responseJson));
      AsyncStorage.setItem('access_token', responseJson.access_token);
      AsyncStorage.setItem('token_type', responseJson.token_type);
      AsyncStorage.setItem('wego_user_id', '1');
      AsyncStorage.setItem('refresh_token', responseJson.refresh_token);
      AsyncStorage.setItem('expires_in', String(responseJson.expires_in));
      AsyncStorage.setItem('user_id', String(responseJson.user_id));
      AsyncStorage.setItem('username', responseJson.username);
      Wego.login('1');
      this.props.navigation.navigate("Chat")
    });
  }

  render() {
    return (
      <View style={{
        margin: 20,
      }}>
        <InputItem
          placeholder='手机号'
          onChangeText={(value) => this.setState({ username: value })}
          type='phone'
        />
        <InputItem
          type='password'
          placeholder='密码'
          onChangeText={(value) => this.setState({ password: value })}
        />
        <InputItem
          placeholder='验证码'
          type='number'
          onChangeText={(value) => this.setState({ code: value })}
        />
        <Button
          containerStyle={{
            marginTop: 40,
          }}
          title="登录"
          onPress={this.login}
          size={60}
          disabled={this.state.username.length !== maxLength}
        />
      </View>
    );
  }
}