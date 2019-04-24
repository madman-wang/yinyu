import React from 'react';
import {
    TouchableHighlight,
    Text,
    Image,
    View,
    StyleSheet
} from 'react-native';
import { Urls } from '../../../constants/Constants';

export default class MessageListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    _onPress = (id) => {
        const { onPress } = this.props;
        onPress(id);
    };
    render() {
        const { itemData } = this.props;
        const time = `${itemData.liveBeginTime}`;
        return (
            <TouchableHighlight underlayColor="#f7f5f5" onPress={() => this._onPress(itemData.id)}>
                <View style={styles.itemStyle}>
                    <Image source={{ uri: itemData.icon }} style={{ width: 50, height: 50 }} />
                    <View style={{ flex: 1, marginLeft: 10, padding: 0 }}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={{ flex: 1, marginTop: 8 }}>{itemData.name}</Text>
                        <Text style={{ flex: 1, color: '#9999' }}>{itemData.lastMsg}</Text>
                    </View>
                    <View>
                        <Text style={{ flex: 1, marginTop: 8, color: '#9999' }}>{itemData.lastTime}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        height: 70,
    },
});
