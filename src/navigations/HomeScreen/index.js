import React, { Component } from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ImageBackground,
  CheckBox
} from 'react-native';
import styles from './styles';
import { rootRef, objectsRef } from './../../config/FirebaseConfig';
import ImageProgress from '../../components/ImageProgress'
import Header from '../../components/Header'
import CustomCheckBox from '../../components/CustomCheckBox'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import FastImage from 'react-native-fast-image';

// Du Lieu Test
const Type = [
  {
    key: "T000",
    des: "Mục Khác"
  },
  {
    key: "T001",
    des: "Tranh ảnh"
  },
  {
    key: "T002",
    des: "Thủ công mỹ nghệ"
  },
  {
    key: "T003",
    des: "Chiến tranh"
  },
  {
    key: "T004",
    des: "Thủ công mỹ nghệ"
  },
  {
    key: "T005",
    des: "Chiến tranh"
  },
]

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visibleModal : false
    }
  }
  renderItem = (item) => {
    return (
      <View style={styles.viewObject}>
        <View style={styles.viewImage}>
          <ImageProgress
            style={styles.image}
            source={{
              //uri: item.data.linkImg
              uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0"
            }}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.textObject}>{item.data.name}</Text>
      </View>
    )
  }

  onPress_OpenPostScreen = () => {
    this.props.navigation.navigate("Post")
  }

  onPress_IconFilter = () => {
    this.setState(
      {
        visibleModal:true
      }
    )
  }

  
  onPress_IconSearch = () => {
    this.props.navigation.navigate("Search")
  }


  render() {
    const { data } = this.state

    let rightIcon_Header = <FastImage style={{ width: 26, height: 26 }} resizeMode={FastImage.resizeMode.cover}
      source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0" }} />

    return (
      <View style={styles.container}>
        <Header
          title="Xin Chào :)"
          showLeftIcon={false}
          rightIcon={rightIcon_Header}
        />
        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg' }}
          style={{flex:1}}>
        <View
          style={{
            flexDirection: 'row',
            height: 30,
            backgroundColor: 'black',
            alignItems: 'center',
          }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <Icon name="md-options" size={20} color="white" onPress={() => {this.onPress_IconFilter()}} />

          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <Icon name="md-search" size={20} color="white" onPress={() => { this.onPress_IconSearch()}} />
          </View>
        </View>

        <View style={{ flex:1,justifyContent:'flex-end',}}>
          <FlatList
            removeClippedSubviews
            disableVirtualization
            data={data}
            numColumns={2}
            style={{ flex: 1, margin: 5 }}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => this.renderItem(item)} />
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              position: 'absolute',
              borderRadius:30,
              alignItems:'center',
              justifyContent:'center',
              end:20,
              bottom:20,
              backgroundColor: 'red'
            }}
            activeOpacity={0.7}
            onPress={()=>this.onPress_OpenPostScreen()}>
                <Icon name="md-add" size={30} color="white"/>
          </TouchableOpacity>
        </View>
        </ImageBackground>

        <Modal
          isVisible={this.state.visibleModal}
          style={{flex:1}}
          onBackdropPress={()=>this.setState({visibleModal:false})}>
            <View 
              style={{
                // flexWrap:'wrap',
                backgroundColor:'white', 
                height: 400, 
                padding:5, 
                // flexDirection:'row', 
                justifyContent:'center'}}>
                {/* <Text> Chọn Các Loại Hiện Vật Bạn Muốn Lọc :</Text> */}
                {Type.map(item=>{
                  return(
                    <View key={item.key} style={{backgroundColor:'white',flex:1,flexDirection:'row',alignItems:'center' }}>
                      <CheckBox key={item.key} value = {true} style={{borderColor:"black"}}/>
                      <Text>{item.des}</Text>
                    </View>

                  )
                })}

            </View>

        </Modal>
      </View>
    );
  }

  componentDidMount() {
    objectsRef.on('value', (child) => {
      let arr = []
      child.forEach((item) => {
        arr.push({
          key: item.key,
          data: item.toJSON()
        })
      })
      this.setState(
        {
          data: arr
        }, () => console.log("OK", this.state.data)
      )
    })
  }

}
export default HomeScreen