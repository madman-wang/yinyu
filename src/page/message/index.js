import React, { Component } from 'react';
import { StyleSheet, View, Button, ToastAndroid, Text } from 'react-native';
import MessageList from './component/MessageList';
export default class Message extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '消息',
    };
  };

  state = {};

  componentWillMount() {
    
  }

  render() {
    return (
      <MessageList />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
