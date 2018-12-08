import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './styles';
import bg_SignIn from '../../assets/SignIn/bg_SignIn.jpg';
import ic_MuseumBurned from '../../assets/SignIn/img_MuseumBurned.png';

import Icon from 'react-native-vector-icons/Ionicons';
import { FirebaseAuth } from '../../config/FirebaseConfig'

class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: false, // bien de spiner xoay xoay khi fetch du lieu
      hidePass: true,
      txtEmail: '',
      txtPassword: '',

      errEmail: false,
      errPassword: false,

      user: null,
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


  onPress_Hide_Pass = () => {
    this.setState(
      {
        hidePass: !this.state.hidePass
      }
    )
  }

  checkData = () => {
    if (
      this.state.txtEmail ||
      this.state.txtPassword) {
      this.setState(
        {
          isLoading: true
        }, () => this.onSignUp())
    }
    else {
      Alert.alert("Thông Báo", " Nhâp Đầy Đủ THông TIn")
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
              'Chúc mừng bạn đã tạo tài khoản  thành công',
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

  onPress_Open_Sign_In_Screen = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <ImageBackground
        source={bg_SignIn}
        style={styles.BackgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={ic_MuseumBurned} style={styles.logoStyle} />
          <Text style={styles.logoText}>Sign Up</Text>
          <Text style={styles.logoText}>VINDI MUSEUM</Text>
          {this.state.isLoading ? <Text style={styles.logoText}>Đang Tải .....</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name={'ios-mail'}
            size={28}
            color={`rgba(255, 255, 255, 0.7)`}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputText}
            keyboardType='email-address'
            placeholder={'E-mail'}
            autoCapitalize='none'
            placeholderTextColor={`rgba(255, 255, 255, 0.7)`}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.onChangeText_Email(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name={'ios-lock'}
            size={28}
            color={`rgba(255, 255, 255, 0.7)`}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputText}
            keyboardType='default'
            placeholder={'Password'}
            autoCapitalize='none'
            secureTextEntry={this.state.hidePass}
            placeholderTextColor={`rgba(255, 255, 255, 0.7)`}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.onChangeText_Pass(text)}

          />
          <TouchableOpacity
            style={styles.btnEye}
            onPress={() => { this.onPress_Hide_Pass() }}>
            <Icon
              name={this.state.hidePass ? 'ios-eye-off' : 'ios-eye'}
              size={26}
              color={`rgba(255, 255, 255, 0.7)`}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => this.checkData()}>
          <Text style={styles.txtSignUp}> Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => this.onPress_Open_Sign_In_Screen()}>
            <Text style={styles.textStyle}>Back</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    );
  }
}


export default SignUpScreen