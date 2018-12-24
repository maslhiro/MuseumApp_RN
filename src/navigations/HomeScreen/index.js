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
import AwesomeAlert from 'react-native-awesome-alerts'
const defaultUri ="https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png"
const ColorType = ["gray","#c6e377","#729d39","#36622b"]

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefeshing: false,
      visibleModal: false,
    }
  }
  renderItem = (item) => {
    return (
      <View style={styles.viewObject}>
        <View style={styles.viewImage}>
          <ImageProgress
            style={styles.image}
            source={{ uri: item.data.linkImg }}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.textObject}>{item.data.name}</Text>
      </View>
    )
  }

  onPress_OpenPostScreen = (container) => {
    this.props.navigation.navigate("Post", {
      idType : container.getAppState().arrType[0].key,
      idMuseum :  container.getAppState().arrMuseum[0].key,
    })
  }

  onPress_OpenSignScreen = () => {
    this.props.navigation.navigate("SignIn")
  }

  onPress_IconFilter = () => {
    this.setState(
      {
        visibleModal: true
      }
    )
  }

  onFilter = (container) => {
    container.filterList_Object()
    this.setState({ visibleModal: false })
  }

  onRefresh = (container) => {
    this.setState(
      {
        isRefeshing: true
      }, () => {
        if (container.randomList_Obj()) this.setState({ isRefeshing: false })

      })
  }

  onPress_IconSearch = () => {
    this.props.navigation.navigate("Search")
  }

  renderCustomCheckBox = (container) => {
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
    const { isRefeshing } = this.state
    let rightIcon_Header =  <Subscribe to={[AppContainer]}>
    {container=>
    <ImageProgress style={{ width: 26, height: 26 }} resizeMode="cover"
      source={{ uri: container.getAppState().linkAva?container.getAppState().linkAva:defaultUri }} />
    }
    </Subscribe>
    return (
      <View style={styles.container}>
        <Header
          title="Trang Chủ"
          showLeftIcon={false}
          rightIcon={rightIcon_Header}
        />
        <ImageBackground
          source={img_Background}
          style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              height: 30,
              backgroundColor: 'black',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => { this.onPress_IconFilter() }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
              <Icon name="md-options" size={20} color="white" />

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.onPress_IconSearch() }}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
              <Icon name="md-search" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Subscribe to={[AppContainer]}>
          {container =>
            <View style={{ flex: 1, justifyContent: 'flex-end', }}>
              <FlatList
                removeClippedSubviews
                disableVirtualization
                data={container.getAppState().arrObject_Show}
                numColumns={2}
                style={{ flex: 1, margin: 5 }}
                refreshing={isRefeshing}
                onRefresh={() => this.onRefresh(container)}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => this.renderItem(item)} />
        
              <TouchableOpacity
                style={styles.touchView}
                activeOpacity={0.7}
                onPress={() => container.getAppState().uid?this.onPress_OpenPostScreen(container):this.onPress_OpenSignScreen()}>
                <Icon name="md-add" size={30} color="white" />
              </TouchableOpacity>
              
            </View>
          }
          </Subscribe>

        </ImageBackground>

        <Modal
          isVisible={this.state.visibleModal}
          style={{ flex: 1 }}
          onBackdropPress={() => this.setState({ visibleModal: false })}>
          <Subscribe to={[AppContainer]}>
            {container =>
              <View style={{ justifyContent: 'center', margin: 5, backgroundColor: 'white', borderRadius: 5 }}>
                <Text style={{ fontSize: 16, color: 'black', marginTop: 10 }}> Chọn Các Loại Hiện Vật Bạn Muốn Lọc :</Text>

                <View
                  style={{
                    flexWrap: 'wrap',
                    padding: 5,
                    flexDirection: 'row',
                  }}>
                  {this.renderCustomCheckBox(container)}
                </View>

                <View style={{ flexDirection: 'row', margin: 2, }}>
                  <TouchableOpacity
                    color="#f79f24"
                    style={{ backgroundColor: '#f79f24', flex: 1, justifyContent: 'center', alignItems: 'center', height: 40 }}
                    onPress={() => this.onFilter(container)}>
                    <Text style={{ color: 'white', fontSize: 14 }}>Lọc</Text>
                  </TouchableOpacity>
                </View>


              </View>
            }
          </Subscribe>
        </Modal>


        <Subscribe to={[AppContainer]}>
          {container =>
            <AwesomeAlert
              show={container.state.isLoading}
              showProgress={true}
              title="Đang tải"
              message="Bạn đợi tí nhé ^^"
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