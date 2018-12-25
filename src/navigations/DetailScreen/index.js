import React, { Component } from "react";
import {
  Platform,
  ToastAndroid,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert
} from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import {
  favoriteRef,
} from "./../../config/FirebaseConfig";
import AwesomeAlert from 'react-native-awesome-alerts'

import AppContainer from '../../container'
import { Provider, Subscribe, Container } from 'unstated';
import img_Background from '../../assets/img_Background.jpg'
import ImageProgress from "../../components/ImageProgress";

class DetailScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({focused}) => <Icon name="md-information-circle" size={25} color={focused?"#f79f24":"white"}/>,
    tabBarOptions: { 
      showLabel: false,
      activeTintColor:'#f79f24',
      inactiveTintColor:'white',
      style: {
          backgroundColor: 'black',
          borderBottomColorWidth:2,
          borderBottomColor:'#f79f24'
      }
      
  }
   };


  constructor(props) {
    super(props);
    this.state = {
     isLoading: false
    };
  }

  // getObject = () => {
  //   let _uid = null;
  //   let _isFavorite = this.state.isFavorite;
  //   let idObject = this.props.navigation.getParam("idObject");

  //   if (FirebaseAuth.currentObj.uid) {
  //     _uid = FirebaseAuth.currentObj.uid;
  //   }
  //   console.log("isFavorite ::" + _isFavorite);
  //   objectsRef.child(idObject).on("value", snapshot => {
  //     this.setState(
  //       {
  //         idObject: snapshot.child("idObject").val(),
  //         idType: snapshot.child("idType").val(),
  //         idMuseum: snapshot.child("idMuseum").val(),
  //         nameObject: snapshot.child("name").val(),
  //         description: snapshot.child("description").val(),
  //         linkImg: snapshot.child("linkImg").val(),
  //         uid: _uid,
  //         isFavorite: _isFavorite
  //       },
  //       () => {
  //         typesRef.child(this.state.idType).on("value", child => {
  //           this.setState({ type: child.val() });
  //         });
  //         museumsRef.child(this.state.idMuseum).on("value", child => {
  //           this.setState({ museum: child.val() });
  //         });
  //         favoriteRef.child(_uid).on("value", child => {
  //           child.forEach(item => {
  //             if (item.val() == this.state.idObject) {
  //               this.setState({ isFavorite: true });
  //             }
  //           });
  //         });
  //       }
  //     );
  //   });
  // };

  // onFavoriteChecked = () => {
  //   console.log("Favorite checked");
  //   if (this.state.uid) {
  //     if (this.state.isFavorite) {
  //       ()=>{this.unFavorite()}
  //     } else {
  //       ()=>{this.onFavorite()}
  //     }
  //   } else {
  //     ()=>{this.askSignIn()}
  //   }
  // };

  unFavorite = (container) => {
    console.log("unFavorite checked");
    let {
      arrFavorites,
      currentObj
    } = container.getAppState()

    let keyChild = arrFavorites.find((item)=>{
      return(
        item.data.idObject == currentObj.data.idObject
      )
    }).key
    favoriteRef
      .child(keyChild).remove((err)=> {
        if(err){
          console.log("Error On Favo",err)
          ToastAndroid.show("Bạn đã bỏ theo dõi hiện vât này")
          this.setState({isLoading:false})
        }
        else 
        {
          this.setState({isLoading:false})
        }
      })
  };

  onFavorite = (container) => {
    console.log("onFavorite checked");
    let {
      uid,
      currentObj
    } = container.getAppState()

    favoriteRef.push({
        uid :uid,
        idObject : currentObj.data.idObject
    },(err) => {
      if(err)
      {
        console.log("Error On Favo",err)
        this.setState({isLoading:false})
      }
      else
      {
      ToastAndroid.show("Bạn đã bỏ theo dõi hiện vât này")
      this.setState({isLoading:false})
    }})
  };

  askSignIn = () => {
    console.log("askSignIn checked");
    Alert.alert(
      "Yêu cầu đăng nhập",
      "Bạn cần đăng nhập để thực hiện tính năng này",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Sign In") },
        {
          text: "Đăng ký",
          onPress: () => {
            this.props.navigation.push("SignUp");
          }
        },
        {
          text: "Đăng nhập",
          onPress: () => {
            this.props.navigation.push("SignIn");
          }
        }
      ],
      { cancelable: false }
    );
  };

  goBack = () => {
    this.props.navigation.push("Home")
  }

  render() {
    return (
      <View style={styles.container}>
     
        <Header 
          onPressLeftIcon={()=>this.goBack()}
          title="Thông Tin Chi Tiết" />
  
        <ImageBackground
          source={img_Background}
          style={styles.infoContainer}
        >
        <Subscribe to={[AppContainer]}>
        {container => 
      
        <View style={{flex:1}}>
            <View style={{ flex: 1, backgroundColor: "green" , justifyContent:'center'}}>
              <ImageProgress
                style={{ flex: 1 }}
                source={{
                  uri:container.getAppState().currentObj.data.linkImg
                }}
                resizeMode="cover"
              />
         
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  margin: 20,
                }}
              >
                <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{container.getAppState().currentObj.data.name}</Text>
                <Text style={styles.text}>Loại hiện vật</Text>
                <Text style={styles.smalltext}>{container.getAppState().currentObj.data.nameType}</Text>
                <Text style={styles.text}>Được trưng bài tại</Text>
                <Text style={styles.smalltext}>{container.getAppState().currentObj.data.nameMuseum}</Text>
                <Text style={styles.text}>Mô tả</Text>
                <Text style={styles.smalltext}>{container.getAppState().currentObj.data.description?container.getAppState().currentObj.data.description:"Không Có"}</Text>
              </View>
            </ScrollView>

            <View style={styles.touchPhotoContainer}>
                {container.getAppState().currentObj.isFavorites?
                <TouchableOpacity
                  style={styles.touchPhoto}
                  activeOpacity={0.8}
                  onPress={() => {
                    if(container.getAppState().uid)
                    {
                      this.setState({isLoading : true},()=>  this.unFavorite(container))
                    }
                    else
                    {
                      this.askSignIn()
                    }
                 
                  }}
                >
                  <Icon name="md-star" size={30} color="white" />
                </TouchableOpacity>:
                <TouchableOpacity
                  style={styles.touchPhoto_Un}
                  activeOpacity={0.8}
                  onPress={() => {
                    if(container.getAppState().uid)
                    {
                      this.setState({isLoading : true},()=>  this.onFavorite(container))
                    }
                    else
                    {
                      this.askSignIn()
                    }
                 
                  }}
                >
                  <Icon name="md-star" size={30} color="white" />
                </TouchableOpacity>
                }
            
  
            </View>
            </View>
            </View>
            }
            </Subscribe>
            <AwesomeAlert
              show={this.state.isLoading}
              showProgress={true}
              title="Đang xử lí"
              message="Bạn đợi tí nhé ^^"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={false}
            />
        </ImageBackground>
      
      </View>
    );
  }
}

export default DetailScreen;
