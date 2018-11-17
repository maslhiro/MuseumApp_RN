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
import { rootRef, testRef } from './../../config/FirebaseConfig';
import Object from '../../components/Models/Object'
import ImageProgress from '../../components/ImageProgress'

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

            <ImageProgress
              style={{ 
                  height: 100,
                  width:100
              }}
              source={{
                uri: 'https://unsplash.it/400/400?image=1'
              }}/>


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


