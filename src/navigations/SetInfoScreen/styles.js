import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
    backgroundColor: "white"
  },
  headerContainer: {
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    padding:5,
    height: 55
  },
  overlayContainer : {
    width: (width * 80) / 100,
    height: (height * 55) / 100,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  overlayContainer_01 : {
    padding: 2,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    flex: 1
  },
  chooseAvtContainer: {
    flexDirection: 'row',
    padding:5,
    // alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    padding:5,
    justifyContent: "center"
  },
  touchView: {
    height: 60,
    backgroundColor: '#f79f24',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchChoosePhotoView: {
    borderRadius: 25,
    backgroundColor: '#f79f24',
    margin:10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 13,
//    color: '#679186'
    color:'black'
},
  textHeader: {
    fontSize: 16,
    color: 'white'
  },
  textInputNameUser:
  {
    backgroundColor: 'white',
    color:'#679186',
    alignSelf:'center',
    width: (width * 70) / 100,
    padding: 5
  },
  textTouch: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14
  }

})

export default styles