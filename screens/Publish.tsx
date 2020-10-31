import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import React,{ Component} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
import  appReducer from '../reducers/Reducer'
import { createStore } from 'redux';
import { addCount } from '../actions/Count';
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
  press:() => void;
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
    // console.log(JSON.stringify(store.getState()))
    // store.dispatch(addCount(1))
    // console.log(JSON.stringify(store.getState()))

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

  press(){

  db.collection("posts").add({
    userId: "Ada",
    win: this.state.win,
    wni: this.state.wni
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
        <Button onPress={this.press.bind(this)} title="Publish" />


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