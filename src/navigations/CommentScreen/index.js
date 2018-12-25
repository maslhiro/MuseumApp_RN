import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  CameraRoll,
  FlatList,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import img_Background from '../../assets/img_Background.jpg'
import firebase, { firestore } from "react-native-firebase";
import { rootRef, testRef, commentsRef, FirebaseAuth } from "./../../config/FirebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import AppContainer from '../../container'
import { Provider, Subscribe, Container } from 'unstated';
import ImageProgress from '../../components/ImageProgress'

class CommentScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => <Icon name="ios-chatbubbles" size={25} color={focused ? "#f79f24" : "white"} />,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#f79f24',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: 'black',
        borderBottomColorWidth: 2,
        borderBottomColor: '#f79f24'
      }

    }
  };

  constructor(props) {
    super(props);
    this.state = {
      comment: [],
      idObject: '',
      uid: '',
      txtComment: '',
    }
    this.textInput = null
  }

  onTxtCommentChanged = (text) => {
    this.setState({
      txtComment: text
    })
  }

  onSend = (container) => {
    if (this.state.txtComment.length <= 0) {
      alert('Bạn chưa nhập bình luận!')
      return
    }

    let {
      uid ,
      currentObj
    } = container.getAppState()
    
    let key = commentsRef.push().key
    commentsRef.child(key).set({
      idComment: key,
      idUser: uid,
      idObject: currentObj.data.idObject,
      comment: this.state.txtComment
    },
      (error) => {
        if (error) {
          //objectsRef.child(idObject).remove();
          Alert.alert("Thông Báo","Bình luận thất bại. Vui lòng thử lại.");
          console.log("Comment failed");
        }else
        {
  
        }
      })
  }

  renderItem = (item) => {
    return (

      <View style ={{flex:1, margin: 5, flexDirection:'row', justifyContent:'center'}}>
          <ImageProgress style={{height:50,width:50}} source={{uri: item.data.linkAva}}/>
          <View style={{flex:1, paddingVertical: 20,backgroundColor:'white',justifyContent:'center', padding:5}}>
                <Text style={{fontSize:18,color:'black', justifyContent:'center', textAlign:'left'}}>{item.data.comment}</Text>
          </View>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          showLeftIcon={false}
          title="Thảo Luận" />
        <Subscribe to={[AppContainer]}>
          {container =>


            <ImageBackground
              source={img_Background}
              style={styles.infoContainer}
            >
              <View style={styles.showCommentView}>
              <FlatList
                style={{flex:1, margin : 20 , backgroundColor:'transparent'}}
                data={container.findComt_ByIdObj(container.state.currentObj.data.idObject)}
                renderItem={({item}) => this.renderItem(item)}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  ref={this.textInput}
                  style={styles.inputText}
                  placeholder={'Nhập gì đó...'}
                  autoCapitalize='none'
                  placeholderTextColor='#BDBDBD'
                  underlineColorAndroid='transparent'
                  onChangeText={
                    (text) => {
                      this.onTxtCommentChanged(text)
                    }}
                />
                <TouchableOpacity style={styles.send} onPress={() => { this.onSend(container) }}>
                  <Icon name="md-send" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          }

        </Subscribe>
      </View>
    );
  }
}

export default CommentScreen