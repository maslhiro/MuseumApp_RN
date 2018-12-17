import React, { Component } from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity
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
      <TouchableOpacity style={styles.viewObject} onPress = {() => {this.toDetail(item)}} >
        <View style={styles.viewImage}>
          <ImageProgress
            style={styles.image}
            source={{
              uri: item.data.linkImg
            }}
            resizeMode="cover"
          />
        </View>
       
        <Text style={styles.textObject}>{item.data.name}</Text>
      </TouchableOpacity>
    )
  }

  toDetail = (item) => {
    this.props.navigation.push("Detail", {idObject : item.data.idObject})
  }

  render() {
    const { data } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          removeClippedSubviews
          disableVirtualization
          data={data}
          numColumns={2}
          style={{ flex: 1, margin : 5 }}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => this.renderItem(item)} />
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

