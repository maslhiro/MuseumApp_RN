import React, { Component } from 'react';
import {
  Text,
  FlatList,
  View,
  Button
} from 'react-native';
import styles from './styles';
import { rootRef, objectsRef } from './../../config/FirebaseConfig';
import ImageProgress from '../../components/ImageProgress'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  renderItem = (item) => {
    return (
      <View style={{flex:1,margin:5,backgroundColor:"yellow",padding:5}}>
        <Text>{item.data.name}</Text>
        <Text>{item.data.description}</Text>
        <ImageProgress
              style={{ 
                  height: 100,
                  width:100
              }}
              source={{
                uri: item.data.linkImg
              }}/>
      </View>
    )

  }

  render() {
    const {data} = this.state
    return (
      <View style={styles.container}>
        <FlatList
         data={data}
         numColumns={1}
         style={{flex:1}}
         keyExtractor={(item)=>item.key}
         renderItem={({item})=>this.renderItem(item)}/>
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
        },()=>console.log("OK",this.state.data)
      )
    })
  }

}
export default HomeScreen

