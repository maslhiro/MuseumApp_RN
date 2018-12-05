import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import firebase, { firestore } from "react-native-firebase";
import {
  FirebaseAuth,
  profileRef,
  rootRefStorage,
  AvatarsRefStorage
} from "./../../config/FirebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import avtSample from "../../assets/SignIn/img_MuseumBurned.png";
import ImagePicker from "react-native-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";

export default class SetInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      txtName: "",
      sourceAvt: avtSample,
      uriAvt: "",
      linkAvt: "",
      uid: FirebaseAuth.currentUser.uid
    };
  }

  goBack = () => {
    FirebaseAuth.signOut();
    this.props.navigation.push("Home");
  };

  onChoosePhoto = () => {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        const uri = response.uri;
        this.setState({ sourceAvt: source, uriAvt: uri });
      }
    });
  };

  onFinish = () => {
    if (this.checkCompleted()) {
      let fileUpload = AvatarsRefStorage.child(this.state.uid + ".jpg");
      fileUpload.putFile(this.state.uriAvt).then(snapshot => {
        this.setState({ linkAvt: snapshot.downloadURL });
        this.setupInfoUser();
      });
    }
  };

  setupInfoUser = () => {
    profileRef.child(this.state.uid).set(
      {
        uid: this.state.uid,
        name: this.state.txtName,
        urlAvatar: this.state.linkAvt
      },
      (error) =>{
        if (error) {
          console.log("failed to setup");
        } else {
          console.log("successful for user");
          this.props.navigation.push("Home");
        }
      }
    );
  };

  checkCompleted = () => {
    if (this.state.txtName.length < 3) {
      Alert.alert(
        "Lỗi",
        "Tên không hợp lệ!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return false;
    }
    if (this.state.uriAvt == "") {
      Alert.alert(
        "Lỗi",
        "Vui lòng chọn ảnh đại diện!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return false;
    }
    return true;
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
              this.goBack();
            }}
          />
          <Text style={styles.logoText}>Thiết lập thông tin</Text>
          <Text
            style={styles.finishText}
            onPress={() => {
              this.setState({ showAlert: true });
              this.onFinish();
            }}
          >
            HOÀN THÀNH
          </Text>
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
            <Image
              source={this.state.sourceAvt}
              style={{ width: 150, height: 150 }}
            />
            <TouchableOpacity
              style={styles.chooseAvtTextView}
              onPress={this.onChoosePhoto}
            >
              <Text
                style={{
                  color: `rgba(0,0,0,0.8)`,
                  fontSize: 14,
                  fontWeight: "400"
                }}
              >
                Chọn ảnh đại diện
              </Text>
            </TouchableOpacity>
          </View>
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={true}
            title="Đang xử lý"
            message="Vui lòng đợi..."
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={false}
          />
        </View>
      </View>
    );
  }
}
