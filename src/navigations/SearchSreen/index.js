import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import styles from './styles'
import firebase, { firestore } from 'react-native-firebase';
import { rootRef, objectsRef } from './../../config/FirebaseConfig';
import lgMuseum from '../../assets/SignIn/img_MuseumBurned.png';
import Icon from 'react-native-vector-icons/Ionicons';
import SmallCheckbox from './../../components/SmallCheckBox/index';
import ImageProgress from '../../components/ImageProgress'

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch : '',
      data : [],
      listCheckBox : [false, false, false, false, false, false, false, false, false, false]
    };
  }

  renderItem = (item) => {
    return (
      <View style={{flex:1,margin:5,backgroundColor:"#EFF8FB",padding:5}}>
        <Text style={styles.titleItem}>{item.data.name}</Text>
        <Text>{item.data.description}</Text>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ImageProgress style={styles.imgProgress}
            source={{
              uri: item.data.linkImg
            }}/>
        </View>
      </View>
    )
  }

  onTxtSearchChanged = (text) => {
    this.setState({
      txtSearch : text,
    })
  } 

  onSearch = () => {
    objectsRef.on('value', (child) => {
      let arr = []
      let searchText = this.state.txtSearch;
      
      child.forEach((item) => {
        if (item.child('name').val().toLowerCase().indexOf(searchText.toLowerCase()) != -1
            || item.child('description').val().toLowerCase().indexOf(searchText.toLowerCase()) != -1){
          for (let i=0; i<10; i++){
            if ((this.state.listCheckBox)[i]){
              type = 'T00'  + i.toString()
              if (item.child('idType').val() == type){
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
        },()=>console.log("OK",this.state.data)
      )
    });
    //alert((this.state.listCheckBox))
  }

  onCheckedBox = (isChecked, index) => {
    arr = this.state.listCheckBox;
    arr[index] = isChecked
    this.setState({
      listCheckBox: arr
    })
  }

  render(){
    const {data} = this.state
    return(
      <View style = {styles.container}>
        <View style={styles.logoContainer}>
          <Image source = {lgMuseum} style = {styles.logoStyle}/>
          <Text style={styles.logoText}>VINDI MUSEUM</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <View style={styles.lineCheckbox}>
            <SmallCheckbox title="Tranh ảnh" color='#FACC2E' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 1)}} />
            <SmallCheckbox title="Thủ công mỹ nghệ" color='#2ECCFA' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 2)}}/>
            <SmallCheckbox title="Chiến tranh" color='#000000' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 3)}}/>
            <SmallCheckbox title="Văn hóa" color='#B40431' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 4)}}/>
            <SmallCheckbox title="Nghệ thuật" color='#FF8000' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 5)}}/>
          </View>

          <View style={styles.lineCheckbox}>
            <SmallCheckbox title="Đồ dùng sinh hoạt" color='#3104B4' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 6)}}/>
            <SmallCheckbox title="Công nghiệp" color='#AEB404' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 7)}}/>
            <SmallCheckbox title="Nông nghiệp" color='#088A29' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 8)}}/>
            <SmallCheckbox title="Nhà nước phong kiến" color='#B40404' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 9)}}/>
            <SmallCheckbox title="Mục Khác" color='#58D3F7' onCheck={(isChecked)=>{this.onCheckedBox(isChecked, 0)}}/>
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          <View style = {styles.inputContainer}>
            
            <TextInput
              style = {styles.inputText}
              keyboardType='email-address'
              placeholder = {'Bạn muốn tìm hiện vật...'}
              autoCapitalize='none'
              secureTextEntry={true}
              placeholderTextColor = '#BDBDBD'
              underlineColorAndroid = 'transparent'
              onChangeText={
                (text) => {
                    this.onTxtSearchChanged(text)
                }}
            />
          </View>
          <TouchableOpacity
            style={styles.btnSearch}
            onPress = {this.onSearch}
          >
            <Icon 
              name = {'ios-search'}
              size = {28}
              color = '#6E6E6E'  
              style = {styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listviewContainer}>
          <FlatList
              data={data}
              numColumns={1}
              style={{flex:1}}
              keyExtractor={(item)=>item.key}
              renderItem={({item})=>this.renderItem(item)}
          />
        </View>
        
      </View>
    )
  }
}