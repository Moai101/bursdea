import React from 'react';
import firebase from 'firebase';
import env from './env.json';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/Home'
import { Detail } from './screens/Detail'
import * as Analytics from 'expo-firebase-analytics';


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

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}




const Stack = createStackNavigator();


const recordOnPressLog = () => {
  Analytics.logEvent('onPress');
  Alert.alert('OnPress');
};





export default class App extends React.Component {

  render(){
    return (
      <NavigationContainer>
        <Button onPress={recordOnPressLog} title="Record Log Event" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Detail} />

      </Stack.Navigator>

    </NavigationContainer>
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


