import {StyleSheet, Platform, Dimensions} from 'react-native';

const {width : WIDTH}   = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  BackgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer:{
    alignItems: 'center',
    marginBottom: 50,
  },

  logoStyle: {
    width: 160,
    height: 160,
  },

  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.7,
  },

  inputContainer: {
    marginTop: 10,
  },

  inputText: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor : `rgba(0, 0, 0, 0.35)`,
    color: `rgba(255, 255, 255, 0.7)`,
    marginHorizontal: 25,
  },

  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37 
  },

  btnEye: {
    position: 'absolute',
    top: 9,
    right: 37 
  },

  btnSignIn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#086A87',
    justifyContent: 'center',
    marginTop: 20,
  },

  txtSignIn: {
    color: `rgba(255, 255, 255, 0.7)`,
    fontSize: 16,
    textAlign: 'center',
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  textStyle: {
    color: '#0B173B',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  }
  
});
