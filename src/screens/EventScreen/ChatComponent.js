import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ImageBackground
} from 'react-native';

import StyleConfig from 'src/helper/StyleConfig';
import AppImages from 'src/assets/images';
import { FontAwesome } from '@expo/vector-icons';
import styles from 'src/helper/styles';
import { Component } from 'react';
import strings from 'src/helper/strings';
import * as ImagePicker from 'expo-image-picker';
import * as Const from 'src/helper/constant';
import ApiManager from 'src/apiManager';
import moment from 'moment';

import SelectPhotoTypeModal from 'src/components/SelectPhotoTypeModal';
const USER_ID = 50
const EVENT_ID = "JxAg9zgiNQBHXH8Mk0m0";
const USER_ID2 = "EGDtaROorlajrAOb9dmv";
class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [{
        uri: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png',
        text: 'asd',
        createdByUserId: 'EGDtaROorlajrAOb9dm'
      },
      {
        uri: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png',
        text: 'asdd',
        createdByUserId: 'EGDtaROorlajrAOb9dmv'
      }],
      currMessage: '',
      showSelectMediaModal: false,
      event: props.event
    }
  }
  componentDidMount = async () => {
    const { event } = this.state
    //getMessages
    let messages = await ApiManager.getMessages(event.id)

    //console.log("compoentDidMount Chat messages", messages)
    // this.setState({ chats: messages })
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 5],
      quality: 1,
    });
    this.setState({ showSelectMediaModal: false })
    if (!result.cancelled) {
      this.addPhoto(result.uri)
    }

  };
  previewPhoto = (item) => {
    this.props.navigation.navigate(Const.NK_PREVIEW_PHOTO, { photoUri: item.uri })
  }
  addPhoto = (photoUri) => {
    let { chats } = this.state
    chats = [{ message: null, userId: chats.length % 2 == 0 ? 50 : 0, uri: photoUri, type: "photo" }, ...chats]
    this.setState({ chats })
  }
  sentMessage = async () => {
    const TO_USER_ID = "EGDtaROorlajrAOb9dmv";
    let createdDate = moment(new Date()).format("DD-MM-YYYY")
    const { currMessage } = this.state;
    const { event } = this.props;
    let data = {
      "text": currMessage,
      "createdByUserId": USER_ID2,
      "createdDateTime": createdDate,
      "toUserId": TO_USER_ID
    }
    console.log({ data })
    let messages = await ApiManager.postMessage(event.id, data)
    console.log("sentMessage Chat messages", messages)
    //this.setState({chats:messages})
  }
  render() {
    const { showSelectMediaModal } = this.state;
    return (
      <View style={[styles.flex1]}>
        <ImageBackground
          source={AppImages.chatBack}
          style={{ flex: 1, width: StyleConfig.width }}>
          <View style={[styles.flex1, { backgroundColor: "#ffffffaa" }]} >
            <View style={[styles.flex1]}>
              <FlatList
                data={this.state.chats}
                inverted
                keyExtractor={(item, index) => `chat${index}`}
                renderItem={({ item }) => {
                  console.log("uri-", item.uri)

                  let sendByMe = item.createdByUserId == USER_ID2;
                  return (
                    <View style={{ flexDirection: sendByMe ? 'row-reverse' : "row", paddingHorizontal: StyleConfig.countPixelRatio(8), marginTop: StyleConfig.countPixelRatio(8) }}>
                      <Image
                        source={{ uri: sendByMe ? "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png" : "https://icon-library.com/images/lady-icon/lady-icon-7.jpg" }}
                        style={styles.chatProfilePhoto}
                      />
                      {item.type == "photo" ?
                        <View style={[styles.cardRow, { padding: StyleConfig.countPixelRatio(2) }]}>
                          <Image
                            source={{ uri: item.uri }}
                            style={{ width: StyleConfig.width * 0.7, height: StyleConfig.width * 0.7 }}
                          />
                        </View>
                        :
                        <View style={styles.cardRow}>
                          <Text style={styles.textH3Regular}>{item.text}</Text>
                        </View>
                      }

                    </View>

                  )
                }}
              />
            </View>
            <View style={[styles.cardRow, { alignItems: 'center', width: StyleConfig.width - StyleConfig.countPixelRatio(32), marginHorizontal: StyleConfig.countPixelRatio(16), borderRadius: StyleConfig.countPixelRatio(30) }]}>
              <FontAwesome
                onPress={() => this.setState({ showSelectMediaModal: true })}
                color={StyleConfig.COLORS.defaultTextColor}
                style={{ paddingHorizontal: 8 }}
                name="paperclip" size={StyleConfig.countPixelRatio(22)}
              />
              <View style={styles.flex1}>
                <TextInput
                  style={styles.textH23Medium}
                  placeholder={strings.type_a_message}
                  multiline={true}
                  value={this.state.currMessage}
                  onChangeText={(currMessage) => this.setState({ currMessage })}
                />
              </View>
              <FontAwesome
                onPress={this.sentMessage}
                // onPress={() => {
                //     let { chats, currMessage } = this.state;
                //     chats = [{
                //         message: currMessage,
                //         userId: currMessage.toString().length % 2 ? 0 : 50
                //     }, ...chats]
                //     this.setState({ chats, currMessage: '' })
                // }}
                style={{ paddingHorizontal: 8 }}
                name="send" size={StyleConfig.countPixelRatio(30)} color={StyleConfig.COLORS.cyanBlue}
              />
            </View>
            <SelectPhotoTypeModal
              visible={showSelectMediaModal}
              onPressCamera={() => {
                this.setState({ showSelectMediaModal: false })
                this.props.navigation.navigate(Const.NK_ATTACH_IMAGE, { callback: this.addPhoto })
              }}
              onPressGallery={() => this.pickImage()}
              onCancel={() => this.setState({ showSelectMediaModal: !showSelectMediaModal })}
            />
          </View>
        </ImageBackground>
      </View>

    )
  }

}
export default ChatComponent;

