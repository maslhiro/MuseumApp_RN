import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe"
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  headerContainer: {
    backgroundColor: "#1c9be4",
    alignItems: "center",
    flexDirection: "row",
    width: WIDTH,
    height: 65
  },

  logoStyle: {
    width: 56,
    height: 56
  },

  logoText: {
    flex: 1,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10
  },

  setInfoView: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "space-between"
  },

  textContainer: {
    justifyContent: "center",
    marginTop: 40,
    width: WIDTH - 40,
    marginHorizontal: 10
  },

  textView: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row"
  },

  getNameTest: {
    color: `rgba(0,0,0,0.6)`,
    fontSize: 14,
    fontWeight: "500"
  },

  getNameInputText: {
    fontSize: 24
  },

  chooseAvtTextView: {
    width: 140,
    height: 30,
    borderRadius: 25,
    backgroundColor: `rgba(0, 0, 0, 0.1)`,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    marginTop: 20
  },

  chooseAvtText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  chooseAvtContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 30
  },

  finishText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
    marginRight: 10,
    opacity: 0.8
  }
}));
