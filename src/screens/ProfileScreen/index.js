import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import StyleConfig from 'src/helper/StyleConfig';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import * as Const from 'src/helper/constant';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AppImages from 'src/assets/images';
import { Button } from 'src/components/common/Button';
import strings from 'src/helper/strings';
import styles from 'src/helper/styles';
import ApiManager from 'src/apiManager'
class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    componentDidMount = async () => {
        let response = await ApiManager.getUserProfile(Const.STATIC_USER)
        if (response.hasOwnProperty("data")) {
            this.setState({ data: response.data });
        }
    }
    onLogout = async () => {
        await SecureStore.deleteItemAsync(Const.SS_IS_LOGIN)
        await SecureStore.deleteItemAsync(Const.SS_IS_VENDOR)
        this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Const.NK_INIT }] }))
    }
    render() {
        const { data } = this.state
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.headerWrap}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                            style={styles.backWrap}>
                            <FontAwesome name={Const.IC_BACK} color={StyleConfig.COLORS.defaultTextColor} size={StyleConfig.headerIconSize} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{strings.profile}</Text>
                        <View
                            style={styles.backWrap}>
                            <FontAwesome name={Const.IC_BACK} color={StyleConfig.COLORS.transparent} size={StyleConfig.headerIconSize} />
                        </View>
                    </View>
                    
                    <ScrollView style={styles.scrollView}>
                        <View style={{alignItems:'center'}}>
                            <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDiuCkLScaAeFQHMWamLQ6IaJK56YlNJFB4A&usqp=CAU"}}
                            style={{height:120, width:120, marginVertical:10,borderRadius:60}} />
                            <Text style={styles.headerTitle}>{`${data.id}`}</Text>
                            <Text style={styles.headerTitle}>{`${data.firstname} ${data.lastname}`}</Text>
                            <Text style={styles.headerTitle}>{`${data.email}`}</Text>
                        
                        </View>
                        
                    
                        
                        <TouchableOpacity
                            onPress={this.onLogout}
                            style={{ flexDirection: 'row', alignItems: 'center', marginTop:20, marginLeft:16 }}>
                            <Text style={styles.headerTitle}>Logout</Text>
                        </TouchableOpacity>
                    
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}
export default ProfileScreen;