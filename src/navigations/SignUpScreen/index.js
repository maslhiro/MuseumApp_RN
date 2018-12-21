import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './styles';
import img_Background from '../../assets/img_Background.jpg'
import Header from '../../components/Header'
import AwesomeAlert from "react-native-awesome-alerts";
import { FirebaseAuth } from '../../config/FirebaseConfig'

class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      txtEmail: '',
      txtPassword: '',
      showAlert:0,
      errEmail: false,
      errPassword: false,
    };
  }

  onChangeText_Pass = (text) => {
    this.setState(
      {
        txtPassword: text
      });
  }

  onChangeText_Email = (text) => {
    this.setState(
      {
        txtEmail: text
      });
  }

  checkData = () => {
    if ( this.state.txtEmail==="" || this.state.txtPassword==="") 
    {

        this.setState({
          errEmail: !this.state.txtEmail,
          errPassword: !this.state.txtPassword
        })  
    }
    else 
    {
     
      this.setState(
        {
          errEmail: false,
          errPassword:false,
          isLoading: true
        }, () => {
          // this.onSignIn()
           // Test 
          setTimeout(()=>{
              this.setState({
                isLoading:false,
                showAlert: 1
              })
          },3000)
        })
        
    }
  }

  onSignUp = () => {
    FirebaseAuth.createUserWithEmailAndPassword(this.state.txtEmail, this.state.txtPassword)
      .then(() => {
        this.setState({
          isLoading: false
        }, () =>
            Alert.alert(
              'Sign Up Successfully',
              'Chúc mừng bạn đã tạo tài khoản thành công',
              [
                {
                  text: 'OK', onPress: () => {
                    this.props.navigation.goBack()
                  }
                },
              ],
              { cancelable: false }
            ))
      }).catch((error) => {
        this.setState({
          isLoading: false
        })
        console.log(`Register fail `, error);
        alert(`Register fail with error: ${error}`)
      });
  }
  
  renderAlert = () => {
    switch(this.state.showAlert)
    {
      case 0 :{
        return null
        break
      }
      case 1: {
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
                <Text style={{ fontWeight: 'bold', fontSize: 28, color:'white' }}>  1 of 2</Text>
                </View>
              </View>
              <View style={styles.overlayContainer_01}>
                <View style={{ padding: 5, margin: 5 , }}>
                  <Text style={styles.text}>Email :</Text>
                  {this.state.errEmail?<Text style={styles.textErrStyle}> *Email can not be empty</Text>:null}
                  <TextInput
                    style={styles.textInputNameUser}
                    keyboardType='email-address'
                    autoCorrect={false}
                    placeholderTextColor='black'
                    underlineColorAndroid='black'
                    onChangeText={(text) => this.onChangeText_Email(text)}
                  />
                  <Text style={styles.text}>Password :</Text>
                  {this.state.errPassword?<Text style={styles.textErrStyle}> *Password can not be empty</Text>:null}
                  <TextInput
                    style={styles.textInputNameUser}
                    secureTextEntry={true}                    
                    autoCorrect={false}
                    placeholderTextColor='black'
                    underlineColorAndroid='black'
                    onChangeText={(text) => this.onChangeText_Pass(text)}
                  />

                </View>
              </View>

              <TouchableOpacity
                style={styles.touchView}
                onPress={() => this.checkData()}>
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


export default SignUpScreen