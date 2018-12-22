import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native';
import RootStack from './src/config/RouteConfig'
import {
  Provider,
} from 'unstated';

export default class App extends Component {
  render() {
    return (
      <Provider >
       <View style={styles.container}>
        <StatusBar backgroundColor="black"/>
        <RootStack/>
      </View>
          
      </Provider>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
