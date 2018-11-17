import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import styles from './styles'

class Header extends Component{
  render(){
    return(
      <View style={styles.headerView}>
        <Text style={styles.headerText}> {this.props.title} </Text>
      </View>
    )
  }
}

export default Header