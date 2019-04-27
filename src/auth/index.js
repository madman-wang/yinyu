import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Toast, InputItem, Portal, Modal } from '@ant-design/react-native';
import { Button } from 'react-native-elements';

const AV = require('leancloud-storage');
const maxLength = 11;

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: '登录',
  };

  state = {
    username: '17051124311',
    code: '389686',
  }

  register = () => {
    const { username, code } = this.state;
    const loading = Toast.loading('注册中...', 0);
    AV.User.signUpOrlogInWithMobilePhone(username, code).then(() => {
      Portal.remove(loading);
      this.props.navigation.navigate('App');
    }).catch(e => {
      Portal.remove(loading);
      alert(e.rawMessage);
    });
  }

  reset = () => {
    const { username, code } = this.state;
    const loading = Toast.loading('重置中...', 0);
    AV.User.resetPasswordBySmsCode(username, code).then(() => {
      Portal.remove(loading);
      Toast.show('重置成功，请重新登录');
    }).catch(e => {
      Portal.remove(loading);
      alert(e.rawMessage);
    });
  }

  login = () => {
    const { username, code } = this.state;
    if (!username) {
      return Toast.show('请输入手机号');
    }
    if (username.length !== maxLength) {
      return Toast.show('手机号输入不合法');
    }

    // axios({
    //   url: 'http://21479e44c8.iask.in/auth/oauth/token',
    //   method: 'POST',
    //   params: {
    //     username,
    //     password,
    //     code: 'm4dg',
    //     grant_type: 'password',
    //   },
    //   headers: {
    //     Authorization: 'Basic dGVzdDp0ZXN0',
    //     system_code: '1001',
    //   },
    // }).then((responseJson) => {
    //   return  Toast.show(JSON.stringify(responseJson));
    //   AsyncStorage.setItem('access_token', responseJson.access_token);
    //   AsyncStorage.setItem('token_type', responseJson.token_type);
    //   AsyncStorage.setItem('wego_user_id', '1');
    //   AsyncStorage.setItem('refresh_token', responseJson.refresh_token);
    //   AsyncStorage.setItem('expires_in', String(responseJson.expires_in));
    //   AsyncStorage.setItem('user_id', String(responseJson.user_id));
    //   AsyncStorage.setItem('username', responseJson.username);
    //   Wego.login('1');
    //   this.props.navigation.navigate("Chat")
    // });
    const loading = Toast.loading('登录中...', 0);
    AV.User.logInWithMobilePhoneSmsCode(username, code).then(() => {
      Portal.remove(loading);
      this.props.navigation.navigate('App');
    }).catch((e) => {
      Portal.remove(loading);
      if (e.code === 219) {
        return Modal.alert('登录失败', e.rawMessage, [{
          text: '不用了',
          onPress: () => {},
        }, {
          text: '重置密码',
          onPress: this.reset,
        }]);
      }
      if (e.code === 211 || e.code === 213) {
        return this.register();
      }
      return alert(e.rawMessage);
    });
  }

  render() {
    return (
      <View style={{
        margin: 20,
      }}>
        <InputItem
          value={this.state.username}
          placeholder='手机号'
          onChangeText={(value) => this.setState({ username: value })}
          type='phone'
        />
        <InputItem
          value={this.state.code}
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