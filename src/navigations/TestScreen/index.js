import React, { Component } from 'react';
import {
  View,
  Text
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

        <View style={{flexDirection:'row',marginStart:20,margin:10,flex:1,padding:5,flexWrap:'wrap'}}>
          <CustomCheckBox/>
          
      

          <CustomCheckBox text="Thủ Công Nghiệp" checked={true}/>

          <Text>VInVInVInVInVInVIn</Text>
          
          <Text>VIVInVInVInVInVInVInVInVInVInVInVInVInVInn</Text>
          
          <Text>VInVInVInVInVInVInVIn</Text>
          
          <Text>VInVInVIn</Text>
          
          <Text>VIVInVInn</Text>
          
          <Text>VIn</Text>
      
        </View>
      
      
        
      </View>
    );
  }
}
export default TestScreen