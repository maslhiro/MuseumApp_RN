import React, { PureComponent } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView
} from "react-native";
import styles from "./styles";

import {
  profileRef,
  AvatarsRefStorage,
} from "./../../config/FirebaseConfig";
import img_Background from '../../assets/img_Background.jpg'
import Header from '../../components/Header'
import ImagePicker from "react-native-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import FastImage from 'react-native-fast-image'
import {
  Subscribe,
} from 'unstated';
import AppContainer from '../../container'
const defaultUri = "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0"

class SetInfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state =
      {
        isLoading: false,
        showAlert: 0, // 1 - Empty Uri // 2 - Loi
        txtName: "",
        errName: false,
        uriAvt:defaultUri , 
        linkAva: "",
        errCode :'',
        // uid: "KpgrDjw0IJWc3fUaZ2VmiG2mySJ3"
       uid : this.props.navigation.getParam("uid")?this.props.navigation.getParam("uid"):""
      };
  }
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
        this.setState({isLoading:true},()=>this.upLoad_Image(uri))
      }
    });
  };

  upLoad_Image = (uri) => {
      let fileUpload = AvatarsRefStorage.child(this.state.uid + ".jpg");
      fileUpload.putFile(uri).then(snapshot => {
        this.setState({ 
          isLoading: false,
          uriAvt : uri,
          linkAva: snapshot.downloadURL,
        })
      }).catch((err)=>{
          this.setState({
            showAlert: 3,
            isLoading: false,
            errCode : err.message
          })
          console.log(err)
      })
    }


  setupInfoUser = () => {
    profileRef.child(this.state.uid).set(
      {
        uid: this.state.uid,
        name: this.state.txtName,
        urlAvatar: this.state.linkAva
      },
      (error) => {
        if (error) {
          this.setState(
            {
              isLoading: false,
              showAlert : 3,
              errCode : error.message
            }
          )
          console.log("failed to setup",error);
        } else {


          this.setState(
            {
              isLoading: false,
              showAlert:1
            })
        }
      }
    );
  };

  checkCompleted = () => {
    if ( this.state.txtName==="" || this.state.uriAvt==defaultUri) 
    {
        this.setState({
          errName: !this.state.txtName,
          showAlert: !this.state.txtPassword?2:0
        })  
    }
    else 
    {
     
      this.setState(
        {
          errEmail: false,
          showAlert:0,
          isLoading: true
        }, () => {
          this.setupInfoUser()
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

  onChangeText_Name = (text) => {
    this.setState({ txtName: text });
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
            message="Bạn đã đăng kí thành công ^^"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={()=>{
              // navigate HomeScreen
              if(container.setInfo_User(this.state.uid,this.state.linkAva))
              {
                this.setState({showAlert:0},()=>this.props.navigation.push('Home',{linkAva:this.state.linkAva}))
              }
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

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Tạo Tài Khoản"
          showLeftIcon = {false}
        />
        <View style={{ flex: 1, backgroundColor: 'blue', }} >
          <ScrollView
            showsVerticalScrollIndicator={false} >
            <ImageBackground
              source={img_Background}
              style={styles.infoContainer}>
              <Subscribe to={[AppContainer]}>
              {container =>
                <View style={styles.overlayContainer}>
                <View style={{ flexDirection: 'row',marginVertical: 20}}>
                  <View style={{ flex: 1 ,  backgroundColor: 'transparent', alignItems:'flex-start' , justifyContent:'center'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, color:'white' }}> Đăng Kí</Text>
                  </View>
                  <View style={{ flex: 1 , alignItems:'flex-end' , justifyContent:'center'}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 28, color:'white' }}>  Bước 2/2</Text>
                  </View>
                </View>
                <View style={styles.overlayContainer_01}>
                  <View style={styles.chooseAvtContainer}>
                    <FastImage
                      source={{ uri: this.state.uriAvt }}
                      style={{ width: 100, height: 100 }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <View>
                      <TouchableOpacity onPress={() => this.onChoosePhoto()}>
                        <Text style={{ fontSize: 15, color: 'black' }}> Upload Ảnh </Text>
                        <View style={{ height: 1, backgroundColor: '#679186' }} />
                      </TouchableOpacity>
                    </View>

                  </View>
                  <View style={{ padding: 5, margin: 5 }}>
                    <Text style={styles.text}>Tên bạn :</Text>
                    {this.state.errName?<Text style={styles.textErrStyle}> *Tên không được để trống</Text>:null}
                    <TextInput
                      style={styles.textInputNameUser}
                      autoCorrect={false}
                      placeholderTextColor='black'
                      underlineColorAndroid='black'
                      onChangeText={(text) => this.onChangeText_Name(text)}
                    />

                  </View>
                </View>

                <TouchableOpacity
                  style={styles.touchView}
                  onPress={() => this.checkCompleted()}>
                  <Text style={styles.textTouch}> Upload </Text>
                </TouchableOpacity>

                <AwesomeAlert
                  show={this.state.isLoading}
                  showProgress={true}
                  title="Đang tải"
                  message="Vui Bạn chờ tí nhé ^^"
                  closeOnTouchOutside={false}
                  closeOnHardwareBackPress={false}
                />
               
                {this.renderAlert(container)}
               
              </View>
              }
              </Subscribe>

            </ImageBackground>
          </ScrollView>

        </View>
      </View>
    );
  }
}

export default SetInfoScreen 