import React from 'react';
import { View, AsyncStorage, Fetch } from 'react-native';
import { Toast } from '@ant-design/react-native';
import { Input, Button } from 'react-native-elements';


var net = require('net');//21479e44c8.iask.in 18567  tcp 端口 这里是通过内网穿透的， 真的端口是8360

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };

  onChange = (e) => {
  }

  login = () => {//这个登陆接口有点特殊，我也不知道为啥要这么写
    fetch('http://21479e44c8.iask.in/auth/oauth/token?username=test5&password=rKu1%2F348LvKp0rsVC06eCA%3D%3D&code=m4dg&grant_type=password', {
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
        AsyncStorage.setItem('expires_in', String(responseJson.expires_in));
        AsyncStorage.setItem('user_id', String(responseJson.user_id));
        AsyncStorage.setItem('username', responseJson.username);
        let client = net.createConnection(18567, "21479e44c8.iask.in", () => {
          client.write(new Buffer(responseJson.user_id + ' www test 111\r\n'));
        });

        client.on('data', (data) => {
          // alert('tcp data:' + JSON.stringify(data))
        });

        client.on('error', (error) => {
          alert('tcp error')
        });

        client.on('close', () => {
          alert('tcp close')
        });

        this.timer = setInterval(() => {
          client.write(new Buffer('1\r\n'), null, null);
        }, 5000);
      }).catch((e) => {
        //Toast.show(JSON.stringify(e));
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