import React, { Component } from 'react'
import { View } from 'react-native'
import AppNavigator from './src/navigations/AppNavigator';
// import MainContainer from './src/containers/MainContainer'
import { Provider } from 'react-redux'
// import Store from './src/redux/store'
let that=null ;
export default class App extends Component {
  render() {
    return (
        <AppNavigator />
        
    );
  }
}
