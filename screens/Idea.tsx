import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';

interface Props {
    navigation: any
    route:any
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

  export class Idea extends React.Component<Props> {
      constructor(props){
          super(props)

      }
    
      press(){
        db.collection("posts").add({
            userId: "idea",
            win: "test",
            wni: "test"
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
                <Text>
                    {/* {this.props.route.params.text} */}
                    Idea
                </Text>
                <Button
                onPress={this.press}
                title="Post your idea"
                >
                </Button>
            </View>
        )
      }
  }