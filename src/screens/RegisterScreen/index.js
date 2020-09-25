
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
import withLoader from 'src/redux/actionCreator/withLoader'
class RegisterScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
              <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.headerWrap}>
                      <TouchableOpacity 
                        onPress={()=> this.props.navigation.goBack()}
                        style={styles.backWrap}>
                        <Ionicons name={"ios-chevron-back-sharp"} color={'#333'} size={StyleConfig.countPixelRatio(24)} />
                      </TouchableOpacity>
                      <Text style={styles.headerTitle}>SIGN UP</Text>
                      <View style={styles.backWrap}>
                        <Ionicons name={"ios-chevron-back-sharp"} color={'#fff'} size={StyleConfig.countPixelRatio(24)} />
                      </View>
                    </View>
                    <ScrollView
                      contentInsetAdjustmentBehavior="automatic"
                      style={styles.scrollView}>
                      <View style={styles.appIconWrap}>
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
                          keyboardType={'phone-pad'}
                          placeholder={"Enter your phone number"}
                        ></TextInput>
                        </View>

                        <Button
                          onPress={()=>this.props.navigation.navigate("OTPVerificationScreen")}
                          buttonWrap={styles.buttonWrap}>Sign Up</Button>

                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.haveLoginText}>Already have an account?</Text>
                          <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")} style={styles.loginWrap}>
                            <Text style={styles.loginHere}>Login Here</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                </ScrollView>
              </SafeAreaView>
            </>
          );
    }
}
export default withLoader(RegisterScreen) ;

const styles = StyleSheet.create({
  container:{ 
    flex:1, 
    backgroundColor:'#fff'
  },
  headerWrap:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  backWrap:{
    paddingHorizontal:StyleConfig.countPixelRatio(16), 
    paddingVertical:StyleConfig.countPixelRatio(4)
  },
  appIconWrap:{
    alignItems:'center',
    marginVertical:StyleConfig.countPixelRatio(50) 
  },
  buttonWrap:{
    width: StyleConfig.width*0.5,
    marginVertical:StyleConfig.countPixelRatio(28)
  },
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
  inputStyle: {
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH3,
  },
  haveLoginText:{
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH3,
    opacity:0.8
  },
  loginWrap:{
    marginLeft: StyleConfig.countPixelRatio(6),
    borderBottomWidth:1,
    borderColor: "#2196F3"
  },
  loginHere:{
    fontFamily: StyleConfig.fontSemiBold,
    fontSize: StyleConfig.fontSizeH3,
    color: "#2196F3"
  }
});
