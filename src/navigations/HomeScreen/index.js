import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import firebase, { firestore } from 'react-native-firebase';
import { rootRef, testRef } from './../../config/FirebaseConfig';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

  }

  onPush = () => {
//1
    var idObject = rootRef.child('Objects').push().key;
    rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Trang phục cưới của người Khmer Nam Bộ",
          idType: "T006",
          description: "Trang phục của cô dâu, chú rể dân tộc Khmer ở Nam Bộ",
          linkImg:
            "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0060.JPG?alt=media&token=7b989577-121d-473d-8703-9238bf1836e0"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );
//2
      var idObject = rootRef.child('Objects').push().key;
      rootRef
        .child("Objects")
        .child(idObject)
        .set(
          {
            idObject: idObject,
            idMuseum: "M001",
            name: "Đám cưới người Chăm Islam ở Nam Bộ",
            idType: "T002",
            description: "Bức tranh miêu tả văn hóa cưới hỏi cả người Chăm Islam ở Nam Bộ",
            linkImg:
              "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0061.JPG?alt=media&token=7eb0516a-0e54-479c-a531-65f1b0a78f3a"
          },
          function(error) {
            if (error) {
              console.log("failed");
            } else {
              console.log(`successful for object ${idObject}`);
            }
          }
        );
//3
        var idObject = rootRef.child('Objects').push().key;
        rootRef
          .child("Objects")
          .child(idObject)
          .set(
            {
              idObject: idObject,
              idMuseum: "M001",
              name: "Trang phục cưới của người Chăm Islam Nam Bộ",
              idType: "T006",
              description: "Trang phục của cô dâu, chú rể dân tộc Chăm Islam ở Nam Bộ",
              linkImg:
                "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0062.JPG?alt=media&token=b79fffd5-f88b-49ef-a90c-bbebf9a6835c"
            },
            function(error) {
              if (error) {
                console.log("failed");
              } else {
                console.log(`successful for object ${idObject}`);
              }
            }
          );
//4
        var idObject = rootRef.child('Objects').push().key;
        rootRef
          .child("Objects")
          .child(idObject)
          .set(
            {
              idObject: idObject,
              idMuseum: "M001",
              name: "Đám cưới người Hoa ở Nam Bộ",
              idType: "T002",
              description: "Bức tranh miêu tả văn hóa cưới hỏi cả người Hoa ở Nam Bộ",
              linkImg:
                "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0063.JPG?alt=media&token=cf0d7244-c489-4a26-9d1a-dcb59c826f31"
            },
            function(error) {
              if (error) {
                console.log("failed");
              } else {
                console.log(`successful for object ${idObject}`);
              }
            }
          );
//5
          var idObject = rootRef.child('Objects').push().key;
          rootRef
            .child("Objects")
            .child(idObject)
            .set(
              {
                idObject: idObject,
                idMuseum: "M001",
                name: "Trang phục cưới của người Hoa Nam Bộ",
                idType: "T006",
                description: "Trang phục của cô dâu, chú rể dân tộc Hoa ở Nam Bộ",
                linkImg:
                  "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0064.JPG?alt=media&token=c870627a-04e5-4d92-818c-10561a683b51"
              },
              function(error) {
                if (error) {
                  console.log("failed");
                } else {
                  console.log(`successful for object ${idObject}`);
                }
              }
            );
//6---------------
        var idObject = rootRef.child('Objects').push().key;
        rootRef
          .child("Objects")
          .child(idObject)
          .set(
            {
              idObject: idObject,
              idMuseum: "M001",
              name: "Nghề chạm khắc gỗ",
              idType: "T002",
              description: "Sản phẩm của nghề chạm khắc gỗ. Nghề này bắt đầu có mặt và phát triển tại Sài Gòn vào thế kỷ XVII",
              linkImg:
                "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0055.JPG?alt=media&token=3f3df7ae-4bb4-432a-a4a2-7940c5ad9885"
            },
            function(error) {
              if (error) {
                console.log("failed");
              } else {
                console.log(`successful for object ${idObject}`);
              }
            }
          );
//7
        var idObject = rootRef.child('Objects').push().key;
        rootRef
          .child("Objects")
          .child(idObject)
          .set(
            {
              idObject: idObject,
              idMuseum: "M001",
              name: "Nghề kim hoàn",
              idType: "T002",
              description: "Kim hoàn xuất hiện ở Việt Nam vào cuối thế kỉ thứ II và đầu thế kỉ thứ 3. Đến thế kỉ XVIII, nó cũng đã có mặt tại vùng đất Sài Gòn - Gia Định ",
              linkImg:
                "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0056.JPG?alt=media&token=1d192f50-0b8f-48cf-b3d9-24364abcf772"
            },
            function(error) {
              if (error) {
                console.log("failed");
              } else {
                console.log(`successful for object ${idObject}`);
              }
            }
          );
//8
        var idObject = rootRef.child('Objects').push().key;
        rootRef
          .child("Objects")
          .child(idObject)
          .set(
            {
              idObject: idObject,
              idMuseum: "M001",
              name: "Nghề làm gốm",
              idType: "T002",
              description: "Nghề làm gốm đã có ở Việt Nam vào thời đồ đã. Đến thế kỉ XVII, nó dần xuất hiện tại vùng đất Sài Gòn - Gia Định ",
              linkImg:
                "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0057.JPG?alt=media&token=c774c161-4c6c-4271-b726-6abd7f7eb9a7"
            },
            function(error) {
              if (error) {
                console.log("failed");
              } else {
                console.log(`successful for object ${idObject}`);
              }
            }
          );
//9
        var idObject = rootRef.child('Objects').push().key;
        rootRef
          .child("Objects")
          .child(idObject)
          .set(
            {
              idObject: idObject,
              idMuseum: "M001",
              name: "Thuyền độc mộc",
              idType: "T006",
              description: "Phương tiện đi lại đường thủy phổ biến của người Khmer Nam Bộ",
              linkImg:
                "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0058.JPG?alt=media&token=ee61ee76-b67c-4cda-a2a7-a65f70eb05e7"
            },
            function(error) {
              if (error) {
                console.log("failed");
              } else {
                console.log(`successful for object ${idObject}`);
              }
            }
          );
//10
        var idObject = rootRef.child('Objects').push().key;
        rootRef
          .child("Objects")
          .child(idObject)
          .set(
            {
              idObject: idObject,
              idMuseum: "M001",
              name: "Đám cưới người Khmer ở Nam Bộ",
              idType: "T002",
              description: "Bức tranh miêu tả văn hóa cưới hỏi cả người Khmer ở Nam Bộ",
              linkImg:
                "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0059.JPG?alt=media&token=2d43c95b-eeeb-40d3-9f88-83376fafdb58"
            },
            function(error) {
              if (error) {
                console.log("failed");
              } else {
                console.log(`successful for object ${idObject}`);
              }
            }
          );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title='hello' />
        <View
          style={
            {
              flex: 1,
              backgroundColor: '#EAEAEA',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

          <Button
            title='Push'
            onPress={() => {
              this.onPush()
            }}
          />
          <View style={{ marginBottom: 50 }}></View>
          <Button
            title='Test Authentication'
            onPress={() => {
              this.props.navigation.push('SignIn');
            }}
          />
          <View style={{ marginBottom: 50 }}></View>
          <Button
            title='Search'
            onPress={() => {
              this.props.navigation.push('Search');
            }}
          />
          <View style={{ marginBottom: 50 }}></View>
          <Button
            title='Post'
            onPress={() => {
              this.props.navigation.push('Post');
            }}
          />
          <View style={{ marginBottom: 50 }}></View>
          <Button
            title='Profile'
            onPress={() => {
              this.props.navigation.push('Profile');
            }}
          />

        </View>
      </View>
    );
  }
}