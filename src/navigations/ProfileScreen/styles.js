import {
  StyleSheet,
  Dimensions
} from "react-native";
import ImageProgress from "./../../components/ImageProgress/index";

const {
  width,
  height
} = Dimensions.get("screen");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgContainer: {
    flex: 1,
    padding: 5
  },
  userContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  userContainer01: {
    height: height * 30 / 100,
    width: width * 80 / 100,
    backgroundColor: 'white'
  },
  avaContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 5
  },



  textName: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
    color: 'black'
  }







}));