import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import firebase, { firestore } from 'react-native-firebase';
import { rootRef, testRef } from './../../config/FirebaseConfig';
import SignScreen from '../SignScreen';

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
   
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title='hello' />
        <View
          style={
            {
              flex: 1,
              backgroundColor: '#EAEAEA',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

          <Button
            title='Push'
            onPress={() => { 
              var id = testRef.push().key;
              testRef.child(id).set({
                id : id,
                name : 'mrD',
                description : 'dep trai vo dichhhhhhh !!'
              }, function(error){
                if (error){
                  alert('error');
                } else {
                  alert('successful for ' + id);
                }
              })
            }}
          />
          <View style={{marginBottom:50}}></View>
          <Button 
            title='Test Authentication'
            onPress = {() =>{
              this.props.navigation.push('Sign');
            }}
            />
        </View>
      </View>
    );
  }
}


