import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  CameraRoll,
  ScrollView
} from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import firebase, { firestore } from "react-native-firebase";
import { rootRef, testRef } from "./../../config/FirebaseConfig";

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      photos:[]
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Header title="Comment" />
        <View
          style={{
            flex: 1,
            backgroundColor: "#EAEAEA",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        </View>
      </View>
    );
  }
}
