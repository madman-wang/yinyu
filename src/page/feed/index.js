import React, { Component } from 'react';
import { StyleSheet, View, Button, ToastAndroid, Text } from 'react-native';

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '最近',
    };
  };

  state = {};

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>feed</Text>
      </View>
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
