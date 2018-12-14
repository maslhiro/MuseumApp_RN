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
import FastImage from 'react-native-fast-image'
import { rootRef, testRef } from "./../../config/FirebaseConfig";
import Icon from 'react-native-vector-icons/Ionicons'
import ic_image from "../../assets/ic_image.png";
import ic_checkin from "../../assets/ic_checkin.png";
import ic_label from "../../assets/ic_label.png";

// Du Lieu Test
const Type = [
  {
    key: "T000",
    des: "Mục Khác"
  },
  {
    key: "T001",
    des: "Tranh ảnh"
  },
  {
    key: "T002",
    des: "Thủ công mỹ nghệ"
  },
  {
    key: "T003",
    des: "Chiến tranh"
  },
]

const Museum = [
  {
    key: "BH01",
    des: "Bảo Tàng TP Hồ Chí Minh"
  },
  {
    key: "BH02",
    des: "Bảo Tàng Nhựt Vinh"
  },
  {
    key: "BH03",
    des: "Bảo Tàng Mỹ Thuật"
  }
]

class PostScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      txtTitle: "",
      txtDescription: "",
      linkImg: "",
      idType: "T001",
      idMuseum: "",
    };
  }

  onChangeText_Title = (text) => {
    this.setState({ txtTitle: text });
  }

  onChangeText_Description = (text) => {
    this.setState({
      txtDescription: text
    });
  }

  onValueChange_Type = (value) => {
    this.setState({
      idType: value
    })
  }

  onValueChange_Museum = (value) => {
    this.setState({
      idMuseum: value
    })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  onPost = () => {
    alert("Dang Post")
  }

  renderPicker_Item = (arr) => {
     return (arr.map(item=>{
       return(
        <Picker.Item
        key={item.key}
        label={item.des}
        value={item.key} />
       )
     }))
  }

  render() {
    let rightIcon_Header = <Icon name="md-checkmark" size={30} color="white" onPress={() => {this.onPost}} />

    return (

      <View style={styles.container}>
        <Header
          title="Đăng Hiện Vât"
          onPressLeftIcon={() => this.goBack()}
          showLeftIcon={true}
          rightIcon={rightIcon_Header} />

        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg' }}
          style={styles.infoContainer}>
          <View style={styles.overlayContainer}>
            <View style={{ flex: 1, backgroundColor: 'green' }}>
                <FastImage
                  style={{flex:1}}
                  source={{uri:"https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0"}}
                  resizeMode={FastImage.resizeMode.cover}
                  />
              
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
              <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
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
                  <Text style={{fontSize:15}}> Loại : </Text>
                  <Picker
                    mode='dialog'
                    selectedValue={this.state.idType}
                    style={{ height: 50, width: 150, alignSelf: 'center' }}
                    onValueChange={(itemValue, itemIndex) => this.onValueChange_Type(itemValue)}>
                    {this.renderPicker_Item(Type)}

                  </Picker>
                </View>

                <View style={styles.pickerContainer}>
                  <Text style={styles.text}> Bảo Tàng : </Text>
                  <Picker
                    mode='dialog'
                    selectedValue={this.state.idMuseum}
                    style={{ height: 50, width: 180, alignSelf: 'center' }}
                    onValueChange={(itemValue, itemIndex) => this.onValueChange_Type(itemValue)}>
                      {this.renderPicker_Item(Museum)}
                  </Picker>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.touchPhotoContainer}>
              <TouchableOpacity
                style={styles.touchPhoto}
                activeOpacity={0.8}
                onPress={() => { }} >
                <Icon name="md-add" size={30} color="white" />
              </TouchableOpacity>

            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default PostScreen 