import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styles.js";
import Header from "../../components/Header";
import { rootRef, testRef } from "./../../config/FirebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import lgMuseum from "../../assets/SignIn/img_MuseumWhite.png";
import ic_image from "../../assets/ic_image.png";
import ic_checkin from "../../assets/ic_checkin.png";
import ic_label from "../../assets/ic_label.png";

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtTitle: "",
      txtDescription: "",
      linkImg: "",
      idtype: "",
      idMuseum: "",
      feature: "0"
    };
  }

  changeFeature = _feature => {
    this.setState({ feature: _feature });
  };

  renderFeature = () => {
    switch (this.state.feature) {
      case "0":
        return <View style={{ flex: 1, backgroundColor: "white" }} />;

      case "1":
        return <View style={{ flex: 1, backgroundColor: "red" }} />;
        break;
      case "2":
        return <View style={{ flex: 1, backgroundColor: "blue" }} />;
        break;
      case "3":
        return <View style={{ flex: 1, backgroundColor: "yellow" }} />;
        break;
    }
  };

  render() {
    return (
      <ScrollView style={{flex: 1,}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Icon
              name={"ios-arrow-round-back"}
              size={56}
              color="#ffffff"
              style={{ marginLeft: 10 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
            <View style={styles.logoContainer}>
              <Image source={lgMuseum} style={styles.logoStyle} />
              <Text style={styles.logoText}>VINDI MUSEUM</Text>
            </View>
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Text
                style={{ color: "#ffffff", fontSize: 14, textAlign: "center" }}
                onPress={() => {
                  infoPost =
                    "Title: " +
                    this.state.txtTitle +
                    "\nDescription: " +
                    this.state.txtDescription +
                    "\nType: " +
                    this.state.idtype +
                    "\nMuseum: " +
                    this.state.idMuseum +
                    "\nLink Image: " +
                    this.state.linkImg +
                    "\nFeature:" +
                    this.state.feature;
                  alert(infoPost);
                }}
              >
                Chia sẽ
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.postContainer}>
            <TextInput
              style={styles.titleInputText}
              keyboardType="default"
              placeholder={"Tiêu đề"}
              autoCapitalize="none"
              placeholderTextColor={`rgba(8, 8, 8, 0.6)`}
              underlineColorAndroid="transparent"
              onChangeText={text => {
                this.setState({ txtTitle: text });
              }}
            />
            <TextInput
              style={styles.descriptionInputText}
              keyboardType="default"
              placeholder={"Nội dung miêu tả"}
              autoCapitalize="none"
              multiline={true}
              placeholderTextColor={`rgba(110, 110, 110, 0.6)`}
              underlineColorAndroid="transparent"
              onChangeText={text => {
                this.setState({ txtDescription: text });
              }}
            />
          </View>
          <View style={styles.featureContainer}>
            <View style={styles.featuresView}>
              <TouchableOpacity
                style={styles.featuresButton}
                onPress={() => {
                  this.changeFeature("1");
                }}
              >
                <Image source={ic_image} style={styles.featuresIcon} />
                <Text style={styles.featuresText}>Thêm ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.featuresButton}
                onPress={() => {
                  this.changeFeature("2");
                }}
              >
                <Image source={ic_label} style={styles.featuresIcon} />
                <Text style={styles.featuresText}>Loại hiện vật</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.featuresButton}
                onPress={() => {
                  this.changeFeature("3");
                }}
              >
                <Image source={ic_checkin} style={styles.featuresIcon} />
                <Text style={styles.featuresText}>Bảo tàng</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.featureSide}>
            {this.renderFeature()}
          </View>
        </View>
      </ScrollView>
    );
  }
}
