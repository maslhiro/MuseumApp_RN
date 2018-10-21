import React, { Component } from 'react';
import { View} from 'react-native';
import img_History from '../../assets/CheckBox/img_History.jpg'
import img_War from '../../assets/CheckBox/img_War.jpg'
import CustomCheckBox from '../../components/CustomCheckBox'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      isCheck01: false
    };
  }

  render() {
    return (
      <View style={{flex:1,padding:5,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
        <CustomCheckBox 
          diameter={180}
          text="Mỹ Thuật"
          image={img_History}
          checked={this.state.isCheck}
          onPress={()=>{this.setState({isCheck:!this.state.isCheck},()=>console.log("OK"))}}
        />

        <CustomCheckBox 
          diameter={150}
          text="Chiến Tranh"
          image={img_War}
          checked={this.state.isCheck01}
          onPress={()=>{this.setState({isCheck01:!this.state.isCheck01},()=>console.log("OK"))}}
        />

      </View> 
    );
  }
}
