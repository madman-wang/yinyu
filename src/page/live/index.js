import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Dimensions,
  ScrollView,
} from 'react-native';
import { Toast } from '@ant-design/react-native';
import { Avatar } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import { RtcEngine } from 'react-native-agora';
import { appid, channelProfile, audioProfile, audioScenario } from '../../constants';

const { width, height } = Dimensions.get('window');

export default class Live extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '推荐',
    };
  };

  state = {
    clientRole: 1,
    users: 0,
    message: [
      '欢迎来到连麦互动',
      '你当前的身份为观众,点击上麦可语音连麦',
    ]
  };

  componentWillMount() {
    const { clientRole } = this.state;
    RtcEngine.on('userJoined', (data) => {
      Toast.show('加入成功', 5);
    });
    RtcEngine.on('firstRemoteVideoDecoded', (data) => {
      Toast.show('firstRemoteVideoDecoded', 5);
    });
    RtcEngine.on('userJoined', (data) => {
      Toast.show('userJoined', 5);
    });
    RtcEngine.on('userOffline', (data) => {
      Toast.show('userOffline', 5);
    });
    RtcEngine.on('joinChannelSuccess', (data) => {
      this.setState({
        message: [].concat(this.state.message, ['你已经成功加入']),
      });
    });
    RtcEngine.on('audioVolumeIndication', (data) => {
      Toast.show('audioVolumeIndication', 5);
    })
    RtcEngine.on('clientRoleChanged', (data) => {
      Toast.show('clientRoleChanged', 5);
    })
    RtcEngine.on('error', (data) => {
      Toast.show(JSON.stringify(data), 5);
      if(data.error === 17) {
        RtcEngine.leaveChannel()
      }
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
    const { message } = this.state;
    const users = [
      'https://img.xiangshengclub.com/MTU1NDIwNzg5NSM5NzE=.jpg',
      'https://img.xiangshengclub.com/MTU1NDIxNzE3NSMzNDY=.jpg',
      'http://img2.inke.cn/MTU1MzM5MTA4MDY4OCMzNzMjanBn.jpg',
    ];
    const hosts = [
      new Array(4).fill(0),
      new Array(4).fill(0),
    ];

    return (
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0, y: 0}}
          colors={['#66B7F3', '#AB97FF', '#B498FF', '#F863F7', '#FF5EDB']}
          style={styles.linearGradient}
        />
        <View style={styles.header}>
          <Text style={styles.title}>处对象</Text>
          <View style={styles.users}>
            {
              users.map(user => (
                <Avatar
                  key={user}
                  avatarStyle={styles.user}
                  containerStyle={styles.userWrap}
                  size="small"
                  rounded
                  source={{
                    uri: user,
                  }}
                  activeOpacity={0.7}
                />
              ))
            }
          </View>
        </View>
        <View>
          {
            hosts.map((item, index) => (
              <View style={styles.hostWrap} key={index}>
                {
                  item.map((item, i) => (
                    <Avatar
                      key={i}
                      overlayContainerStyle={styles.overlayContainerStyle}
                      size="medium"
                      rounded
                      icon={{name: 'user-plus', type: 'feather'}}
                      source={{
                        uri: index === 0 ? users[i] : '',
                      }}
                      activeOpacity={0.7}
                      onPress={async() => {
                        Toast.show(3131);
                        await RtcEngine.joinChannel('test');
                        RtcEngine.setClientRole(1);
                        this.setState({
                          message: [].concat(message, ['你已经成为主播']),
                        })
                      }}
                    />
                  ))
                }
              </View>
            ))
          }
        </View>
        <ScrollView contentContainerStyle={styles.messageWrap}>
          {
            message.map(item => (
              <Text>{item}</Text>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  users: {
    flexDirection: 'row',
  },
  userWrap: {
    marginLeft: 2,
    marginRight: 2,
    width: 26,
    height: 26,
  },
  user: {
    width: 26,
    height: 26,
  },
  hostWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  overlayContainerStyle: {
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  messageWrap: {
    position: 'absolute',
    width: 200,
    left: 10,
    right: 10,
    bottom: 20,
    height: 200,
  },
  container: {
    position: 'relative',
    width,
    height,
  },
});
