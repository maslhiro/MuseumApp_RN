import {StyleSheet, Platform, Dimensions} from 'react-native';

const {width ,height}   = Dimensions.get('screen');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding :5
  },

  backgroundContainer: {
    flex: 1,
    alignItems: "center",
    padding:5,
    justifyContent: "center"
  },
  overlayContainer: {
    width: (width * 80) / 100,
    height: (height * 85) / 100,
  },
  logoContainer:{ 
    flex:1, 
    backgroundColor: 'transparent', 
    justifyContent:'flex-end',
    alignItems:'center' 
  },
  inputContainer:{
    flex:1, 
    backgroundColor:'white', 
    justifyContent:'center',
  },
  logoStyle: {
    height:180,
    width:180,
    marginBottom:20
  },
  inputStyle:{
    fontSize: 14,
    marginVertical:10,
    color: "black",
  },
  touchStyle: {
    height: 60,
    backgroundColor: '#f79f24',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTouchStyle : {
    color: 'black',
    fontSize: 18
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#f79f24',
    fontSize: 14
  },
  textErrStyle : {
    color:'red',
    fontSize:10
  } ,
  bottomContainer:{
    margin:5, 
    marginBottom:20, 
    backgroundColor:'transparent', 
    flexDirection:'row'
  }

});
