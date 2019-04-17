import React, { Component } from 'react';
import { StyleSheet, View, Button, ToastAndroid } from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
import { appid, channelProfile, audioProfile, audioScenario } from './src/constants';

export default class App extends Component {
  state = {
    clientRole: 1,
    users: 0,
  };

  componentWillMount() {
    const { clientRole } = this.state;
    RtcEngine.on('userJoined', (data) => {
    });
    RtcEngine.on('error', (data) => {
      ToastAndroid.show(JSON.stringify(data), 5)
    });

    RtcEngine.init({
      appid,
      channelProfile,
      clientRole,
      audioProfile,
      audioScenario,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="加入房间" onPress={() => {
          RtcEngine.joinChannel('test');
        }} />
        <AgoraView />
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
