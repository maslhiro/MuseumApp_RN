import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  CameraRoll,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import firebase, { firestore } from "react-native-firebase";
import { rootRef, testRef, commentsRef, FirebaseAuth } from "./../../config/FirebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      comment:[],
      idObject: '',
      uid: '',
      txtComment: '',
    }
  }

  onTxtCommentChanged = (text) =>{
    this.setState({
      txtComment: text
    })
  }

  onSend = () =>{
    if (this.state.txtComment.length <= 0){
      alert('Bạn chưa nhập bình luận!')
      return
    }
    idComment = commentsRef.child(this.state.idObject).push().key
    commentsRef.child(this.state.idObject).child(idComment).set({
      idComment: idComment,
      idUser: this.state.uid,
      idObject: this.state.idObject,
      comment: this.state.txtComment
    },
    (error) => {
      if (error) {
        //objectsRef.child(idObject).remove();
        alert("Bình luận thất bại. Vui lòng thử lại.");
        console.log("Comment failed");
      } else {
        alert("Thao tác thành công!");
        console.log(`successful for comment ${this.state.idObject}`);
      }
    })
  }

  getObject = () =>{
    let _uid = null;
    let _idObject = this.props.navigation.getParam("idObject");
    if (FirebaseAuth.currentUser.uid) {
      _uid = FirebaseAuth.currentUser.uid;
    }
    this.setState({
      idObject: _idObject,
      uid: _uid
    })
  }

  componentDidMount(){
    this.getObject()
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Comment" />
        <ImageBackground
          source={{
            uri:
              "https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg"
          }}
          style={styles.infoContainer}
        >
        <View style={styles.showCommentView}>

        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            keyboardType='email-address'
            placeholder = {'Nhập gì đó...'}
            autoCapitalize='none'
            secureTextEntry={true}
            placeholderTextColor = '#BDBDBD'
            underlineColorAndroid = 'transparent'
            onChangeText={
              (text) => {
                  this.onTxtCommentChanged(text)
              }}
          />
          <TouchableOpacity style={styles.send} onPress={()=>{this.onSend()}}>
            <Icon name="md-send" size={30} color="blue" />
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>
    );
  }
}
