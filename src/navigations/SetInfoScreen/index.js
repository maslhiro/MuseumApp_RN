import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import firebase, { firestore } from "react-native-firebase";
import { FirebaseAuth, profileRef } from "./../../config/FirebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import avtSample from "../../assets/SignIn/img_MuseumBurned.png";

export default class SetInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: ""
    };
  }

  goBack = () => {
    FirebaseAuth.signOut();
    this.props.navigation.push("Home");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon
            name={"ios-arrow-round-back"}
            size={56}
            color="#ffffff"
            style={{ marginLeft: 10 }}
            onPress={() => {
              //this.goBack();
            }}
          />
          <Text style={styles.logoText}>Thiết lập thông tin</Text>
        </View>
        <View style={styles.setInfoView}>
          <View style={styles.textContainer}>
            <View style={styles.textView}>
              <Text style={styles.getNameText}>Vui lòng nhập tên của bạn:</Text>
            </View>
            <TextInput
              style={styles.getNameInputText}
              keyboardType="default"
              placeholder={"Tên tôi là..."}
              autoCapitalize="none"
              multiline={false}
              placeholderTextColor={`rgba(110, 110, 110, 0.6)`}
              underlineColorAndroid="transparent"
              onChangeText={text => {
                this.setState({ txtName: text });
              }}
            />
          </View>
          <View style={styles.chooseAvtContainer}>
            <Image source={avtSample} style={{ width: 150, height: 150 }} />
            <TouchableOpacity style={styles.chooseAvtTextView}>
              <Text style={{ color: `rgba(0,0,0,0.8)`, fontSize: 14, fontWeight: '400' }}>
                Chọn ảnh đại diện
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
