
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground
} from 'react-native';
import StyleConfig from 'src/helper/StyleConfig';
import AppImages from 'src/assets/images';
import { Button } from 'src/components/common/Button';
import styles from 'src/helper/styles';
import strings from 'src/helper/strings';
import * as Const from 'src/helper/constant';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import withVendor from 'src/redux/actionCreator/withVendor';
import ApiManager from 'src/apiManager'
import { STATIC_EVENT } from '../../helper/constant';

class InitScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    let isLogin = await SecureStore.getItemAsync(Const.SS_IS_LOGIN);
    let isVendor = await SecureStore.getItemAsync(Const.SS_IS_VENDOR);
    if (isVendor == "true") {
      //this.props.setIsVendor(true)
    }
    if (isLogin == "true") {
      this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Const.NK_DASHBOARD }] }))
    }

    // TODO REGISTER API CALL DEMO
    // let data = {
    //   "id": "9033343516",
    //   "email": "",
    //   "firstname": "",
    //   "initials": "ASS",
    //   "lastname": "",
    //   "type": 1
    // }
    // let response = await ApiManager.postRegister(data)


    //TODO GET USER PROFILE API CALL DEMO
    // let response = await ApiManager.getUserProfile(Const.STATIC_USER)

    //TODO GET ALL EVENTS API CALL
    // let response = await ApiManager.getAllEvents()


    // TODO UPDATE PROFILE API CALL
    // let data = {
    //   "email": "hiren.devstree@gmail.com",
    //   "firstname": "Hiren",
    //   "initials": "ASE",
    //   "lastname": "Vaghela",
    //   "type": 1
    // }
    // let response = await ApiManager.postUpdateProfile(Const.STATIC_USER, data)

    // ----------------------------------------------------
    // TODO ADD EVENT API CALL DEMO
    // let data = {
    //   "name": "My 27th",
    //   "startdate": "01-01-2020",
    //   "enddate": "02-01-2020",
    //   "userid": Const.STATIC_USER,
    //   "usertype": "1"
    // }

    // let response = await ApiManager.postEvent(data)


    //TODO GET EVENT API CALL DEMO
    // let response = await ApiManager.getEventDetails(STATIC_EVENT)

    //TODO GET ALL EVENTS API CALL
    // let response = await ApiManager.getAllEvents()

    // TODO UPDATE EVENT API CALL
    // let data = {
    //   "name": "My 25th",
    //   "startdate": "01-11-2020",
    //   "enddate": "02-11-2020",
    //   "userid": Const.STATIC_USER,
    //   "usertype": "1"
    // }
    // let response = await ApiManager.postUpdateEvent(STATIC_EVENT, data)

    // let response = await ApiManager.getServiceProvider(STATIC_EVENT)

    //console.log({ response })
  }
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={AppImages.initBack}
          style={styles.container}
        >
          <View style={styles.contentInit}>
            <Image
              source={AppImages.icIcon}
              resizeMode={'contain'}
              style={[styles.appIcon, { tintColor: StyleConfig.COLORS.white }]} />
            <Text style={styles.appDescText}>{strings.the_world_is_a_party_lets_plan_one_lets_emzee}</Text>
            <View style={styles.content}>

            </View>
            <Button
              onPress={() => {
                this.props.setIsVendor(false)
                this.props.navigation.navigate(Const.NK_LOGIN)
              }}
              buttonWrap={{ backgroundColor: StyleConfig.COLORS.green, borderColor: StyleConfig.COLORS.green, marginBottom: StyleConfig.countPixelRatio(24) }}
            >{strings.ready_to_plan_lets_emzee}</Button>

            <Button
              buttonWrap={{ backgroundColor: StyleConfig.COLORS.darkRed, borderColor: StyleConfig.COLORS.darkRed, marginBottom: StyleConfig.countPixelRatio(44) }}
              onPress={() => {
                this.props.setIsVendor(true)
                this.props.navigation.navigate(Const.NK_LOGIN)
                //this.props.navigation.navigate(Const.NK_VENDOR_REGISTER)

              }}
            >{strings.vendors_help_emzee}</Button>

          </View>
        </ImageBackground>

      </>
    );
  }
}
export default withVendor(InitScreen);

// const styles = StyleSheet.create({
//   ibContainer:{
//     width:StyleConfig.width,
//     height:StyleConfig.height
//   },
//   content:{
//     flex:1,
//     backgroundColor:'#00000088',
//     alignItems:'center',
//     paddingTop: StyleConfig.countPixelRatio(100)
//   },
//   appIcon:{
//     height:StyleConfig.countPixelRatio(100),
//     width:StyleConfig.countPixelRatio(200),
//     tintColor: '#fff'
//   },
//   sectionTitle1: {
//     fontFamily: StyleConfig.fontSemiBold,
//     fontSize: StyleConfig.fontSizeH3,
//     color: StyleConfig.COLORS.white,
//   },

// });