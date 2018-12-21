import React, { Component } from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  ImageBackground,
  CheckBox,
  Button
} from 'react-native';
import styles from './styles';
import { rootRef, objectsRef } from './../../config/FirebaseConfig';
import ImageProgress from '../../components/ImageProgress'
import Header from '../../components/Header'
import img_Background from '../../assets/img_Background.jpg'
import CustomCheckBox from '../../components/CustomCheckBox'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import FastImage from 'react-native-fast-image';

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
            source={{uri:item.data.linkImg}}
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
          title="Trang Chủ"
          showLeftIcon={false}
          rightIcon={rightIcon_Header}
        />
        <ImageBackground
          source={img_Background}
          style={{flex:1}}>
        <View
          style={{
            flexDirection: 'row',
            height: 30,
            backgroundColor: 'black',
            alignItems: 'center',
          }}>
          <TouchableOpacity 
            onPress={() => {this.onPress_IconFilter()}}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <Icon name="md-options" size={20} color="white"  />

          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => { this.onPress_IconSearch()}}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
            <Icon name="md-search" size={20} color="white"  />
          </TouchableOpacity>
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
            style={styles.touchView}
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
          <View style={{justifyContent:'center', margin:5, backgroundColor:'white',borderRadius:5 }}>
            <Text style={{fontSize:16,color:'black', marginTop: 10}}> Chọn Các Loại Hiện Vật Bạn Muốn Lọc :</Text>
            <View 
              style={{
                flexWrap:'wrap',
                padding:5, 
                flexDirection:'row', }}>
               {Type.map(item => <CustomCheckBox text={item.des} key={item.key}/>)}
            </View>
            <View style={{flexDirection:'row', margin: 2,}}>
              <TouchableOpacity 
                color="#f79f24"
                style={{backgroundColor:'#f79f24',flex:1,justifyContent:'center',alignItems:'center', height: 40}}
                onPress={()=>this.setState({visibleModal:false})}>
                <Text style={{color:'white',fontSize:14 }}>Lọc</Text>
                </TouchableOpacity>
            </View>
          

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