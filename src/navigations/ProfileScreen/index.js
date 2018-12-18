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

const { width, height } = Dimensions.get("window");
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
        "https://www.pets4homes.co.uk/images/articles/3288/large/pembroke-and-cardigan-welsh-corgi-health-issues-562a281499a2e.jpg"
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
        "https://www.pets4homes.co.uk/images/articles/3288/large/pembroke-and-cardigan-welsh-corgi-health-issues-562a281499a2e.jpg"
    },
    {
      _id: 6,
      name: "Ảnh 1",
      type: "T01",
      linkImg:
        "https://www.pets4homes.co.uk/images/articles/3288/large/pembroke-and-cardigan-welsh-corgi-health-issues-562a281499a2e.jpg"
    }
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

class ListItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <Text>{item._id} - </Text>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          <Text>{item.type}</Text>
        </View>
      </View>
    );
  }
}

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  renderItem = arr => {
    console.log("Render Item", JSON.stringify(arr));
    return (
      <View
        style={{ flex:1, backgroundColor: "yellow", margin: 5, flexDirection: "row" }}
      >
        <View style={{ flex: 3, backgroundColor:'blue'}}>
          <Image
            style={{ flex: 1 }}
            resizeMode="cover"
            source={{
              uri:
                "https://www.dogbreedinfo.com/images30/PembrokeWelshCorgiPurebredDogBaozi5YearsOld.jpg"
            }}
          />
        </View>
        <View style={{ flex: 2, flexDirection: "column" }}>
          <View style={{ flex: 1, backgroundColor:'green' }}>
            <Image
              resizeMode="cover"
              source={{
                uri:
                  "https://www.dogbreedinfo.com/images30/PembrokeWelshCorgiPurebredDogBaozi5YearsOld.jpg"
              }}
            />
          </View>
          <View style={{ flex: 1, backgroundColor:'gray' }}>
            <Image
              resizeMode="cover"
              source={{
                uri:
                  "https://www.dogbreedinfo.com/images30/PembrokeWelshCorgiPurebredDogBaozi5YearsOld.jpg"
              }}
            />
          </View>
          <View />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Profile" />
        <ImageBackground
          source={{
            uri:
              "https://i.pinimg.com/564x/e2/72/ba/e272baea3f1fada020360a80ce924989.jpg"
          }}
          style={{ flex: 1, padding: 5 }}
        >
          <View
            style={{
              flex: 2,
              padding: 5,

              justifyContent: "flex-end"
            }}
          >
            <View
              style={{
                backgroundColor: "orange",
                marginHorizontal: 10,
                height: 150
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View style={{ flex: 1 }}>
                  <Image
                    style={{ width: 110, height: 110, borderRadius: 55 }}
                    source={{
                      uri:
                        "https://www.dogbreedinfo.com/images30/PembrokeWelshCorgiPurebredDogBaozi5YearsOld.jpg"
                    }}
                  />
                </View>
                <View
                  style={{
                    flexWrap: "wrap",
                    flex: 1,
                    backgroundColor: "brown",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text>Trần Phú Vinh đẹp trai vãi cả lol</Text>
                </View>
              </View>

              <Text style={{ marginHorizontal: 20, marginTop: 10 }}>
                Favorites
              </Text>

              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              />
            </View>
          </View>

          <View style={{ flex: 3 }}>
            <View
              style={{ backgroundColor: "white", marginRight: 50, flex: 1 }}
            >
              <FlatList
                style={{ flex: 1 }}
                data={data}
                renderItem={({ item }) => this.renderItem(item)}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
