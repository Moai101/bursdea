import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React,{ Component} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';



// Initialize Firebase

type Props = {};




export class Publish extends Component {
  constructor(props:Props){
    super(props)

  }

  press(){
      const db = firebase.firestore();
  db.collection("test").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {

    console.error("Error adding document: ", error);
});


  }
  render(){
    return (
      <View>
        <Text>test</Text>
        <Button onPress={this.press} title="Record Log Event" />


      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  countText: {
    flex: 0.2,
    fontSize: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: 'black',
  },
  buttons: {
    flex: 0.2,
    flexDirection: 'row',
  },
});

export default Publish;