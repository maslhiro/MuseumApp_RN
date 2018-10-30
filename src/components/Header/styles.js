import {StyleSheet, Platform} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  headerView:{
    backgroundColor : '#ECEFF1',
    height : 65,
    alignItems : 'center',
    justifyContent: 'center',
    shadowColor: 'gray',
    shadowOffset : {weight:0, height:3},
    shadowOpacity: 0.3,
    elevation: 2
  },

  headerText:{
    fontSize: 16,
    ...Platform.select({
      ios:{
        marginTop: 15
      },
      android:{
        marginTop: 0
      }
    })
  }

});
