import React, { Component } from "react";
import {
  Text,
  View,
  Picker,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import styles from "./styles.js";
import Header from "../../components/Header";
import FastImage from "react-native-fast-image";
import {
  rootRef,
  typesRef,
  museumsRef,
  objectsRef,
  FirebaseAuth,
  rootRefStorage,
  TempRefStorage,
  UserUpdateRefStorage
} from "./../../config/FirebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import ic_image from "../../assets/ic_image.png";
import ic_checkin from "../../assets/ic_checkin.png";
import ic_label from "../../assets/ic_label.png";
import ImagePicker from "react-native-image-picker";

class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      txtTitle: "",
      txtDescription: "",
      uriImg: "",
      linkImg: "",
      idType: "T001",
      idMuseum: "",
      feature: "0",
      listType: [],
      listMuseum: [],
      isSignedIn: false,
      tmpPhoto:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0"
    };
  }

  onChangeText_Title = text => {
    this.setState({ txtTitle: text });
  };

  onChangeText_Description = text => {
    this.setState({
      txtDescription: text
    });
  };

  onValueChange_Type = value => {
    this.setState({
      idType: value
    });
  };

  onValueChange_Museum = value => {
    this.setState({
      idMuseum: value
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  onPost = () => {
    var idObject = objectsRef.push().id;
    objectsRef.child(idObject).set(
      {
        idObject: idObject,
        idMuseum: this.setState.idMuseum,
        name: this.state.txtTitle,
        idType: this.state.idType,
        description: this.state.txtDescription,
        linkImg: this.state.linkImg,
        isActivated: "false"
      },
      function(error) {
        if (error) {
          alert("Post bài thất bại. Vui lòng thử lại.")
          console.log("Post failed");
        } else {
          alert("Thao tác thành công!")
          console.log(`successful for object ${idObject}`);
          this.props.navigation.push("Home");
        }
      }
    );
  };

  onChoosePhoto = () => {
    const options = {
      title: "Select Photo",
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
        let tmpUpdate = TempRefStorage.child(this.state.uid + ".jpg");
        tmpUpdate.putFile(uri).then(snapshot => {
          this.setState({ tmpPhoto: snapshot.downloadURL, uriImg: uri });
        });
      }
    });
  };

  logIn = () => {
    FirebaseAuth.signInWithEmailAndPassword("thuthoi@test.com", "123456")
      .then(() => {
        _uid = FirebaseAuth.currentUser.uid;
        alert("login successfully for " + _uid);
        this.setState({ isSignedIn: true, uid: _uid });
      })
      .catch(error => {
        this.setState({ showAlert: false });
        console.log("Login failed", error);
        alert("Log in failed");
      });
  };

  getDataType = () => {
    typesRef.on("value", child => {
      let arr = [];
      child.forEach(item => {
        arr.push({
          key: item.key,
          data: item.toJSON()
        });
      });
      this.setState(
        {
          listType: arr
        },
        () => console.log("Set type list successfully", this.state.listType)
      );
    });
  };

  getDataMuseum = () => {
    museumsRef.on("value", child => {
      let arr = [];
      child.forEach(item => {
        arr.push({
          key: item.key,
          data: item.toJSON()
        });
      });
      this.setState(
        {
          listMuseum: arr
        },
        () => console.log("Set museum list successfully", this.state.listMuseum)
      );
    });
  };

  componentDidMount() {
    this.getDataType();
    this.getDataMuseum();
  }

  render() {
    let rightIcon_Header = (
      <Icon
        name="md-checkmark"
        size={30}
        color="white"
        onPress={() => {
          this.onPost();
        }}
      />
    );
    if (!this.state.isSignedIn) {
      this.logIn();
    }
    console.log("ListMuseum " + this.setState.listMuseum);
    return (
      <View style={styles.container}>
        <Header
          title="Đăng Hiện Vât"
          onPressLeftIcon={() => this.goBack()}
          showLeftIcon={true}
          rightIcon={rightIcon_Header}
        />

        <ImageBackground
          source={{
            uri:
              "https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg"
          }}
          style={styles.infoContainer}
        >
          <View style={styles.overlayContainer}>
            <View style={{ flex: 1, backgroundColor: "green" }}>
              <FastImage
                style={{ flex: 1 }}
                source={{
                  uri: this.state.tmpPhoto
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "center"
                }}
              >
                <TextInput
                  style={styles.titleInputText}
                  placeholder={"Tên Hiện Vật"}
                  autoCorrect={false}
                  placeholderTextColor="#679186"
                  underlineColorAndroid="#679186"
                  onChangeText={text => this.onChangeText_Title(text)}
                />
                <TextInput
                  style={styles.descriptionInputText}
                  placeholder={"Nội dung miêu tả"}
                  autoCorrect={false}
                  multiline={true}
                  placeholderTextColor="#679186"
                  underlineColorAndroid="#679186"
                  onChangeText={text => this.onChangeText_Description(text)}
                />

                <View style={styles.pickerContainer}>
                  <Text style={{ fontSize: 15 }}> Loại : </Text>
                  <Picker
                    mode="dialog"
                    selectedValue={this.state.idType}
                    style={{ height: 50, width: 150, alignSelf: "center" }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onValueChange_Type(itemValue)
                    }
                  >
                    {this.state.listType.map(item => {
                      return (
                        <Picker.Item
                          key={item.key}
                          label={item.data}
                          value={item.key}
                        />
                      );
                    })}
                  </Picker>
                </View>

                <View style={styles.pickerContainer}>
                  <Text style={styles.text}> Bảo Tàng : </Text>
                  <Picker
                    mode="dialog"
                    selectedValue={this.state.idMuseum}
                    style={{ height: 50, width: 180, alignSelf: "center" }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onValueChange_Type(itemValue)
                    }
                  >
                    {this.state.listMuseum.map(item => {
                      return (
                        <Picker.Item
                          key={item.key}
                          label={item.data}
                          value={item.key}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            </ScrollView>

            <View style={styles.touchPhotoContainer}>
              <TouchableOpacity
                style={styles.touchPhoto}
                activeOpacity={0.8}
                onPress={() => {
                  this.onChoosePhoto();
                }}
              >
                <Icon name="md-add" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default PostScreen;
