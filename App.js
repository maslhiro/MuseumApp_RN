import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import RootStack from './src/config/RouteConfig'
  
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack/>
       
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
