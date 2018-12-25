import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "red",
    // alignItems: "center",
    padding: 5,
    justifyContent: "center"
  },
  showCommentView: {
    flex:1
  },
  inputView:{
    height:60,
    backgroundColor:'#E6E6E6',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  inputText:{
    height:50,
    flex:1,
    paddingHorizontal: 20,
    fontSize: 20,
    opacity: 0.7
  },
  send:{
    marginRight: 15,
    justifyContent:'center',
    alignItems: 'center',
  }
}));
