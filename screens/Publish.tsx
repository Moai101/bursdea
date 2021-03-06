import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import React,{ Component} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
import  appReducer from '../reducers/Reducer'
import { createStore } from 'redux';
const store = createStore(appReducer);

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

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);

}

const db = firebase.firestore();



interface Function {
  onPress:() => void;
  winTextChange:(text:string) => void;
  wniTextChange:(text:string) => void;


}

interface State{
  win:string;
  wni:string;
}



export class Publish extends React.Component<{},State> implements Function {

  constructor(props){
    super(props)

    this.state = {
      win:"",
      wni:""
    }
  }

  winTextChange(text:string){
    this.setState({win:text});

  }

  wniTextChange(text:string){
    this.setState({wni:text});

  }

  onPress(){

  db.collection("posts").add({
    authorId: "Id of authenticated user",
    win: this.state.win,
    wni: this.state.wni,
    users:{}
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
        <TextInput
          value={this.state.win}
          onChangeText={this.winTextChange.bind(this)}
          style={{ width: 200, height: 44, padding: 8 }}
          placeholder={'What idea do you need?'}
        />
                <TextInput
          value={this.state.wni}
          onChangeText={this.wniTextChange.bind(this)}
          style={{ width: 200, height: 44, padding: 8 }}
          placeholder={'Why do you need ideas?'}
        />
        <Button onPress={this.onPress.bind(this)} title="Publish" />


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