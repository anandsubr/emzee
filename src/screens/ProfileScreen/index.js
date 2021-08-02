import React, { Component } from 'react'
import {
  SafeAreaView, ScrollView, View, Text,
  Image, StatusBar,
} from 'react-native'

import StyleConfig from 'src/helper/StyleConfig'
import * as SecureStore from 'expo-secure-store'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { CommonActions } from '@react-navigation/native'
import * as Const from 'src/helper/constant'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import strings from 'src/helper/strings'
import styles from 'src/helper/styles'
import ApiManager from 'src/apiManager'
import imgEdit from '../../assets/images/edit.png'
import imgCheck from '../../assets/images/check.png'

const TextInputWrap = ({ children }) =>
  <View style={[styles.textInputWrap, { width: '90%', margin: StyleConfig.countPixelRatio(8) }]}>
    {children}
  </View>

class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      mobileNumber: '',
      name: '',
      email: '',
      isEditable: false
    }
  }

  componentDidMount = async () => {
    let response = await ApiManager.getUserProfile(Const.STATIC_USER)
    if (response.hasOwnProperty("data")) {
      this.setState({ data: response.data, mobileNumber: response.data.id, name: `${response.data.firstname} ${response.data.lastname}`, email: response.data.email });
    }
  }

  _onLogout = async () => {
    await SecureStore.deleteItemAsync(Const.SS_IS_LOGIN)
    await SecureStore.deleteItemAsync(Const.SS_IS_VENDOR)
    this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Const.NK_INIT }] }))
  }

  _onPressSubmit = () => {

  }

  _updateUserProfile = async () => {
    const { name, data, email } = this.state
    let isLNameExist = name.includes(' ')
    let fName = isLNameExist ? name.split(' ')[0] : name
    let lName = isLNameExist ? name.split(' ')[1] : ''

    let updatedData = {
      "email": email,
      "firstname": fName,
      "initials": "ASE",
      "lastname": lName,
      "type": 1
    }
    let response = await ApiManager.postUpdateProfile(data.id, updatedData)
    this.setState({ isEditable: false })
  }

  render() {
    const { isEditable } = this.state
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.headerWrap}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}
              style={styles.backWrap}>
              <FontAwesome name={Const.IC_BACK} color={StyleConfig.COLORS.defaultTextColor} size={StyleConfig.headerIconSize} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{strings.profile}</Text>
            <TouchableOpacity style={styles.backWrap} onPress={() => this.setState({ isEditable: isEditable ? this._updateUserProfile() : !isEditable })}>
              <Image source={isEditable ? imgCheck : imgEdit} style={{ height: 22, width: 22 }} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={{ alignItems: 'center' }}>
              <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDiuCkLScaAeFQHMWamLQ6IaJK56YlNJFB4A&usqp=CAU" }}
                style={{ height: 120, width: 120, marginVertical: 10, borderRadius: 60 }} />

              {isEditable ? this.renderProfileEditableView() : this.renderReadOnlyView()}

            </View>
            {!isEditable && <TouchableOpacity
              onPress={this._onLogout}
              style={[styles.cardRow, { paddingHorizontal: StyleConfig.countPixelRatio(12), paddingVertical: 12 }]}>
              <Text style={styles.headerTitle}>Logout</Text>
            </TouchableOpacity>}

          </ScrollView>
        </SafeAreaView>
      </>
    )
  }

  renderReadOnlyView = () => {
    const { data } = this.state
    return (
      <View style={{ alignItems: 'center', }}>
        <Text style={styles.headerTitle}>{data.id ? `${data.id}` : ''}</Text>
        <Text style={styles.headerTitle}>{data.firstname ? `${data.firstname} ${data.lastname}` : ''}</Text>
        <Text style={styles.headerTitle}>{data.email ? `${data.email}` : ''}</Text>
      </View>
    )
  }

  renderProfileEditableView = () => {
    const { mobileNumber, name, email } = this.state
    return (
      <View style={{ width: '90%' }}>

        <TextInputWrap>
          <TextInput
            style={styles.textH3Regular}
            value={mobileNumber}
            onChangeText={(text) => this.setState({ mobileNumber: text })}
            placeholderTextColor={StyleConfig.COLORS.hintTextColor}
            placeholder={strings.enter_guest_group_name}
          />
        </TextInputWrap>

        <TextInputWrap>
          <TextInput
            style={styles.textH3Regular}
            value={name}
            onChangeText={(text) => this.setState({ name: text })}
            placeholderTextColor={StyleConfig.COLORS.hintTextColor}
            placeholder={strings.enter_guest_group_name}
          />
        </TextInputWrap>

        <TextInputWrap>
          <TextInput
            style={styles.textH3Regular}
            value={email}
            onChangeText={(text) => this.setState({ email: text })}
            placeholderTextColor={StyleConfig.COLORS.hintTextColor}
            placeholder={strings.enter_guest_group_name}
          />
        </TextInputWrap>

      </View>
    )
  }
}
export default ProfileScreen;