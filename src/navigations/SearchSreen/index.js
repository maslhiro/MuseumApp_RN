import React, { Component } from 'react';
import {
  Platform,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import styles from './styles'
const { width, height } = Dimensions.get('screen')

import img_Background from '../../assets/img_Background.jpg'
import Header from '../../components/Header'
import firebase, { firestore } from 'react-native-firebase';
import { rootRef, objectsRef } from './../../config/FirebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCheckBox from '../../components/CustomCheckBox'

import ImageProgress from '../../components/ImageProgress'

// Du Lieu Test
const Type = [
  {
    key: "T000",
    des: "Tranh ảnh"
  },
  {
    key: "T004",
    des: "Văn hoá"
  },
  
  {
    key: "T003",
    des: "Chiến tranh"
  },
  
  {
    key: "T005",
    des: "Nghệ thuật"
  },
  {
    key: "T001",
    des: "Thủ công mỹ nghệ"
  },
  {
    key: "T008",
    des: "Nông nghiệp"
  },
  {
    key: "T006",
    des: "Đồ dùng sinh hoạt"
  },
  
  {
    key: "T009",
    des: "Nhà nước phong kiến"
  },
  {
    key: "T007",
    des: "Công nghiệp"
  },  

  {
    key: "T025",
    des: "Mục Khác"
  },
]

const ColorType = ["green","red","yellow","gray"]

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: '',
      data: [],
      listCheckBox: [false, false, true, true, false, false, false, true, false, true]
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

  onSearch = () => {
    objectsRef.on('value', (child) => {
      let arr = []
      let searchText = this.state.txtSearch;

      child.forEach((item) => {
        if (item.child('name').val().toLowerCase().indexOf(searchText.toLowerCase()) != -1
          || item.child('description').val().toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
          for (let i = 0; i < 10; i++) {
            if ((this.state.listCheckBox)[i]) {
              type = 'T00' + i.toString()
              if (item.child('idType').val() == type) {
                arr.push({
                  key: item.key,
                  data: item.toJSON()
                })
              }
            }
          }
        }
      })
      this.setState(
        {
          data: arr
        }, () => console.log("OK", this.state.data)
      )
    });
    //alert((this.state.listCheckBox))
  }

  onChecked = (isChecked, index) => {
    let arr = this.state.listCheckBox;
    arr[index] = isChecked
    this.setState({
      listCheckBox: arr
    })
  }

  renderCheckBox = () => 
  {
    let arrCheckbox = []
    let {listCheckBox } = this.state
    Type.forEach((item,index)=>
    {
      let color 
      if(index>3)
      {
        color= ColorType[index%4]
      }
      else 
      {
        color = ColorType[index]
      }

      arrCheckbox.push(
        <CustomCheckBox 
        color={color}
        key={item.key} 
        text={item.des} 
        checked={listCheckBox[index]}
        onPress={()=>{this.onChecked(!listCheckBox[index],index)}}/>
      )
    })
    
    return arrCheckbox
    
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
              <View style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                  <Icon name="ios-search" color="black" size={30} />
                  <TextInput
                    style={{ flex: 1 }}
                    underlineColorAndroid="black"
                    onChangeText={text => this.onChangeText_Search(text)}
                  />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                  <Icon name="md-arrow-dropdown" color="black" size={30} />
                  <Text style={{ margin: 10, fontSize: 14, color: 'black' }}>Tìm Kiếm Nâng Cao</Text>

                </TouchableOpacity>
                <ScrollView>
                  <View style={{ flexDirection: 'row', flex: 1, padding: 5, flexWrap: 'wrap' }}>
                  {this.renderCheckBox()}
                  </View>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        

        </ImageBackground>
        <TouchableOpacity style={{ height: 50, backgroundColor: '#f79f24',padding:10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems:'flex-start', }}>
                <Text style={{fontWeight:'bold',fontSize:14,color:'black'}}>Tìm</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems:'flex-end' }}>
                <Icon name="md-arrow-forward" color="black" size={30}/>
              </View>


            </View>

          </TouchableOpacity>
      </View>
    )
  }
}