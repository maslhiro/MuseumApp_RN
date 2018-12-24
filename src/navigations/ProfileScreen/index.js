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
import { rootRef, objectsRef } from "./../../config/FirebaseConfig";
import ImageProgress from "../../components/ImageProgress";
import Icon from "react-native-vector-icons/Ionicons";

// dữ liệu tạm
const data = [
  [
    {
      _id: 1,
      name: "Ảnh 1",
      type: "T01",
      linkImg:
        "https://www.pets4homes.co.uk/images/articles/3288/large/pembroke-and-cardigan-welsh-corgi-health-issues-562a281499a2e.jpg"
    },
    {
      _id: 2,
      name: "Ảnh 1",
      type: "T01",
      linkImg:
        "https://www.pets4homes.co.uk/images/articles/3288/large/pembroke-and-cardigan-welsh-corgi-health-issues-562a281499a2e.jpg"
    },
    {
      _id: 3,
      name: "Ảnh 1",
      type: "T01",
      linkImg:
        "https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg"
    }
  ],
  [
    {
      _id: 4,
      name: "Ảnh 1",
      type: "T01",
      linkImg:
        "https://www.pets4homes.co.uk/images/articles/3288/large/pembroke-and-cardigan-welsh-corgi-health-issues-562a281499a2e.jpg"
    },
    {
      _id: 5,
      name: "Ảnh 1",
      type: "T01",
      linkImg:
        "https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg"
    },
  ],
  [
    {
      _id: 7,
      name: "Ảnh 1",
      type: "T01",
      linkImg:
        "https://www.pets4homes.co.uk/images/articles/3288/large/pembroke-and-cardigan-welsh-corgi-health-issues-562a281499a2e.jpg"
    }
  ]
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  renderItem = (arr, index) => {
    let checkReverse = (index) % 2 != 0 ? true : false

    switch (arr.length) {
      case 1: {
        return (
          <TouchableOpacity 
            onPress={()=>{}}
            style={{ flex: 1, height: 200, margin: 5, backgroundColor: 'black' }}>

            <ImageProgress
              style={{ flex: 1 }}
              source={{ uri: arr[0].linkImg }} />

          </TouchableOpacity>
        )
        break
      }
      case 2: {
        return (
          <View style={{ flex: 1, height: 200, flexDirection: `${checkReverse ? 'row' : 'row-reverse'}`, margin: 5, backgroundColor: 'black' }}>
            <TouchableOpacity 
              onPress={()=>{}}
              style={{ flex: 1 }}>
              <ImageProgress
                style={{ flex: 1 }}
                source={{ uri: arr[0].linkImg }} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=>{}}
              style={{ flex: 1 }}>
              <ImageProgress
                style={{ flex: 1 }}
                source={{ uri: arr[1].linkImg }} />
            </TouchableOpacity>
          </View>
        )
        break
      }
      case 3: {
        return (
          <View style={{ flex: 1, height: 200, flexDirection: `${checkReverse ? 'row' : 'row-reverse'}`, margin: 5, backgroundColor: 'black' }}>
            <TouchableOpacity 
              onPress={()=>{}}
              style={{ flex: 3 }}>
              <ImageProgress
                style={{ flex: 1 }}
                source={{ uri: arr[0].linkImg }} />
            </TouchableOpacity>

            <View style={{ flex: 2}}>
            <TouchableOpacity 
              onPress={()=>{}}
              style={{ flex: 1 }}>
                <ImageProgress
                  style={{ flex: 1 }}
                  source={{ uri: arr[1].linkImg }} />
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>{}}
              style={{ flex: 1 }}>
                <ImageProgress
                  style={{ flex: 1 }}
                  source={{ uri: arr[2].linkImg }} />
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
    this.props.navigaton.goBack()
  }

  render() {

    let rightIconHeader = <Icon name="md-log-out" size={30} color="white"    />

    return (
      <View style={styles.container}>
        <Header 
          onPressLeftIcon = {()=> this.goBack()}
          rightIcon = {rightIconHeader}
          title="Tài Khoản" />
        <ImageBackground
          source={{ uri: "https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg" }}
          style={styles.bgContainer}>

          <View style={styles.userContainer}>
            <View style={styles.userContainer01}>
              <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20, backgroundColor: 'white' }}>
                <View style={{ flex: 5, backgroundColor: 'white', flexDirection: 'row' }}>
                  <View style={styles.avaContainer}>
                    <ImageProgress
                      style={{ height: 80, width: 80 }}
                      source={{ uri: "https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg" }}
                    />
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.textName}>Nhựt Vinh Đẹp Trai</Text>
                  </View>
                </View>
                <View style={{ flex: 2, backgroundColor: 'white', padding: 5, justifyContent: 'space-evenly' }}>
                  <Text style={{ color: 'black' }}>Các hiện vật đã đánh dấu</Text>
                  <View style={{ height: 1, backgroundColor: 'black' }} />
                </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 3, backgroundColor: 'transparent' }}>
            <FlatList
              style={{ flex: 1 }}
              data={data}
              keyExtractor={(arr) => arr[0]._id.toString()}
              renderItem={({ item, index }) => this.renderItem(item, index)}
            />
          </View>

        </ImageBackground>
      </View>
    );
  }
}
