import {StyleSheet, Dimensions} from 'react-native';
import ImageProgress from './../../components/ImageProgress/index';

const {width : WIDTH}   = Dimensions.get('window');
const {height : HEIGHT}   = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 30, 
  },

  logoStyle: {
    width: 64,
    height: 64,
  },

  logoText: {
    color: '#045FB4',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
    opacity: 0.7,
  },

  checkboxContainer: {
    width: WIDTH - 60,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  
  lineCheckbox:{
    width: WIDTH - 60,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 12
  },

  inputText: {
    width: WIDTH - 120,
    height: 45,
    borderRadius: 20,
    fontSize: 16,
    paddingLeft: 25,
    backgroundColor : `#FAFAFA`,
    color: '#6E6E6E',
    marginHorizontal: 10,
  },

  btnSearch: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderColor: '#A4A4A4',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    paddingLeft: 20,
  },

  txtSearch: {
    color: `rgba(255, 255, 255, 0.7)`,
    fontSize: 16,
    textAlign: 'center',
  },

  listviewContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    width: WIDTH - 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  titleItem: {
    fontWeight:'bold',
    fontSize:14,
  },
  imgProgress: {
    height: 120,
    width: 120
  }
  
});
