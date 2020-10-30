import React from 'react';
import env from './env.json';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/Home'
import { Detail } from './screens/Detail'
import Publish  from './screens/Publish'
import * as Analytics from 'expo-firebase-analytics';
import firebase from 'firebase';


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
  // const db = firebase.firestore();
//   db.collection("test").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {

//     console.error("Error adding document: ", error);
// });
Analytics.logEvent('share', {
  contentType: 'text', 
  itemId: 'Expo rocks!', 
  method: 'facebook'
})


};






export default class App extends React.Component {

  render(){
    return (
      <NavigationContainer>
        <Button onPress={recordOnPressLog} title="Record Log Event" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Detail} />
        <Stack.Screen name="Publish" component={Publish} />


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


