
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import withLoader from 'src/redux/actionCreator/withLoader'
class EventScreen extends Component{
    constructor(props){
        super(props);
        this.state={
          isCalendarView: true
        }
    }
    componentDidMount= async()=>{
      this.props.loader(true);
      setTimeout(()=>{
        this.props.loader(false)
      },
      5000);
    }
    render(){
      const {isCalendarView} = this.state;
        return (
            <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView style={{ flex:1, backgroundColor:'#fff'}}>
                  <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                      <View
                        style={styles.backWrap}>
                        <Ionicons name={"ios-chevron-back-sharp"} color={'transparent'} size={StyleConfig.countPixelRatio(24)} />
                      </View>
                      <Text style={styles.headerTitle}>Event</Text>
                      <TouchableOpacity 
                        onPress={()=> this.setState({isCalendarView: !isCalendarView})}
                        style={styles.backWrap}>
                        <FontAwesome name={ isCalendarView ? "list" : "calendar"} color={'#333333dd'} size={StyleConfig.countPixelRatio(24)} />
                      </TouchableOpacity>
                  </View>                 
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={styles.scrollView}>
                    <View style={[StyleConfig.card,{ flexDirection:'row', alignItems:'center', margin:StyleConfig.countPixelRatio(16)}]}>
                      <FontAwesome name={"check-circle"} size={StyleConfig.countPixelRatio(30)} color={'#388E3C88'} />
                      <View style={{marginLeft:StyleConfig.countPixelRatio(12)}}>
                        <Text style={styles.welcomeText}>You are all set!</Text>
                        <Text style={styles.welcomeText}>Lets add your first event now!</Text>
                      </View>
                    </View>

                    <View style={[StyleConfig.card,{  margin:StyleConfig.countPixelRatio(16)}]}>
                        <View style={styles.textInputWrap}>
                          <TextInput
                            style={styles.inputStyle}
                            placeholderTextColor={"#33333399"}
                            placeholder={"Event name e.g. 50th Bob's Birthday"}
                          />
                        </View>
                        <View style={styles.textInputWrap}>
                          <TextInput
                            style={styles.inputStyle}
                            placeholderTextColor={"#33333399"}
                            placeholder={"Location e.g. ABC Banquet Hall"}
                          />
                        </View>
                        <Text style={styles.notesText}>a name your guests and vendors recorgnise</Text>
                        
                        <View style={styles.textInputWrap}>
                          <TextInput
                            style={styles.inputStyle}
                            placeholderTextColor={"#33333399"}
                            placeholder={"address (start typing and we'll look )"}
                          />
                        </View>

                        <View style={styles.textInputWrap}>
                          <TextInput
                            style={styles.inputStyle}
                            placeholderTextColor={"#33333399"}
                            placeholder={"type of event (Bithday)"}
                          />
                        </View>

                        <View style={{flexDirection:'row-reverse'}}>
                          <Button  buttonWrap={{width:StyleConfig.width*0.25, height:StyleConfig.countPixelRatio(36)}}>Next</Button>
                        </View>



                    </View>



                </ScrollView>
              </SafeAreaView>
            </>
          );
    }
}
export default withLoader(EventScreen) ;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  backWrap:{
    paddingHorizontal:StyleConfig.countPixelRatio(16), 
    paddingVertical:StyleConfig.countPixelRatio(4),
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
  welcomeText:{
    fontFamily: StyleConfig.fontMedium,
    fontSize: StyleConfig.fontSizeH2_3
  },
  notesText:{
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH4,
    marginTop: StyleConfig.countPixelRatio(-6),
    marginLeft: StyleConfig.countPixelRatio(8),
    marginBottom: StyleConfig.countPixelRatio(8)
  },
  inputStyle: {
    fontFamily: StyleConfig.fontRegular,
    fontSize: StyleConfig.fontSizeH3,
    marginLeft: StyleConfig.countPixelRatio(4)
  },
  textInputWrap:{
    borderWidth:0.5,
    borderRadius: StyleConfig.countPixelRatio(4),
    padding:StyleConfig.countPixelRatio(2),
    margin:StyleConfig.countPixelRatio(8),
    flex:1,
    justifyContent:'center',
    minHeight: StyleConfig.countPixelRatio(48)
  },
  
});
