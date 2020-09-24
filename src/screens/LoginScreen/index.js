
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import StyleConfig from 'src/helper/StyleConfig';
class LoginScreen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView>
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                  
                  
                  <View style={styles.body}>
                      <Text style={styles.sectionTitle1}>Step Login</Text>
                      <Text style={styles.sectionTitle2}>Step Login</Text>
                      <Text style={styles.sectionTitle3}>Step Login</Text>
                      <Text style={styles.sectionTitle4}>Step Login</Text>
                      <Text style={styles.sectionTitle5}>Step Login</Text>
                     
                  </View>
                </ScrollView>
              </SafeAreaView>
            </>
          );
    }
}
export default LoginScreen ;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#ff0',
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
    fontSize: 24,
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
