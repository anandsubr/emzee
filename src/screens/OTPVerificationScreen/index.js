
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
import { CommonActions } from '@react-navigation/native';
class OTPVerificationScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView style={{ flex:1, backgroundColor:'#fff'}}>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                      <TouchableOpacity 
                      onPress={()=> this.props.navigation.goBack()}
                      style={{paddingHorizontal:StyleConfig.countPixelRatio(16), paddingVertical:StyleConfig.countPixelRatio(4)}}>
                      <Ionicons name={"ios-chevron-back-sharp"} color={'#333'} size={StyleConfig.countPixelRatio(24)} />
                      </TouchableOpacity>
                      <Text style={styles.headerTitle}>SIGN UP</Text>
                      <View style={{paddingHorizontal:StyleConfig.countPixelRatio(16), paddingVertical:StyleConfig.countPixelRatio(4)}}>
                      <Ionicons name={"ios-chevron-back-sharp"} color={'#fff'} size={StyleConfig.countPixelRatio(24)} />
                      </View>
                    </View>
                    <View style={{ alignItems:'center', marginVertical:StyleConfig.countPixelRatio(50) }}>
                      <Image
                          source={AppImages.icIcon}
                          resizeMode={'contain'}
                          style={styles.appIcon} />
                      <Text style={styles.sectionTitle1}>The world is a party let's plan one. Let's Emzee</Text>
                    </View>
                    <View style={{ alignItems:'center'}}>
                      <View style={{
                        borderWidth:0.5,
                        borderRadius: StyleConfig.countPixelRatio(4),
                        padding:StyleConfig.countPixelRatio(6),
                        margin:StyleConfig.countPixelRatio(16),
                        width: StyleConfig.width*0.7,
                        justifyContent:'center',
                        minHeight: StyleConfig.countPixelRatio(48)
                      }}>
                      <TextInput
                        style={styles.inputStyle}
                        placeholderTextColor={"#888"}
                        keyboardType={'phone-pad'}
                        maxLength={6}
                        placeholder={"Enter your confirmation number"}
                      ></TextInput>
                      </View>

                      <Button 
                        onPress={()=> this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Dashboard' }] })) }
                        buttonWrap={{width: StyleConfig.width*0.5}}>Submit</Button>

                    </View>
                </ScrollView>
              </SafeAreaView>
            </>
          );
    }
}
export default OTPVerificationScreen ;

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
  inputStyle: {
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH3,
  }
});
