import { StyleSheet, Dimensions } from "react-native";
import ImageProgress from "./../../components/ImageProgress/index";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    //paddingTop: Constants.statusBarHeight
    // overflow:'hidden'
    // backgroundColor:'white'
  },
  insideView:{
    backgroundColor: "red",
    height: 400,
    marginVertical: 10,
    width: WIDTH,
    alignSelf: "center",
    justifyContent: "center"
  },
  imageView:{
    flex: 2,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20
  },
  flatlistContainer:{
    backgroundColor: "yellow",
    flex: 3,
    flexDirection: "row",
    marginTop: 10,
  },
  touchable:{
    height: 60,
    backgroundColor: "#f79f24",
    alignItems: "center",
    justifyContent: "center"
  }
}));
