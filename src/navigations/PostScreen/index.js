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
import { objectsRef, UserUpdateRefStorage , TempRefStorage} from "./../../config/FirebaseConfig";
import Icon from 'react-native-vector-icons/Ionicons'
import AwesomeAlert from "react-native-awesome-alerts";
import img_Background from '../../assets/img_Background.jpg'
import AppContainer from '../../container'
import { Provider, Subscribe, Container } from 'unstated';
import ImagePicker from "react-native-image-picker";

const defaultUri = "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0"

class PostScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : false,
      showAlert : 0,
      errCode : "",
      txtTitle: "",
      txtDescription: "",
      linkImg: "",
      errTitle : false,
      uriImg : defaultUri,
      // idType: this.props.navigation.getParam("idType") ? this.props.navigation.getParam("idType") : "",
      // idMuseum: this.props.navigation.getParam("idMuseum") ? this.props.navigation.getParam("idMuseum") : "",
      idType:"T007",
      idMuseum:"M001"
    };
  }

  onChoose_Photo = () => {
    console.log("PHoto")
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
        let uri = response.uri;
        this.setState({isLoading :true},()=>this.upLoad_Image(uri))
      }
    });
  };

  upLoad_Image = (uri) => {
    let fileUpload = UserUpdateRefStorage.child(this.state.uid + ".jpg");
    fileUpload.putFile(uri).then(snapshot => {
      this.setState({ 
        isLoading: false,
        uriImg : uri,
        linkImg: snapshot.downloadURL,
      })
    }).catch((err)=>{
        this.setState({
          showAlert: 3,
          isLoading: false,
          errCode : err.message
        })
        console.log("Upload Image",err)
    })
  }

  onChangeText_Title = (text) => {
    this.setState({ txtTitle: text }, () => console.log("Value Change", this.state));
  }

  onChangeText_Description = (text) => {
    this.setState({
      txtDescription: text
    });
  }

  onValueChange_Type = (value) => {
    this.setState({
      idType: value
    }, () => console.log("Value Change", this.state))
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
    let _idObject = objectsRef.push().key;
    objectsRef.child(_idObject).set(
      {
        idObject: _idObject,
        idMuseum: this.state.idMuseum,
        idType: this.state.idType,
        name: this.state.txtTitle,
        description: this.state.txtDescription,
        linkImg: this.state.linkImg,
        isActivated: "true"
      },
      (error) => {
        if (error) {
          //objectsRef.child(_idObject).remove();
          console.log("Error Post",error)
          this.setState({
            isLoading:false,
            showAlert : 3,
            errCode : error.message
          })
        } else {
          this.setState({
            isLoading:false,
            showAlert : 1,
          })
        }
      }
    );

  }

  renderPicker_Item = (arr) => {
    return (arr.map(item => {
      return (
        <Picker.Item
          key={item.key}
          label={item.des}
          value={item.key} />
      )
    }))
  }

  renderAlert = (container) => {
    switch(this.state.showAlert)
    {
      case 0 :{
        return null
        break
      }
      case 1 : {
        return(
          <AwesomeAlert
            show={true}
            title="Chúc mừng !"
            message="Bạn đã đăng hiện vật thành công ^^"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={()=>{
              this.props.navigation.push('Home')
            }}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
          />
          )
        break
      }
      case 2: {
        return (
            <AwesomeAlert
              show={true}
              title="Opps !"
              message="Bạn chưa chọn ảnh"
              confirmText=" OK "
              closeOnTouchOutside={false}
              onConfirmPressed={()=>this.setState({showAlert:0})}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
            />
        )
        break
      } 
      case 3: {
        return (
            <AwesomeAlert
              show={true}
              title="Opps!"
              message={this.state.errCode}
              confirmText=" OK "
              closeOnTouchOutside={false}
              onConfirmPressed={()=>this.setState({showAlert:0})}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
            />
        )
        break
      }
      default: {
        return null
      }
    }


  }

  checkCompleted = () => {
    if ( this.state.txtTitle===""|| this.state.uriImg==defaultUri) 
    {
        this.setState({
          errTitle: !this.state.txtTitle,
          showAlert: this.state.uriImg==defaultUri?2:0
        })  
    }
    else 
    {
     
      this.setState(
        {
          errTitle: false,
          showAlert:0,
          isLoading: true
        }, () => {
          this.onPost()
           // Test 
          // setTimeout(()=>{
          //     this.setState({
          //       isLoading:false,
          //       showAlert:2,
          //     })
          // },3000)
        })
        
    }
  };

  render() {
    let rightIcon_Header = <Icon name="md-checkmark" size={30} color="white" />

    return (

      <View style={styles.container}>
        <Header
          title="Đăng Hiện Vât"
          onPressLeftIcon={() => this.goBack()}
          onPressRightIcon={() => this.checkCompleted()}
          showLeftIcon={true}
          rightIcon={rightIcon_Header} />

        <ImageBackground
          source={img_Background}
          style={styles.infoContainer}>
          <ScrollView style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.overlayContainer}>
              <View style={{ flex: 1, backgroundColor: 'green' }}>
                <FastImage
                  style={{ flex: 1 }}
                  source={{ uri: this.state.uriImg }}
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
                  {this.state.errTitle?
                  <Text style={{  color:'red',fontSize:14,marginHorizontal: 25,}}> *Tên hiện vật không được để trống</Text>:null}
                  <TextInput
                    style={styles.descriptionInputText}
                    placeholder={"Nội dung miêu tả"}
                    autoCorrect={false}
                    multiline={true}
                    placeholderTextColor="#679186"
                    underlineColorAndroid="#679186"
                    onChangeText={text => this.onChangeText_Description(text)}
                  />
                  <Subscribe to={[AppContainer]}>
                    {container =>
                      <View style={styles.pickerContainer}>
                        <Text style={{ fontSize: 15 }}> Loại : </Text>
                        <Picker
                          mode='dialog'
                          selectedValue={this.state.idType}
                          style={{ height: 50, width: 150, alignSelf: 'center' }}
                          onValueChange={(itemValue, itemIndex) => this.onValueChange_Type(itemValue)}>
                          {this.renderPicker_Item(container.getAppState().arrType)}

                        </Picker>
                      </View>
                    }
                  </Subscribe>

                  <Subscribe to={[AppContainer]}>
                    {container =>
                      <View style={styles.pickerContainer}>
                        <Text style={styles.text}> Bảo Tàng : </Text>
                        <Picker
                          mode='dialog'
                          selectedValue={this.state.idMuseum}
                          style={{ height: 50, width: 180, alignSelf: 'center' }}
                          onValueChange={(itemValue, itemIndex) => this.onValueChange_Museum(itemValue)}>
                          {this.renderPicker_Item(container.getAppState().arrMuseum)}
                        </Picker>
                      </View>
                    }
                  </Subscribe>
                </View>
              </ScrollView>
              
             
                <View style={styles.touchPhotoContainer}>
                  <TouchableOpacity
                    style={styles.touchPhoto}
                    activeOpacity={0.8}
                    onPress={()=>this.onChoose_Photo()}>
                    <Icon name="md-add" size={30} color="white" />
                  </TouchableOpacity>
                </View>

            
            </View>
          </ScrollView>
        </ImageBackground>
        <AwesomeAlert
            show={this.state.isLoading}
            showProgress={true}
            title="Đang tải"
            message="Bạn chờ tí nhé ^^"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
          />
          <Subscribe to={[AppContainer]}>
          {container =>
              this.renderAlert(container)
          }   
          </Subscribe>
      </View>
    );
  }
}

export default PostScreen 