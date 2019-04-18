import React, { Component } from 'react';
import { StyleSheet, View, Button, ToastAndroid, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { RtcEngine, AgoraView } from 'react-native-agora';
import { appid, channelProfile, audioProfile, audioScenario } from '../../constants';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '我的',
    };
  };

  state = {};

  componentWillMount() {}

  render() {
    const list = [
      {
        title: 'Appointments',
        icon: 'av-timer'
      },
      {
        title: 'Trips',
        icon: 'flight-takeoff'
      },
    ]

    return (
      <View>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
            />
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
