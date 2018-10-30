import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class Header extends Component{
  render(){
    return(
      <View style={styles.headerView}>
        <Text style={styles.headerText}> {this.props.title} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  },
});

export default Header