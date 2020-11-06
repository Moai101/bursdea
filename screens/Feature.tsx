import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import env from '../env.json';
import * as firebase from 'firebase';
import 'firebase/firestore';



interface Props {
    navigation: any
    route:any
  }

interface State {
  feature:string;
  features:{
    feature:string,
    userId:string
  }[]
}

interface Function {
  onPress:() => void;
  featureTextChange:(text:string) => void;
}

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

  export class Feature extends React.Component<Props,State> implements Function {
      constructor(props){
          super(props)

          this.state = {
            feature:"",
            features:[],
          }

      }


      featureTextChange(text:string){

        this.setState({feature:text})

      }

     async onPress(){


      let data = await db.collection("posts").doc(this.props.route.params.postId).get()
     
     console.log(this.props.route.params.postId)
      console.log(data.data())

      let features = data.data()["features"]


        features.forEach(element => {
          this.state.features.push(element)
          
              });
      

      
      this.state.features.push({feature:this.state.feature,userId:"userId"})

      db.collection("posts").doc(this.props.route.params.postId).set({
          authorId: data.data()["authorId"],
          win:data.data()["win"],
          wni:data.data()["wni"],
          ideas:data.data()["ideas"],
          features:this.state.features

      })
      .then(function(res) {
          console.log("Document written with ID: ", res);

      })
      .catch(function(error) {
      
          console.error("Error adding document: ", error);
      });
      
      this.setState({feature:""})

      }

      render(){

        return (

            <View>

              <Text>Timer:</Text>
              <Text>Your points:</Text>
              <TextInput
              value={this.state.feature}
              placeholder={'Enter feature'}
              onChangeText={this.featureTextChange.bind(this)}
              />
              <Button onPress={this.onPress.bind(this)}
              title="test"
              />


            </View>
        )
      }
  }