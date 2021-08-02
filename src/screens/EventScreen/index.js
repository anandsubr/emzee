
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import StyleConfig from 'src/helper/StyleConfig';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import withLoader from 'src/redux/actionCreator/withLoader';
import withVendor from 'src/redux/actionCreator/withVendor';
import styles from 'src/helper/styles';
import * as Const from 'src/helper/constant';
import AddEventComponent from 'src/screens/EventScreen/AddEventComponent';
import EventListItem from 'src/screens/EventScreen/EventListItem';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import strings from 'src/helper/strings';
const userId = 50;
import ApiManager from 'src/apiManager'

class EventScreen extends Component {
  state = {
    isCalendarView: true,
    showWelcome: false,
    data: [],
    calendarHeight: 0,
    selectedDate: new Date(),
    calendarData: {},
    showAddEvent: false
  }

  componentDidMount = async () => {
    this.getInitialData()
  }
  getInitialData = async () => {
    let response = await ApiManager.getAllEvents()
    response = response.map((item) => {
      let start = item.data.startdate.split("-")
      let startdate = `${start[2]}-${start[1]}-${start[0]}`
      return { ...item.data, "id": item.id, startdate }
    });
    console.log(response)
    let newData = {}
    for (let ind in response) {
      if (newData.hasOwnProperty(response[ind].startdate)) {
        newData[response[ind].startdate].data.push(response[ind])
      } else {
        newData[response[ind].startdate] = { data: [{ ...response[ind] }], "marked": true };
      }
    }
    console.log(newData)
    this.setState({ calendarData: newData }, () => {
      let dateString = moment(new Date()).format("YYYY-MM-DD")
      this.onDayPress({ dateString })
    })
  }
  onSavePress = async (data) => {
    this.props.loader(true);
    this.setState({ showAddEvent: false })
    let addEventRes = await ApiManager.postEvent(data)
    console.log({ addEventRes })
    this.getInitialData()
    this.props.loader(false)
  }

  onAddPress = () => {
    this.setState({ data: [] })
  }

  onPressHeaderBtn = (data) => {
    alert('Header button pressed')
  }

  onItemPress = (event) => {
    if (event == null) {
      this.setState({ showAddEvent: true })
    } else if (event.hostUserId == userId) {
      this.props.navigation.navigate(Const.NK_EVENT_DETAILS, { event, hostOfTheEvent: true })
    } else {
      // NEED TO CHANGE hostOfTheEvent to false
      this.props.navigation.navigate(Const.NK_EVENT_DETAILS, { event, hostOfTheEvent: true })
    }
  }
  onDayPress = ({ dateString }) => {
    const { calendarData } = this.state;
    if (calendarData.hasOwnProperty(dateString)) {
      this.setState({ selectedDate: dateString, data: calendarData[dateString].data })
    } else {
      this.setState({ selectedDate: dateString, data: [] })
    }

  }
  render() {
    const { isCalendarView, showWelcome, data, selectedDate, calendarData, showAddEvent } = this.state;
    //  console.log(calendarData)
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.flex1White}>
          <View style={styles.headerWrap}>
            <View
              style={styles.backWrap}>
              <FontAwesome name={Const.IC_BACK} color={StyleConfig.COLORS.transparent} size={StyleConfig.headerIconSize} />
            </View>
            <Text style={styles.headerTitle}>{strings.events}</Text>
            <TouchableOpacity
              onPress={() => this.setState({ isCalendarView: !isCalendarView })}
              style={styles.backWrap}>
              <FontAwesome name={isCalendarView ? Const.IC_EVENT_LIST : Const.IC_EVENT_CALENDAR} color={data.length == 0 ? StyleConfig.COLORS.transparent : !showAddEvent ? '#333333dd' : StyleConfig.COLORS.transparent} size={StyleConfig.countPixelRatio(24)} />
            </TouchableOpacity>
          </View>

          {isCalendarView && !showAddEvent && <View style={{ flex: 1 }} >
            <Calendar
              theme={{
                calendarBackground: '#fcfcfc',
                textSectionTitleColor: StyleConfig.COLORS.purple,
                textSectionTitleDisabledColor: '#ff0000', // "#d9e1e8"
                selectedDayBackgroundColor: StyleConfig.COLORS.darkPurple, // "#00adf5"
                selectedDayTextColor: '#ffffff',
                todayTextColor: StyleConfig.COLORS.darkPurple,
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: StyleConfig.COLORS.darkPurple,
                selectedDotColor: '#ffffff',
                arrowColor: StyleConfig.COLORS.darkPurple,
                disabledArrowColor: '#d9e1e8',
                monthTextColor: StyleConfig.COLORS.darkPurple,
                indicatorColor: StyleConfig.COLORS.darkPurple,
                textDayFontFamily: StyleConfig.fontLight,
                textMonthFontFamily: StyleConfig.fontBold,
                textDayHeaderFontFamily: StyleConfig.fontMedium,
                textTodayFontFamily: StyleConfig.fontBold,
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13
              }}
              onDayPress={this.onDayPress}
              markedDates={{ ...calendarData, [selectedDate]: { selected: true } }}
            />

            <FlatList
              data={data}
              extraData={this.state}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item, index }) => <EventListItem {...this.props} onPress={() => this.onItemPress(item)} onPressHeaderBtn={() => this.onPressHeaderBtn()} event={item} isHostedByMe={item.hostUserId == userId} />}
              ListFooterComponent={() => <EventListItem {...this.props} onPress={() => this.onItemPress(null)} onPressHeaderBtn={() => this.onPressHeaderBtn()} />}
            />
          </View>}
          {!isCalendarView && !showAddEvent && <ScrollView
            style={styles.content}>
            {data.length > 0 && <FlatList
              data={data}
              extraData={this.state}
              keyExtractor={(item, index) => `calender${item.id}`}
              renderItem={({ item, index }) => <EventListItem {...this.props} onPress={() => this.onItemPress(item)} event={item} onPressHeaderBtn={() => this.onPressHeaderBtn()} isHostedByMe={item.hostUserId == userId} />}
              ListFooterComponent={() => <EventListItem {...this.props} onPress={() => this.onItemPress(null)} onPressHeaderBtn={() => this.onPressHeaderBtn()} />}
            />
            }
            {showWelcome && <View style={[styles.modalContainer, { position: 'absolute', }]}>
              <FontAwesome name={"check-circle"} size={StyleConfig.countPixelRatio(30)} color={StyleConfig.COLORS.lightGreen} />
              <View style={styles.modalTextWrap}>
                <Text style={styles.textH23Medium}>{strings.you_are_all_set}</Text>
                <Text style={styles.textH23Medium}>{strings.lets_add_your_first_event_now}</Text>
              </View>
            </View>}
          </ScrollView>
          }
          {showAddEvent && <ScrollView style={styles.content}>
            <AddEventComponent onSavePress={(data) => this.onSavePress(data)} />
          </ScrollView>}

        </SafeAreaView>
      </>
    );
  }
}
export default withVendor(withLoader(EventScreen));
