import React, { Component } from 'react';
import {
  View,
  Button
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header'
import CustomCheckBox from '../../components/CustomCheckBox'

class TestScreen extends Component {
  constructor(props){
    super(props);
   
  }
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <View style={{flexDirection:'row',margin:10}}>
          <CustomCheckBox/>
        
          <CustomCheckBox/>

        </View>
        <View style={{flexDirection:'row',marginStart:20,margin:10}}>
          <CustomCheckBox text="Thủ Công Nghiệp" wight={250}/>
        
          <CustomCheckBox/>

        </View>
      
      
        
      </View>
    );
  }
}
export default TestScreen