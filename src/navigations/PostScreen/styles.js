import {StyleSheet, Dimensions} from 'react-native';

const {width : WIDTH}   = Dimensions.get('window');
const {height : HEIGHT}   = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },

  postContainer: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerContainer:{
    backgroundColor: '#1c9be4',
    alignItems: 'center',
    flexDirection: 'row',
    width: WIDTH,
    height: 65
  },

  logoStyle: {
    width: 56,
    height: 56,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },

  titleInputText: {
    width: WIDTH - 15,
    height: 45,
    fontSize: 20,
    paddingLeft: 15,
    color: '#373737',
    marginHorizontal: 25,
    marginTop: 20,
  },

  descriptionInputText:{
    width: WIDTH - 15,
    height: 150,
    fontSize: 16,
    paddingLeft: 15,
    marginHorizontal: 25,
    
  },

  featuresView:{
    width: WIDTH - 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },

  featuresButton: {
    width: 120,
    height: 40,
    borderRadius: 25,
    backgroundColor: `rgba(245, 245, 245, 1)`,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    marginHorizontal: 5,
  },

  featuresIcon:{
    width: 20,
    height: 20
  },

  featuresText:{
    color: '#000000',
    fontSize:  14,
    marginLeft: 10
  },

  featureContainer:{
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center',
  },

  
});
