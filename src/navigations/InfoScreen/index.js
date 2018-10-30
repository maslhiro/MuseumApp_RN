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
        <Header title='Welcome' />
        <View
          style={
            {
              flex: 1,
              backgroundColor: '#EAEAEA',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
          <Text>You Log In Successfull</Text>
          
        </View>
      </View>
    );
  }
}


