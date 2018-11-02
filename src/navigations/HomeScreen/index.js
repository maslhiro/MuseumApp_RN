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
import Object from '../../components/Models/Object'

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
              var idObject = rootRef.child('Objects').push().id;
              rootRef.child('Objects').child(idObject)
                .set(Object(idObject, 
                            'msu_001',
                            'Bình cổ', 
                            'type_001', 
                            'Thời nhà trần, bảo vật của vua Trần Vinh Tông', 
                            'http://vlxx.tv')
                ,function(error){
                  if (error){
                    alert('failed')
                  } else {
                    alert(`add object ${idObject} successfully` );
                  }
                })
            }}
          />
          <View style={{marginBottom:50}}></View>
          <Button 
            title='Test Authentication'
            onPress = {() =>{
              this.props.navigation.push('SignIn');
            }}
            />
        </View>
      </View>
    );
  }
}


