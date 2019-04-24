import React, { Component } from 'react';
import { StyleSheet, View, Button, DeviceEventEmitter, Text } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '聊天',
    };
  };

  state = {
    messages: []
  };

  componentWillMount() {
    setTimeout(() => {//用于测试， wego.一定要先login，
      this.subscription = DeviceEventEmitter.addListener('observeUserMessage', (message) => {
        alert('接收聊天消息：' + JSON.stringify(message))
      });
    }, 8000);
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }
  componentWillUnmount() {
    this.subscription.remove();
  };
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }
  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 35
  },
});
