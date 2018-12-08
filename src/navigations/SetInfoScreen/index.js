import React, { PureComponent } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert
} from "react-native";
import styles from "./styles";

import {
  FirebaseAuth,
  profileRef,
  rootRefStorage,
  AvatarsRefStorage
} from "./../../config/FirebaseConfig";

import Header from '../../components/Header'
import Icon from "react-native-vector-icons/Ionicons";
import avtSample from "../../assets/SignIn/img_MuseumBurned.png";
import ImagePicker from "react-native-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import FastImage from 'react-native-fast-image'

class SetInfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      txtName: "",
      sourceAvt: avtSample,
      uriAvt: "",
      linkAvt: "",
      uid: "FirebaseAuth.currentUser.uid"
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
        let source = { uri: response.uri };
        let uri = response.uri;
        this.setState({ sourceAvt: source, uriAvt: uri });
      }
    });
  };

  onFinish = () => {
    if (this.checkCompleted()) {
      let fileUpload = AvatarsRefStorage.child(this.state.uid + ".jpg");
      fileUpload.putFile(this.state.uriAvt).then(snapshot => {
        this.setState({ linkAvt: snapshot.downloadURL, showAlert: true }, () =>
          this.setupInfoUser())
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
      (error) => {
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

  onChangeText_Name = (text) => {
    this.setState({ txtName: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          title="Cập Nhật Thông Tin"
          onPressLeftIcon={()=>this.goBack()}
          />

        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/originals/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg' }}
          style={styles.infoContainer}>
          <View style={styles.overlayContainer}>
            <View style={styles.overlayContainer_01}>
              <View style={styles.chooseAvtContainer}>
                <FastImage
                  source={{uri:"https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0"}}
                  style={{ width: 100, height: 100 }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View>
                <TouchableOpacity  onPress={()=>this.onChoosePhoto()}>
                  <Text style={{fontSize:15,color:'black'}}> Upload Ảnh </Text>
                  <View style={{height:1,backgroundColor:'#679186'}}/>
                </TouchableOpacity>
                </View>
              
              </View>
              <View style={{padding:5, margin :5}}>              
                <Text style={styles.text}>Nhâp Tên Bạn :</Text>
                <TextInput 
                    style={styles.textInputNameUser}   
                    placeholder="..."
                    autoCorrect={false}
                    placeholderTextColor='black'
                    underlineColorAndroid='black'
                    onChangeText={(text)=>this.onChangeText_Name(text)}
                />

              </View>
            </View>

            <TouchableOpacity 
              style={styles.touchView}
              onPress={()=>this.onFinish()}>
              <Text style={styles.textTouch}> Hoàn Thành </Text>
            </TouchableOpacity>
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={true}
              title="Đang xử lý"
              message="Vui lòng đợi..."
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default SetInfoScreen 