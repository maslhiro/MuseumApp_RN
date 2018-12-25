import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Button,
  TextInput
} from "react-native";
import Header from "../../components/Header";
import styles from "./styles";
import img_Background from '../../assets/img_Background.jpg'
import ImageProgress from "../../components/ImageProgress";
import AwesomeAlert from 'react-native-awesome-alerts'
import Icon from "react-native-vector-icons/Ionicons";
import {
  Subscribe,
} from 'unstated';
import AppContainer from '../../container'

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:this.props.navigation.getParam("arr")?this.props.navigation.getParam("arr"): [],
      showAlert: 0
    };
  }

  renderItem = (arr, index) => {
    let checkReverse = (index) % 2 != 0 ? true : false

    switch (arr.length) {
      case 1: {
        return (
          <TouchableOpacity
            onPress={() => { }}
            style={{ flex: 1, height: 200, margin: 5, backgroundColor: 'black' }}>

            <ImageProgress
              style={{ flex: 1 }}
              source={{ uri: arr[0].data.linkImg }} />

          </TouchableOpacity>
        )
        break
      }
      case 2: {
        return (
          <View style={{ flex: 1, height: 200, flexDirection: `${checkReverse ? 'row' : 'row-reverse'}`, margin: 5, backgroundColor: 'black' }}>
            <TouchableOpacity
              onPress={() => { }}
              style={{ flex: 1 }}>
              <ImageProgress
                style={{ flex: 1 }}
                source={{ uri: arr[0].data.linkImg }} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { }}
              style={{ flex: 1 }}>
              <ImageProgress
                style={{ flex: 1 }}
                source={{ uri: arr[1].data.linkImg }} />
            </TouchableOpacity>
          </View>
        )
        break
      }
      case 3: {
        return (
          <View style={{ flex: 1, height: 200, flexDirection: `${checkReverse ? 'row' : 'row-reverse'}`, margin: 5, backgroundColor: 'black' }}>
            <TouchableOpacity
              onPress={() => { }}
              style={{ flex: 3 }}>
              <ImageProgress
                style={{ flex: 1 }}
                source={{ uri: arr[0].data.linkImg }} />
            </TouchableOpacity>

            <View style={{ flex: 2 }}>
              <TouchableOpacity
                onPress={() => { }}
                style={{ flex: 1 }}>
                <ImageProgress
                  style={{ flex: 1 }}
                  source={{ uri: arr[1].data.linkImg }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { }}
                style={{ flex: 1 }}>
                <ImageProgress
                  style={{ flex: 1 }}
                  source={{ uri: arr[2].data.linkImg }} />
              </TouchableOpacity>
            </View>
          </View>
        )
        break
      }
      default: {
        return null

      }

    }
  };

  goBack = () => {
    this.props.navigation.goBack()
  }

  onPress_Open_Home_Screen = () => {
    
      this.props.navigation.navigate("Home")

  }

  renderAlert = (container) => {
    switch(this.state.showAlert)
    {
      case 0 :{
        return null
        break
      }
      case 1 : {
        return(
          <AwesomeAlert
            show={true}
            title="Cảnh Báo !"
            message="Bạn có chắc muốn đăng xuất không ?"
            confirmText=" OK "
            closeOnTouchOutside={false}
            onConfirmPressed={()=>
              {
                let check = container.clearInfo_User()
                if(check)
                {
                  this.setState({showAlert:0},()=>this.onPress_Open_Home_Screen())

                }
                else{
                  this.setState({showAlert : 3})
                }
              }
            }
            onCancelPressed={() => { this.setState({showAlert:0}) }}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
          />
          )
        break
      }
      case 2: {
        return (
            <AwesomeAlert
              show={true}
              title="Thông Báo !"
              message="Đăng xuất thành công"
              confirmText=" OK "
              closeOnTouchOutside={false}
              onConfirmPressed={()=>this.setState({showAlert:0})}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
            />
        )
        break
      } 
      case 3: {
        return (
            <AwesomeAlert
              show={true}
              title="Opps!"
              message="Có lỗi xảy ra, bạn vui lòng thử lại nhé"
              confirmText=" OK "
              closeOnTouchOutside={false}
              onConfirmPressed={()=>this.setState({showAlert:0})}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
            />
        )
        break
      }
      default: {
        return null
      }
    }


  }

  render() {

    let rightIconHeader = <Icon name="md-log-out" size={30} color="white" />

    return (
      <View style={styles.container}>
           <Header
              onPressLeftIcon={() => this.goBack()}
              onPressRightIcon={() => this.setState({showAlert : 1})}
              rightIcon={rightIconHeader}
              title="Tài Khoản" />
        
        <ImageBackground
          source={img_Background}
          style={styles.bgContainer}>

          <View style={styles.userContainer}>

            <View style={styles.userContainer01}>
              <Subscribe to={[AppContainer]}>
                {container =>
                  <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20, backgroundColor: 'white' }}>

                    <View style={{ flex: 5, backgroundColor: 'white', flexDirection: 'row' }}>
                      <View style={styles.avaContainer}>
                        <ImageProgress
                          style={{ height: 80, width: 80 }}
                          source={{ uri: container.getAppState().linkAva }}
                        />
                      </View>
                      <View style={styles.nameContainer}>
                        <Text style={styles.textName}>{container.getInfo_User().name}</Text>
                      </View>
                    </View>
                    <View style={{ flex: 2, backgroundColor: 'white', padding: 5, justifyContent: 'space-evenly' }}>
                      <Text style={{ color: 'black' }}>Các hiện vật đã đánh dấu</Text>
                      <View style={{ height: 1, backgroundColor: 'black' }} />
                    </View>

                  </View>
                }
              </Subscribe>
            </View>
          </View>
          <Subscribe to={[AppContainer]}>
          {container =>
          <View style={{ flex: 3, backgroundColor: 'transparent' }}>
            <FlatList
              style={{ flex: 1 }}
              data={this.state.data}
              keyExtractor={(arr) => arr[0].key}
              renderItem={({ item, index }) => this.renderItem(item, index)}
            />
          </View>
          }
          </Subscribe>

          <Subscribe to={[AppContainer]}>
          {container =>
            this.renderAlert(container)
          }
          </Subscribe>

        </ImageBackground>
      </View>
    );
  }
}

export default ProfileScreen