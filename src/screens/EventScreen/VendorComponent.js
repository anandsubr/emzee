import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import StyleConfig from 'src/helper/StyleConfig';
import AppImages from 'src/assets/images';
import { Button } from 'src/components/common/Button';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import styles from 'src/helper/styles';
import strings from 'src/helper/strings';
import * as Const from 'src/helper/constant'
import { FlatList } from 'react-native-gesture-handler';

const VendorComponent = (props) => {
    const [phone, setPhone] = useState('');
    const [addNew, setIsNew] = useState(props.initial);
    const length = addNew ? 0 : props.vendors.length;
    return (
        <View style={styles.flex1}>
            { addNew ?
                <View style={styles.card}>
                    <Text style={styles.textH3Regular}>{strings.we_want_your_party_to_be_stressfree_and_painless_lets_add_everyone_who_is_going_to_serve_at_the_event_cateres_photographers_etc}</Text>
                    <View style={[styles.textInputWrap, { width: null, margin: StyleConfig.countPixelRatio(8) }]}>
                        <TextInput
                            style={styles.textH3Regular}
                            placeholderTextColor={StyleConfig.COLORS.hintTextColor}
                            placeholder={strings.placeholder_service_provider}
                        />
                    </View>

                    <View style={[styles.textInputWrap, { width: null, margin: StyleConfig.countPixelRatio(8) }]}>
                        <TextInput
                            style={styles.textH3Regular}
                            placeholderTextColor={StyleConfig.COLORS.hintTextColor}
                            placeholder={strings.placeholder_title_vendor}
                        />
                    </View>

                    <View style={[styles.textInputWrap, { width: null, margin: StyleConfig.countPixelRatio(8) }]}>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: Const.MASK_PHONE
                            }}
                            style={styles.textH3Regular}
                            placeholderTextColor={StyleConfig.COLORS.hintTextColor}
                            placeholder={strings.enter_phone_number}
                            value={phone}
                            onChangeText={phone => {
                                setPhone(phone)
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Button onPress={props.onSavePress} buttonWrap={{ width: StyleConfig.width * 0.25, minHeight: StyleConfig.countPixelRatio(36) }}>Invite</Button>
                    </View>
                </View> :
                <FlatList
                    data={props.vendors}
                    extraData={props}
                    contentContainerStyle={ styles.card}
                    keyExtractor={(item) => `vendor${item.id}`}
                    renderItem={({ item, index }) => <View style={{ flexDirection: 'row', borderBottomColor: StyleConfig.COLORS.headerBorderColor, borderBottomWidth: length == index+1 && !props.hostOfTheEvent ? 0 : 1, alignItems: 'center', paddingVertical: StyleConfig.countPixelRatio(8) }}>
                        <FontAwesome name={item.type == 2 ? "check-circle" : item.status == -1 ? "times-circle" : "question-circle"}
                            size={StyleConfig.countPixelRatio(24)}
                            color={item.type == 2 ? StyleConfig.COLORS.lightGreen : item.status == -1 ? StyleConfig.COLORS.lightRed : StyleConfig.COLORS.lightYellow} />
                        <View style={{ width: StyleConfig.countPixelRatio(6) }} />
                        <Text style={styles.textH23Medium}>{`${item.data.firstname} ${item.data.lastname}`}</Text>
                    </View>}
                    ListFooterComponent={() => {

                        return props.isVendor ? null : (props.hostOfTheEvent ? <TouchableOpacity onPress={props.onAddNewPress} style={[styles.center, {
                            marginVertical: StyleConfig.countPixelRatio(8),
                            paddingVertical: StyleConfig.countPixelRatio(8),
                            borderWidth: 1,
                            borderColor: StyleConfig.COLORS.purple,
                            borderRadius: StyleConfig.countPixelRatio(8),
                            borderStyle: 'dashed',
                        }]} >
                            <Text style={[styles.textH23Medium, { color: StyleConfig.COLORS.purple }]}>{'Invite another vendor'}</Text>
                            <FontAwesome name={"plus-square-o"} color={StyleConfig.COLORS.purple} size={StyleConfig.headerIconSize * 1.5} />
                        </TouchableOpacity> : null)

                    }}

                    />
            }
        </View>
    )
}
module.exports = VendorComponent;

