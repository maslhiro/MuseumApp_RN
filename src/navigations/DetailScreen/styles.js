import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    padding: 5,
    paddingTop : 0,
    justifyContent: "center"
  },
  overlayContainer: {
    width: (width * 80) / 100,
    height: (height * 80) / 100,
    // backgroundColor: 'white',
    justifyContent: "center"
  },
  touchPhotoContainer: {
    height: 60,
    width: 60,
    backgroundColor: "transparent",
    position: "absolute",
    alignSelf: "flex-end",
    right: 10
  },
  touchPhoto: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "green",
    alignItems:'center',
    justifyContent: "center"
  },
  text: {
    fontSize: 15,
    color: "#679186"
  },
  smalltext: {
    fontSize: 18,
    fontWeight: "400",
    color: "#00455b",
    textAlign: 'center'
  },
  textHeader: {
    fontSize: 16,
    color: "white"
  }
}));
