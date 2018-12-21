import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:5
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    padding:5,
    justifyContent: "center"
  },
  overlayContainer : {
    width: (width * 80) / 100,
    height: (height * 50) / 100,
    marginVertical: (height * 10 / 100),
    backgroundColor: 'white',
    // alignSelf:'center',
    justifyContent: 'center',
  },
  touchPhotoContainer : {
    height: 60,
    width: 60,
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: "flex-end",
    right: 10
  },
  touchPhoto: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 15,
    color: '#679186'
  },
  titleInputText: {
    fontSize: 20,
    marginHorizontal: 25,
    margin: 20,
    fontWeight:'bold',
    color: "#679186",
    // backgroundColor:'red'
  },
  descriptionInputText:{
    fontSize: 16,
    margin: 20,
    marginHorizontal: 25,
    color : "#679186",
    // backgroundColor:'yellow'
  },
  textHeader: {
    fontSize: 16,
    color: 'white'
  },
});
