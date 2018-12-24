import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  AsyncStorage
} from 'react-native';

import RootStack from './src/config/RouteConfig'
import {
  Provider,
} from 'unstated';
import AppContainer from './src/container'

export default class App extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      uid:"",
      linkAva : ""
    }
  }

  getInfo_User = async () => {
    let uid,linkAva
    try {
      uid = await AsyncStorage.getItem("@Key:uid")
      linkAva = await AsyncStorage.getItem("@Key:linkava")

    } catch (error) {
      console.log("Error get User ",error)
      return false
    }
    if(uid&&linkAva) this.setState({uid:uid,linkAva:linkAva})
    return true

  }

  componentWillMount(){
      this.getInfo_User()
  }

  render() {
    let appContainer = new AppContainer({
      uid:this.state.uid,
      linkAva:this.state.linkAva
    })
    return (
      <Provider inject={[appContainer]}>
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
