
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AppImages from 'src/assets/images';
import { Button } from 'src/components/common/Button';
import withLoader from 'src/redux/actionCreator/withLoader';
import { CommonActions } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
          isRemember: false
        }
    }
    render(){
      const {isRemember} = this.state ;
        return (
            <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView style={{ flex:1, backgroundColor:'#fff'}}>
                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                      <TouchableOpacity 
                      onPress={()=> this.props.navigation.goBack()}
                      style={{paddingHorizontal:StyleConfig.countPixelRatio(16), paddingVertical:StyleConfig.countPixelRatio(4)}}>
                      <Ionicons name={"ios-chevron-back-sharp"} color={'#333'} size={StyleConfig.countPixelRatio(24)} />
                      </TouchableOpacity>
                      <Text style={styles.headerTitle}>LOGIN</Text>
                      <View style={{paddingHorizontal:StyleConfig.countPixelRatio(16), paddingVertical:StyleConfig.countPixelRatio(4)}}>
                      <Ionicons name={"ios-chevron-back-sharp"} color={'#fff'} size={StyleConfig.countPixelRatio(24)} />
                      </View>
                    </View>
                    <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                
                    <View style={{ alignItems:'center', marginVertical:StyleConfig.countPixelRatio(50) }}>
                      <Image
                          source={AppImages.icIcon}
                          resizeMode={'contain'}
                          style={styles.appIcon} />
                      <Text style={styles.sectionTitle1}>The world is a party let's plan one. Let's Emzee</Text>
                    </View>
                    <View style={{ alignItems:'center'}}>
                    <View style={styles.textInputWrap}>
                        <TextInput
                          style={styles.inputStyle}
                          placeholderTextColor={"#888"}
                          keyboardType={'email-address'}
                          placeholder={"Email Address"}
                        ></TextInput>
                      </View>

                      <View style={styles.textInputWrap2}>
                        <TextInput
                          style={styles.inputStyle}
                          placeholderTextColor={"#888"}
                          secureTextEntry={true}
                          placeholder={"Password"}
                        ></TextInput>
                      </View>
                      <View style={styles.forgotRowWrap}>
                        <TouchableOpacity>
                          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Text style={styles.rememberMeText}>Remember Me</Text>
                          <TouchableOpacity style={{width:StyleConfig.countPixelRatio(32)}} onPress={()=> this.setState({isRemember: !isRemember})}>
                            <FontAwesome style={{paddingLeft:StyleConfig.countPixelRatio(8)}} name={isRemember ? "check-square-o" : "square-o"} size={StyleConfig.countPixelRatio(24)} color={ isRemember ? StyleConfig.COLORS.darkPurple : '#333'}  />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Button
                      onPress={()=> this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Dashboard' }] })) }
                      buttonWrap={{width: StyleConfig.width*0.5, marginVertical:StyleConfig.countPixelRatio(28)}}>Login</Button>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.dontHaveLoginText}>Don't have a login?</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Register")} style={styles.registerWrap}>
                          <Text style={styles.registerHere}>Register Here</Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                </ScrollView>
              </SafeAreaView>
            </>
          );
    }
}
export default withLoader(LoginScreen) ;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  headerTitle:{
    fontFamily: StyleConfig.fontMedium,
    fontSize: StyleConfig.fontSizeH2,
    opacity: 0.8
  },
  appIcon:{
    height:StyleConfig.countPixelRatio(100),
    width:StyleConfig.countPixelRatio(200)
  },
  sectionTitle1: {
    fontFamily: StyleConfig.fontSemiBold,
    fontSize: StyleConfig.fontSizeH3,
    
  },
  textInputWrap:{
    borderWidth:0.5,
    borderRadius: StyleConfig.countPixelRatio(4),
    padding:StyleConfig.countPixelRatio(6),
    margin:StyleConfig.countPixelRatio(16),
    width: StyleConfig.width*0.7,
    justifyContent:'center',
    minHeight: StyleConfig.countPixelRatio(48)
  },
  textInputWrap2:{
    borderWidth:0.5,
    borderRadius: StyleConfig.countPixelRatio(4),
    padding:StyleConfig.countPixelRatio(6),
    marginHorizontal:StyleConfig.countPixelRatio(16),
    width: StyleConfig.width*0.7,
    justifyContent:'center',
    minHeight: StyleConfig.countPixelRatio(48)
  },
  forgotRowWrap:{
    marginHorizontal:StyleConfig.countPixelRatio(16),
    width: StyleConfig.width*0.7,
    marginTop: StyleConfig.countPixelRatio(8),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  inputStyle: {
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH3,
  },
  forgotPasswordText:{
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH3_4,
  },
  rememberMeText:{
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH3_4,
  },
  dontHaveLoginText:{
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH3,
    opacity:0.8
  },
  registerWrap:{
    borderBottomWidth:1,
    borderColor: "#2196F3"
  },
  registerHere:{
    fontFamily: StyleConfig.fontSemiBold,
    fontSize: StyleConfig.fontSizeH3,
    color: "#2196F3"
  }
});
