
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  StatusBar, TouchableOpacity, Image
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import StyleConfig from 'src/helper/StyleConfig';
import AppImages from 'src/assets/images';
class InitScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView style={styles.container}>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                  
                  
                  <View style={styles.body}>
                      <Image
                        source={AppImages.icIcon}
                        resizeMode={'contain'}
                        style={{
                            height:StyleConfig.countPixelRatio(50),
                            width:StyleConfig.countPixelRatio(100)
                        }} />
                      {/* <Text style={styles.sectionTitle1}>The world is a party let's plan one. Let's Emzee</Text>
                      <Text style={styles.sectionTitle2}>Step One</Text>
                      <Text style={styles.sectionTitle3}>Step One</Text>
                      <Text style={styles.sectionTitle4}>Step One</Text>
                      <Text style={styles.sectionTitle5}>Step One</Text> */}
                    <View style={{justifyContent:'center'}}>
                        <TouchableOpacity style={{ height: StyleConfig.countPixelRatio(60), width: StyleConfig.width*0.4, borderRadius: 50 }} noPressedState={true}
                            onPress={() => this.props.navigation.navigate("Login")}
                            >
                            <Text style={{ fontFamily: StyleConfig.fontMedium, color: StyleConfig.COLORS.purple }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </>
          );
    }
}
export default InitScreen ;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e0e5ec',
        flex:1
    },
  scrollView: {
    
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    
    justifyContent:'center',
    alignItems:'center',
    marginTop:100
    
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: StyleConfig.fontRegular,
    fontSize: 24,
    color: Colors.black,
  },
  sectionTitle1: {
    fontFamily: StyleConfig.fontLight,
    fontSize: StyleConfig.fontSizeH3,
    color: Colors.black,
  },
  sectionTitle2: {
    fontFamily: StyleConfig.fontRegular,
    fontSize: 24,
    color: Colors.black,
  },
  sectionTitle3: {
    fontFamily: StyleConfig.fontMedium,
    fontSize: 24,
    color: Colors.black,
  },
  sectionTitle4: {
    fontFamily: StyleConfig.fontSemiBold,
    fontSize: 24,
    color: Colors.black,
  },
  sectionTitle5: {
    fontFamily: StyleConfig.fontBold,
    fontSize: 24,
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontFamily: StyleConfig.fontRegular,
    
    color: Colors.dark,
  },
  highlight: {
    fontFamily: StyleConfig.fontRegular,
    
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontFamily: StyleConfig.fontRegular,
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});