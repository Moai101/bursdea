import React,{ Component} from 'react';
import env from './env.json';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/Home'
import { Topic } from './screens/Topic'
import { Idea } from './screens/Idea'
import { Feature } from './screens/Feature'

import * as Analytics from 'expo-firebase-analytics';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Provider } from 'react-redux';
import { Publish } from './screens/Publish'
import  appReducer from './reducers/Reducer'
import { createStore } from 'redux';

  const store = createStore(appReducer);

  // https://reactnavigation.org/docs/headers/




const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  databaseURL: env.databaseURL,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId
};
// Initialize Firebase





const Stack = createStackNavigator();



type Props = {};



export default class App extends Component<Props> {

  constructor(props:Props){
    super(props)
  }

  render(){
    return (
      <Provider store={store}>

        <NavigationContainer>


      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Topic" component={Topic} />
        <Stack.Screen name="Publish" component={Publish} />
        <Stack.Screen name="Idea" component={Idea} />
        <Stack.Screen name="Feature" component={Feature} />



      </Stack.Navigator>

    </NavigationContainer>
    </Provider>

    );

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


