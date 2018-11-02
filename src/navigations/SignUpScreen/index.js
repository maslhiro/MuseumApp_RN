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

export default class SignUpScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated : false,
      txtEmail : '',
      txtPassword : '',
      user : null,
    };
  }

  onSignUp = () => {
    if (this.state.txtEmailSignUp == '' || this.state.txtPasswordSignUp == ''){
      alert('Nhap ko chinh xac');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.txtEmail, this.state.txtPassword)
            .then(() => {
              Alert.alert(
                'Sign Up Successfully',
                'Chúc mừng bạn đã tạo tài khoản  thành công',
                [
                  {text: 'OK', onPress: () => {
                    this.props.navigation.push('SignIn')
                  }},
                ],
                { cancelable: false }
              )
            }).catch((error) => {
                console.log(`Register fail with error: ${error}`);
                alert(`Register fail with error: ${error}`)
            });
  }

  render() {
    return (

      <ImageBackground source = {bgSignIn} style = {styles.BackgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source = {lgMuseum} style = {styles.logoStyle}/>
          <Text style={styles.logoText}>Sign Up</Text>
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

        <TouchableOpacity style={styles.btnSignUp}
          onPress = {() => {
            this.onSignUp();
          }}
        >
          <Text style = {styles.txtSignUp}> Sign Up</Text>
        </TouchableOpacity>

        <View style = {styles.textContainer}>
          <TouchableOpacity >
            <Text style = {styles.textStyle}
               onPress = {() => {
                this.props.navigation.push('SignIn');
              }}
            >Back</Text>
          </TouchableOpacity>
        </View>
          
      </ImageBackground>
    );
  }
}
