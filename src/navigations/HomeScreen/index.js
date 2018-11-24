import React, { Component } from 'react';
import {
  Text,
  FlatList,
  View,
  Button
} from 'react-native';
import styles from './styles';
import { rootRef, objectsRef } from './../../config/FirebaseConfig';
import ImageProgress from '../../components/ImageProgress'

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }
  }

  render() {
    return (
      <View style={styles.container}>   
        <View
          style={
            {
              flex: 1,
              backgroundColor: '#EAEAEA',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
          <FlatList
            style={{flex:1}}
            keyExtractor={(item)=>item.key}
            data={this.state.data}
            r
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

  componentDidMount()
  {
    objectsRef.on('value',(child)=>
    {
      let arr = []
      child.forEach((item)=>{
        arr.push({
          key: item.key,
          data:item.toJSON()
        })
      })
      this.setState(
        {
          data:arr
        }
      )
    })
  }

}
export default HomeScreen

