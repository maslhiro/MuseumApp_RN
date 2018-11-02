import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './styles';
import bgSignIn from '../../assets/SignIn/bg_signin.jpg';
import lgMuseum from '../../assets/SignIn/museum-burned-1600x1600.png';
import Icon, { Button } from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

export default class SignInScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated : false,
      txtEmail : '',
      txtPassword : '',
      user : null,
    };
  }

  onSignIn = () => {
    if (this.state.txtEmailSignIn == '' || this.state.txtPasswordSignIn == ''){
      alert('Nhap ko chinh xac');
      return;
    }
    firebase.auth().signInWithEmailAndPassword(this.state.txtEmail, this.state.txtPassword)
            .then(() => {
              this.setState({ isAuthenticated : true});
              console.log(`Login successfully`);
              this.props.navigation.push('Info');
            }).catch((error) => {
              console.log(`Login failed. Error = ${error}`);
              alert('Log in failed');
            });
  }

  render() {
    return (

      <ImageBackground source = {bgSignIn} style = {styles.BackgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source = {lgMuseum} style = {styles.logoStyle}/>
          <Text style={styles.logoText}>Sign In</Text>
          <Text style={styles.logoText}>VINDI MUSEUM</Text>
        </View>

        <View style = {styles.inputContainer}>
          <Icon 
            name = {'ios-mail'}
            size = {28}
            color = {`rgba(255, 255, 255, 0.7)`}  
            style = {styles.inputIcon}
          />
          <TextInput
            style = {styles.inputText}
            keyboardType='email-address'
            placeholder = {'E-mail'}
            autoCapitalize='none'
            secureTextEntry={true}
            placeholderTextColor = {`rgba(255, 255, 255, 0.7)`}
            underlineColorAndroid = 'transparent'
            onChangeText={
              (text) => {
                  this.setState({ txtEmail: text });
              }}
          />
        </View>

        <View style = {styles.inputContainer}>
          <Icon 
            name = {'ios-lock'}
            size = {28}
            color = {`rgba(255, 255, 255, 0.7)`}  
            style = {styles.inputIcon}
          />
          <TextInput
            style = {styles.inputText}
            keyboardType='default'
            placeholder = {'Password'}
            autoCapitalize='none'
            secureTextEntry={true}
            placeholderTextColor = {`rgba(255, 255, 255, 0.7)`}
            underlineColorAndroid = 'transparent'
            onChangeText={
              (text) => {
                  this.setState({ txtPassword: text });
              }}
          />
          <TouchableOpacity style={styles.btnEye}>
            <Icon 
              name = {'ios-eye'}
              size = {26}
              color = {`rgba(255, 255, 255, 0.7)`}  
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnSignIn}
          onPress = {() => {
            this.onSignIn();
          }}
        >
          <Text style = {styles.txtSignIn}> Sign In</Text>
        </TouchableOpacity>

        <View style = {styles.textContainer}>
          <TouchableOpacity >
            <Text style = {styles.textStyle}
              onPress = {() => {
                Alert.alert(
                  'Quên mật khẩu',
                  'Đoán xem...',
                  [
                    {text: 'Đoán', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              }}
            > Bạn đã quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity >
            <Text style = {styles.textStyle}
               onPress = {() => {
                this.props.navigation.push('SignUp');
              }}
            > Bạn chưa có tài khoản?</Text>
          </TouchableOpacity>
        </View>
          
      </ImageBackground>
    );
  }
}
