import { AsyncStorage, DeviceEventEmitter } from 'react-native';
var net = require('net');//21479e44c8.iask.in 18567  tcp 端口 这里是通过内网穿透的， 真的端口是8360

const heartbeat = 2;


const port = 18567
const host = '21479e44c8.iask.in'
const Wego = {}
Wego.login = (userId) => {
    let client = net.createConnection(port, host, () => {
        // 以空格划分，split ' ' 1-app 2-os 3-id 
        client.write(new Buffer(' live live ' + userId + '\r\n'));
        this.timer = setInterval(() => {
            this.client.write(new Buffer('1\r\n'), null, null);
        }, 5000);
    });
    client.on('data', (data) => {
        if (data == heartbeat) {
        } else if (data.slice(0, 1) == "{") {
            let message = JSON.parse(data);
            let type = message.type;
            //根据type 发送事件订阅， 每个页面初始化的时候订阅对应的事件
            DeviceEventEmitter.emit('observeUserMessage', message);
        }
    });

    client.on('error', (error) => {
    });

    client.on('close', () => {
        Î
    });
    this.client = client;
}
Wego.retry = async () => {
    let wego_user_id = await AsyncStorage.getItem('access_token');
    login(wego_user_id)
}
function Uint8ArrayToString(fileData) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString

}
export default Wego;