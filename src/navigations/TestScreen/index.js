import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import styles from "./styles";
import Header from "../../components/Header";
import firebase, { firestore } from "react-native-firebase";
import { rootRef, testRef } from "./../../config/FirebaseConfig";
import SignScreen from "../SignScreen";
import Object from "../../components/Models/Object";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  onPush = () => {
    var idObject = rootRef.child("Objects").push().key;
    rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Các đơn vị đong hạt rời",
          idType: "T006",
          description: "Đơn vị tính theo lít, lon",
          linkImg:
            "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0002.JPG?alt=media&token=310a96ec-9e52-4f1e-8387-82f7a200371e"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
    rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Neo, bích neo, dây xích neo",
          idType: "T000",
          description: "Hoạt động hàng hải Việt Nam",
          linkImg:
            "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0003.JPG?alt=media&token=baf8a135-d551-4243-9894-78b59d3eea88"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

    rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Bích neo sừng bò",
          idType: "T000",
          description: "Hoạt động hàng hải Việt Nam",
          linkImg:
            "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0004.JPG?alt=media&token=1831b6d9-3ac8-4be3-b792-7ebea9224880"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
    rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Tay lái tàu",
          idType: "T000",
          description: "Hoạt động hàng hải Việt Nam",
          linkImg:
            "https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0005.JPG?alt=media&token=33e3b628-aaab-49cb-9ab2-0b7bb8d3d91f"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Còi tàu",
          idType: "T000",
          description: "Hoạt động hàng hải Việt Nam",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0006.JPG?alt=media&token=26b135a4-fd74-440a-88d3-15e9485947b7"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "La bàn tàu biển",
          idType: "T000",
          description: "Hoạt động hàng hải Việt Nam",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0007.JPG?alt=media&token=b559be8d-4744-4e18-9eda-c199963abfa9"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Máy may bao bì, may bạt phủ hàng, may võng cẩu",
          idType: "T000",
          description: "Hoạt động hàng hải Việt Nam",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0008.JPG?alt=media&token=68cd08c6-fac7-4ca4-a9f0-018f6046f0ba"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Dụng cụ xếp dỡ hàng hóa",
          idType: "T000",
          description: "Hoạt động hàng hải Việt Nam",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0009.JPG?alt=media&token=76304e30-461e-44ad-af34-f3effadc7957"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Cảng Sài Gòn năm 1868",
          idType: "T001",
          description: "",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0010.JPG?alt=media&token=5fa1cb97-b593-42ca-a7df-869de8f7d259"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Cửa sông Sài Gòn 1865",
          idType: "T001",
          description: "Từ cửa sông Sài Gòn, ghe thuyền có thể vào Chợ Lớn theo đường kênh, rạch",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0011.JPG?alt=media&token=418ad531-1a97-4227-9d50-a78902a4a322"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Kênh Tàu Hũ",
          idType: "T001",
          description: "Bình Tây, Chợ Lớn, 1926",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0012.JPG?alt=media&token=a33398cc-76e9-4aa4-8fb0-fdb3831776d3"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );
      

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Kênh Tàu Hũ và bến Ghe Thuyền",
          idType: "T001",
          description: "Bình Tây, Chợ Lớn, 1926",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0013.JPG?alt=media&token=9b0798f8-b88d-4f9b-b7dc-b95354c03c6b"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Hoạt động vận chuyểnv hàng hóa bằng đường sông",
          idType: "T001",
          description: "",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0014.JPG?alt=media&token=4787350c-307d-437f-a3f3-4a4de2a3d1a7"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Dụng cụ đo độ dài",
          idType: "T006",
          description: "Vi đếm tiền, Thước đo, Bàn tính, Máy tính",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0015.JPG?alt=media&token=0dd82e6e-74de-4da8-b3ff-cb535639b0e0"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Mô hình vệ tinh Vinasat-1",
          idType: "T007",
          description: "Vệ tinh viễn thông đầu tiên được phóng lên quỹ đạo lúc 22:17, ngày 18/4/2008",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0016.JPG?alt=media&token=0cc9bc2a-79e4-4f64-87e7-1a25780da7e4"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );
      
      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Khách sạn Continental",
          idType: "T001",
          description: "Xây dựng năm 1879",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0018.JPG?alt=media&token=6a23a0d9-576a-4ed4-b271-09d48569dc80"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Dụng cụ dùng trong luyện đồng",
          idType: "T007",
          description: "Gáo múc đồng, Cây khuấy đồng, Gáo múc sáp",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0019.JPG?alt=media&token=b725e762-5ff4-48aa-aa30-a60ac4875fba"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Một số vật dụng bằng đồng",
          idType: "T006",
          description: "Lọ hoa đồng, Bàn ủi đồng, Đục, Dũa, Cây quét sáp, Mũi đục",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0021.JPG?alt=media&token=228ec8ef-956c-4012-8c37-27cf330679c3"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Chuông cổ",
          idType: "T004",
          description: "Chùa Long Hoàng, chất liệu đồng, đầu thế kỷ 20",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0023.JPG?alt=media&token=21220018-a901-4040-acca-8aa4624a3ddd"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Nồi đồng",
          idType: "T006",
          description: "",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0024.JPG?alt=media&token=9102afc3-a794-443c-84f0-0d456787f669"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );

      var idObject = rootRef.child("Objects").push().key;
      rootRef
      .child("Objects")
      .child(idObject)
      .set(
        {
          idObject: idObject,
          idMuseum: "M001",
          name: "Lư đồng",
          idType: "T004",
          description: "",
          linkImg:
"https://firebasestorage.googleapis.com/v0/b/testfb02-e7af9.appspot.com/o/0025.JPG?alt=media&token=952ed15c-84f7-4f03-9090-daf8f4292623"
        },
        function(error) {
          if (error) {
            console.log("failed");
          } else {
            console.log(`successful for object ${idObject}`);
          }
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="hello" />
        <View
          style={{
            flex: 1,
            backgroundColor: "#EAEAEA",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            title="Push"
            onPress={() => {
              this.onPush();
            }}
          />
          <View style={{ marginBottom: 50 }} />
          <Button
            title="Test Authentication"
            onPress={() => {
              this.props.navigation.push("SignIn");
            }}
          />
        </View>
      </View>
    );
  }
}
