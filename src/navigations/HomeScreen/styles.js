import {StyleSheet,Dimensions} from 'react-native';

const {width,height} = Dimensions.get('screen') 

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor:'white'
  },
  viewObject:{
    flex: 1, 
    padding: 5, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f3f6c8', 
    margin: 5 
  },
  image : {
    flex:1
  },
  textObject : {
    textAlign: 'center',
    color:'#362207'
  },
  viewImage : {
    height: width / 100 * 25,
    width: width / 100 * 25,
    borderRadius: width / 100 * 25 / 2,
    overflow: 'hidden'

  },

});
