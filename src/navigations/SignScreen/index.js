import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  Button} from 'react-native';
import styles from './styles'
import Header from './../../components/Header';
import firebase from 'react-native-firebase';

export default class SignScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated : false,
      txtEmailSignIn : '',
      txtEmailSignUp : '',
      txtPasswordSignIn : '',
      txtPasswordSignUp : '',
      user : null,
    };
  }

  onSignUp = () => {
    if (this.state.txtEmailSignUp == '' || this.state.txtPasswordSignUp == ''){
      alert('Nhap ko chinh xac');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.txtEmailSignUp, this.state.txtPasswordSignUp)
            .then(() => {
                alert(`Register successfully by e-mail ${this.state.txtEmailSignUp}`)
            }).catch((error) => {
                console.log(`Register fail with error: ${error}`);
                alert(`Register fail with error: ${error}`)
            });
  }

  onSignIn = () => {
    if (this.state.txtEmailSignIn == '' || this.state.txtPasswordSignIn == ''){
      alert('Nhap ko chinh xac');
      return;
    }
    firebase.auth().signInWithEmailAndPassword(this.state.txtEmailSignIn, this.state.txtPasswordSignIn)
            .then((loggedInUser) => {
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
      <View style={styles.container}>
        <Header title='Sign In & Sign Up' />
        <View style={styles.underHeader}>
          <View style={styles.getInfoSpace}>
            <View style={{flex:1, backgroundColor:'#ECEFF1'}}>
              <TextInput 
                keyboardType='email-address'
                placeholder='Enter your email'
                autoCapitalize='none'
                onChangeText={
                    (text) => {
                        this.setState({ txtEmailSignIn: text });
                    }}
              />
              <TextInput
                keyboardType='default'
                placeholder='Enter your password'
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={
                    (text) => {
                        this.setState({ txtPasswordSignIn: text });
                    }}
              />
              <Button title='Sign In'
                onPress = {() =>{
                  this.onSignIn();
                }}
              />
            </View>
          </View>
          <View style={{marginBottom:20}}></View>
          <View style={styles.getInfoSpace}>
            <View style={{flex:1, backgroundColor:'#ECEFF1'}}>
              <TextInput
                keyboardType='email-address'
                placeholder='Enter your email'
                autoCapitalize='none'
                onChangeText={
                    (text) => {
                        this.setState({ txtEmailSignUp: text });
                    }}
              />
              <TextInput
                keyboardType='default'
                placeholder='Enter your password'
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={
                    (text) => {
                        this.setState({ txtPasswordSignUp: text });
                    }}
              />
              <Button title='Sign Up'
                onPress = {() =>{
                  this.onSignUp();
                }}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


