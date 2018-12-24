import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
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
  objectsRef,
  typesRef,
  museumsRef,
  FirebaseAuth
} from "./../../config/FirebaseConfig";

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
      isFavorite: false,
      uid: null,
      idObject: "-LTaCm5-yAfUYX9Pfg16",
      idType: "",
      idMuseum: "",
      type: "",
      museum: "",
      nameObject: "",
      description: "",
      linkImg:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/3c4456be614c1710b655baf00b1e14c0"
    };
  }

  getObject = () => {
    let _uid = null;
    let _isFavorite = this.state.isFavorite;
    let idObject = this.props.navigation.getParam("idObject");

    if (FirebaseAuth.currentUser.uid) {
      _uid = FirebaseAuth.currentUser.uid;
    }
    console.log("isFavorite ::" + _isFavorite);
    objectsRef.child(idObject).on("value", snapshot => {
      this.setState(
        {
          idObject: snapshot.child("idObject").val(),
          idType: snapshot.child("idType").val(),
          idMuseum: snapshot.child("idMuseum").val(),
          nameObject: snapshot.child("name").val(),
          description: snapshot.child("description").val(),
          linkImg: snapshot.child("linkImg").val(),
          uid: _uid,
          isFavorite: _isFavorite
        },
        () => {
          typesRef.child(this.state.idType).on("value", child => {
            this.setState({ type: child.val() });
          });
          museumsRef.child(this.state.idMuseum).on("value", child => {
            this.setState({ museum: child.val() });
          });
          favoriteRef.child(_uid).on("value", child => {
            child.forEach(item => {
              if (item.val() == this.state.idObject) {
                this.setState({ isFavorite: true });
              }
            });
          });
        }
      );
    });
  };

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

  unFavorite = () => {
    console.log("unFavorite checked");
    favoriteRef.child(this.state.uid).on("value", child => {
      child.forEach(item => {
        if (item.val() == this.state.idObject) {
          favoriteRef
            .child(this.state.uid)
            .child(item.key)
            .remove();
          this.setState({ isFavorite: false }, () => {
            console.log("recall");
            return;
          });
        }
      });
    });
  };

  onFavorite = () => {
    console.log("onFavorite checked");
    this.setState({ isFavorite: true }, () => {favoriteRef.child(this.state.uid).push(this.state.idObject);});
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

  render() {
    return (
      <View style={styles.container}>
        <Header title={this.state.nameObject} />
        <ImageBackground
          source={{
            uri:
              "https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg"
          }}
          style={styles.infoContainer}
        >
        <View style={{flex:1}}>
            <View style={{ flex: 1, backgroundColor: "green" , justifyContent:'center'}}>
              <FastImage
                style={{ flex: 1 }}
                source={{
                  uri: this.state.linkImg
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
         
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: 20,
                }}
              >
                <Text style={styles.text}>Loại hiện vật</Text>
                <Text style={styles.smalltext}>{this.state.type}</Text>
                <Text style={styles.text}>Được trưng bài tại</Text>
                <Text style={styles.smalltext}>{this.state.museum}</Text>
                <Text style={styles.text}>Mô tả</Text>
                <Text style={styles.smalltext}>{this.state.description}</Text>
              </View>
            </ScrollView>

            <View style={styles.touchPhotoContainer}>
            
                <TouchableOpacity
                  style={styles.touchPhoto}
                  activeOpacity={0.8}
                  onPress={() => {
                    this.askSignIn();
                  }}
                >
                  <Icon name="md-star" size={30} color="white" />
                </TouchableOpacity>
            
  
            </View>
            </View>
            </View>
        </ImageBackground>
      </View>
    );
  }
}

export default DetailScreen;
