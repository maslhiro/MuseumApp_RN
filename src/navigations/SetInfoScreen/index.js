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
        linkAvt: "",
        uid: "FirebaseAuth.currentUser.uid"
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
        this.setState({ uriAvt: uri });
      }
    });
  };

  onFinish = () => {
    if (this.checkCompleted()) {
      let fileUpload = AvatarsRefStorage.child(this.state.uid + ".jpg");
      fileUpload.putFile(this.state.uriAvt).then(snapshot => {
        this.setState({ linkAvt: snapshot.downloadURL(), showAlert: true }, () =>
          this.setupInfoUser())
      }).catch((err)=>{
          console.log(err)
      })
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
          //this.setupInfoUsere()
           // Test 
          setTimeout(()=>{
              this.setState({
                isLoading:false,
                showAlert:2,
              })
          },3000)
        })
        
    }
  };

  onChangeText_Name = (text) => {
    this.setState({ txtName: text });
  }

  renderAlert = () => {
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
            title="Congratulation !"
            message="You've Successfully Signed Up ^^"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={()=>{
              // navigate HomeScreen
              this.setState({showAlert:0})
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
              message="Please Select Your Photo"
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
              message="Sôme Thing Went Wrong Please Try Again :<"
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
          title="Create Account"
        />
        <View style={{ flex: 1, backgroundColor: 'blue', }} >
          <ScrollView
            showsVerticalScrollIndicator={false} >
            <ImageBackground
              source={img_Background}
              style={styles.infoContainer}>

              <View style={styles.overlayContainer}>
                <View style={{ flexDirection: 'row',marginVertical: 20}}>
                  <View style={{ flex: 1 ,  backgroundColor: 'transparent', alignItems:'flex-start' , justifyContent:'center'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, color:'white' }}> Sign Up</Text>
                  </View>
                  <View style={{ flex: 1 , alignItems:'flex-end' , justifyContent:'center'}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 28, color:'white' }}>  2 of 2</Text>
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
                        <Text style={{ fontSize: 15, color: 'black' }}> Upload Image </Text>
                        <View style={{ height: 1, backgroundColor: '#679186' }} />
                      </TouchableOpacity>
                    </View>

                  </View>
                  <View style={{ padding: 5, margin: 5 }}>
                    <Text style={styles.text}>Your Name :</Text>
                    {this.state.errName?<Text style={styles.textErrStyle}> *Name can not be empty</Text>:null}
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
                  onPress={() => this.onFinish()}>
                  <Text style={styles.textTouch}> Next Step </Text>
                </TouchableOpacity>

                <AwesomeAlert
                  show={this.state.isLoading}
                  showProgress={true}
                  title="Loading"
                  message="Please wait..."
                  closeOnTouchOutside={false}
                  closeOnHardwareBackPress={false}
                />
                {this.renderAlert()}

              </View>

            </ImageBackground>
          </ScrollView>

        </View>
      </View>
    );
  }
}

export default SetInfoScreen 