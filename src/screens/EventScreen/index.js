
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

const DUMMY_DATA = [
  {
    "id": 1001,
    "hostUserId": 50,
    "eventName": "Dev's Birthday",
    "date": "2020-11-02",
    "location": "Honest Banquet",
    "address": "700 5th Avenue, New York",
    "eventType": "Birthday",
    "guest": {
      "confirmed": 22,
      "cancelled": 8,
      "tentative": 12
    }
  },
  {
    "id": 1002,
    "hostUserId": 49,
    "eventName": "James & Eline Anniversary",
    "date": "2020-11-04",
    "location": "Mango Hotel",
    "address": "133, West 55th street. New York",
    "eventType": "Anniversary",
    "guest": null,
    "myRes": 1 // accepted
  },
  {
    "id": 1003,
    "hostUserId": 49,
    "eventName": "Edan & Robin Anniversary",
    "date": "2020-11-05",
    "location": "Mango Hotel",
    "address": "133, West 55th street. New York",
    "eventType": "Anniversary",
    "guest": null,
    "myRes": -1 // rejected
  },
  {
    "id": 1004,
    "hostUserId": 49,
    "eventName": "Amelia's Birthday",
    "date": "2020-11-05",
    "location": "7Star Hotel",
    "address": "15, West 24th street. New York",
    "eventType": "Birthday",
    "guest": null,
    "myRes": 0 // tentative
  },
  {
    "id": 1005,
    "hostUserId": 50,
    "eventName": "Dev's Birthday",
    "date": "2020-11-11",
    "location": "Honest Banquet",
    "address": "700 5th Avenue, New York",
    "eventType": "Birthday",
    "guest": {
      "confirmed": 22,
      "cancelled": 8,
      "tentative": 12
    }
  },
  {
    "id": 1006,
    "hostUserId": 49,
    "eventName": "James & Eline Anniversary",
    "date": "2020-11-09",
    "location": "Mango Hotel",
    "address": "133, West 55th street. New York",
    "eventType": "Anniversary",
    "guest": null,
    "myRes": 1 // accepted
  },
  {
    "id": 1007,
    "hostUserId": 49,
    "eventName": "Edan & Robin Anniversary",
    "date": "2020-11-08",
    "location": "Mango Hotel",
    "address": "133, West 55th street. New York",
    "eventType": "Anniversary",
    "guest": null,
    "myRes": -1 // rejected
  },
  {
    "id": 1008,
    "hostUserId": 49,
    "eventName": "Amelia's Birthday",
    "date": "2020-11-07",
    "location": "7Star Hotel",
    "address": "15, West 24th street. New York",
    "eventType": "Birthday",
    "guest": null,
    "myRes": 0 // tentative
  }
]

class EventScreen extends Component {
  state = {
    isCalendarView: true,
    showWelcome: false,
    data: DUMMY_DATA,
    calendarHeight: 0,
    selectedDate: new Date(),
    calendarData: {}
  }
  constructor(props) {
    super(props);
    // this.setState({ showWelcome: true })
    // setTimeout(() => {
    //   this.setState({ showWelcome: false })
    // },
    //   5000);
  }
  componentDidMount = async () => {
    // this.props.loader(true);
    // setTimeout(()=>{
    //   this.setState({data:DUMMY_DATA})
    //   this.props.loader(false)
    // }, 2000);
    let newData = {};
    for (let ind in DUMMY_DATA) {
      if (newData.hasOwnProperty(DUMMY_DATA[ind].date)) {
        newData[DUMMY_DATA[ind].date].data.push(DUMMY_DATA[ind])
      } else {
        newData[DUMMY_DATA[ind].date] = { data: [{ ...DUMMY_DATA[ind] }], "marked": true };
      }
    }
    this.setState({ calendarData: newData }, () => {
      let dateString = moment(new Date()).format("YYYY-MM-DD")
      this.onDayPress({ dateString })
    })

  }
  onSavePress = () => {
    this.props.loader(true);
    setTimeout(() => {
      this.setState({ data: DUMMY_DATA })
      this.props.loader(false)
    }, 2000);
  }

  onAddPress = () => {
    this.setState({ data: [] })
  }
  onItemPress = (event) => {
    if (event == null) {
      this.setState({ data: [] })
    } else if (event.hostUserId == userId) {
      this.props.navigation.navigate(Const.NK_EVENT_DETAILS, { event, hostOfTheEvent: true })
    } else {
      this.props.navigation.navigate(Const.NK_EVENT_DETAILS, { event, hostOfTheEvent: false })
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
    const { isCalendarView, showWelcome, data, selectedDate, calendarData } = this.state;
    console.log(calendarData)
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
              <FontAwesome name={isCalendarView ? Const.IC_EVENT_LIST : Const.IC_EVENT_CALENDAR} color={data.length == 0 ? StyleConfig.COLORS.transparent : '#333333dd'} size={StyleConfig.countPixelRatio(24)} />
            </TouchableOpacity>
          </View>

          {isCalendarView && <View style={{ flex: 1 }} >
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
              renderItem={({ item, index }) => <EventListItem {...this.props} onPress={() => this.onItemPress(item)} event={item} isHostedByMe={item.hostUserId == userId} />}
              ListFooterComponent={() => <EventListItem {...this.props} onPress={() => this.onItemPress(null)} />}
            />
          </View>}
          {!isCalendarView && <ScrollView
            style={styles.content}>
            {data.length > 0 && <FlatList
              data={data}
              extraData={this.state}
              keyExtractor={(item, index) => `calender${item.id}`}
              renderItem={({ item, index }) => <EventListItem {...this.props} onPress={() => this.onItemPress(item)} event={item} isHostedByMe={item.hostUserId == userId} />}
              ListFooterComponent={() => <EventListItem {...this.props} onPress={() => this.onItemPress(null)} />}
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
          {data.length == 0 && this.props.isVen && <ScrollView style={styles.content}>
            <AddEventComponent onSavePress={this.onSavePress} />
          </ScrollView>}

        </SafeAreaView>
      </>
    );
  }
}
export default withVendor(withLoader(EventScreen));
