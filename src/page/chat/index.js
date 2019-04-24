import React, { Component } from 'react';
import { StyleSheet, View, Button, ToastAndroid, Text } from 'react-native';
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
    marginBottom:35
  },
});
