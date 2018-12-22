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
import AppContainer from '../../container'
import { Provider, Subscribe, Container } from 'unstated';
import AwesomeAlert  from 'react-native-awesome-alerts' 

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

  renderCustomCheckBox = (arrType) => {
    return arrType.map(item => <CustomCheckBox text={item.des} key={item.key}/>)

  }

  render() {
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
          <Subscribe to={[AppContainer]}>
          { container =>
            <FlatList
              removeClippedSubviews
              disableVirtualization
              data={container.getAppState().arrObject}
              numColumns={2}
              style={{ flex: 1, margin: 5 }}
              onRefresh={()=>container.randomList_Obj()}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => this.renderItem(item)} />
            }
          </Subscribe>
            <TouchableOpacity
              style={styles.touchView}
              activeOpacity={0.7}
              onPress={()=>this.onPress_OpenPostScreen()}>
                  <Icon name="md-add" size={30} color="white"/>
            </TouchableOpacity>
          </View>
      
        </ImageBackground>
        <Subscribe to={[AppContainer]}>
            { container =>
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
                {this.renderCustomCheckBox(container.getAppState().arrType)}
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
        }
        </Subscribe>
      
        <Subscribe to={[AppContainer]}>
          { container =>
             <AwesomeAlert
             show={container.state.isLoading}
             showProgress={true}
             title="Loading"
             message="Please wait ..."
             closeOnTouchOutside={false}
             closeOnHardwareBackPress={false}
             showCancelButton={false}
             showConfirmButton={false}
           />
          }
        </Subscribe>
      
      </View>
    );
  }

}
export default HomeScreen