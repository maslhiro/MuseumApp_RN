import React, { Component } from 'react';
import {
  Platform,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import styles from './styles'

import img_Background from '../../assets/img_Background.jpg'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCheckBox from '../../components/CustomCheckBox'
import AppContainer from '../../container'
import { Provider, Subscribe, Container } from 'unstated';

const ColorType = ["gray","#c6e377","#729d39","#36622b"]

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: '',
      showAdvanced:false,
    };
  }

  onChangeText_Search = (text) => {
    this.setState({
      txtSearch: text,
    })
  }
  
  goBack = () => {
    this.props.navigation.goBack()
  }

  onSearch = (container) => {
      if(this.state.txtSearch) 
      {
        Alert.alert("Thông Báo","Bạn chưa nhập từ khoá tìm kiếm")
        return
      }
      if(container.searchObject(this.state.txtSearch))
      {
        this.props.navigation.goBack()
      }
  }

  renderCheckBox = (container) => 
  {
    let arrType = container.getAppState().arrType

    return arrType.map((item, index) => {
      let color 
      if(index>ColorType.length-1)
      {
        color= ColorType[index%ColorType.length]
      }
      else 
      {
        color = ColorType[index]
      }

      return (
        <CustomCheckBox
          color={color}
          text={item.des}
          key={item.key}
          checked={item.checked}
          onPress={() => { container.setState_Checked(index, !item.checked) }} />
      )
    })
  }

  render() {
    const { data } = this.state
    return (
      <View style={styles.container}>
        <Header
          title="Tìm Kiếm"
          onPressLeftIcon={() => this.goBack()}
          />

        <ImageBackground
          source={img_Background}
          style={styles.infoContainer}>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.overlayContainer}>
              <Subscribe to={[AppContainer]}>
              {container =>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                  <Icon name="ios-search" color="black" size={30} />
                  <TextInput
                    style={{ flex: 1 }}
                    underlineColorAndroid="black"
                    onChangeText={text => this.onChangeText_Search(text)}
                  />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}
                  onPress={()=>this.setState({showAdvanced:!this.state.showAdvanced})}>
                  {this.state.showAdvanced?
                  <Icon name="md-arrow-dropdown" color="black" size={30} /> : 
                  <Icon name="md-arrow-dropup" color="black" size={30} /> }
                  <Text style={{ margin: 10, fontSize: 14, color: 'black' }}>Tìm Kiếm Nâng Cao</Text>

                </TouchableOpacity>
                <ScrollView>
                  <View style={{ flexDirection: 'row', flex: 1, padding: 5, flexWrap: 'wrap' }}>
                  {this.state.showAdvanced?this.renderCheckBox(container):null}
                  </View>

                </ScrollView>
              </View>
              }
              </Subscribe>
            </View>
          </ScrollView>
        

        </ImageBackground>
        <Subscribe to={[AppContainer]}>
        {container =>
          <TouchableOpacity style={{ height: 50, backgroundColor: '#f79f24',padding:10 }}
            onPress={()=>{this.onSearch(container)}}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems:'flex-start', }}>
                  <Text style={{fontWeight:'bold',fontSize:14,color:'black'}}>Tìm</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems:'flex-end' }}>
                  <Icon name="md-arrow-forward" color="black" size={30}/>
                </View>


              </View>

            </TouchableOpacity>
          }
          </Subscribe>
      </View>
    )
  }
}