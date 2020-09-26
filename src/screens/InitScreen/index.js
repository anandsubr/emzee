
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar, TouchableOpacity, Image, ImageBackground
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import StyleConfig from 'src/helper/StyleConfig';
import AppImages from 'src/assets/images';
import { Button } from 'src/components/common/Button';
class InitScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
              <StatusBar barStyle="dark-content" />
              <ImageBackground 
                source={AppImages.initBack}
                style={styles.ibContainer}
              >
                  <View style={styles.content}>
                      <Image
                        source={AppImages.icIcon}
                        resizeMode={'contain'}
                        style={styles.appIcon} />
                      <Text style={styles.sectionTitle1}>The world is a party let's plan one. Let's Emzee</Text>
                      <View style={{flex:1}}>

                      </View>
                      <Button
                        onPress={() => this.props.navigation.navigate("Login")}
                        buttonWrap={{backgroundColor:"#388E3C", borderColor:"#388E3C", marginBottom:StyleConfig.countPixelRatio(24)}}
                      >Ready to Plan? Let's Emzee</Button>
                      
                      <Button
                        buttonWrap={{backgroundColor:StyleConfig.COLORS.darkRed, marginBottom:StyleConfig.countPixelRatio(24)}}
                        onPress={() => this.props.navigation.navigate("Login")}
                      >Vendors? Help Emzee</Button>
                      

                      <Button
                        buttonWrap={{width:StyleConfig.width*0.85, backgroundColor:'transparent', borderWidth:0,marginBottom:StyleConfig.countPixelRatio(24)}}
                        onPress={() => this.props.navigation.navigate("Register")}
                      >Are you new at Emzee? Sign Up</Button>
                      
                  </View>
                </ImageBackground>
                
            </>
          );
    }
}
export default InitScreen ;

const styles = StyleSheet.create({
  ibContainer:{
    width:StyleConfig.width,
    height:StyleConfig.height
  },
  content:{
    flex:1,
    backgroundColor:'#00000088',
    alignItems:'center',
    paddingTop: StyleConfig.countPixelRatio(100)
  },
  appIcon:{
    height:StyleConfig.countPixelRatio(100),
    width:StyleConfig.countPixelRatio(200),
    tintColor: '#fff'
  },
  sectionTitle1: {
    fontFamily: StyleConfig.fontSemiBold,
    fontSize: StyleConfig.fontSizeH3,
    color: StyleConfig.COLORS.white,
  },
  
});