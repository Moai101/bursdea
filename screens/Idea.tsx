import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';

interface Props {
    navigation: any
    route:any
  }


 interface State {
  userId:string; 
  ideas:{
    title:string;
    detail:string;
    userId:string;
  }[]

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

  export class Idea extends React.Component<Props,State> {
      constructor(props){
          super(props)
          this.state = {
            userId:"",
            ideas:[]
          }

      }

    
      async press(){
        this.setState({ideas:[]})

        let data = await db.collection("posts").doc(this.props.route.params.postId).get()
        data.data()["ideas"].forEach(element => {
          this.state.ideas.push(element)
          
        });
        
        this.state.ideas.push({title:"title",detail:"detail",userId:"userId"})

        db.collection("posts").doc(this.props.route.params.postId).set({
            userId: "idea",
            win:this.props.route.params.win,
            wni:this.props.route.params.wni,
            ideas:this.state.ideas
        })
        .then(function(res) {
            console.log("Document written with ID: ", res);
        })
        .catch(function(error) {
        
            console.error("Error adding document: ", error);
        });

      }



      render(){

        return (

            <View>
                <Text>
                    Idea
                </Text>
                <Text>
                  {this.props.route.params.postId}
                </Text>
                <TextInput 
                
                />
                <Button
                onPress={this.press.bind(this)}
                title="Post your idea"
                >
                </Button>
            </View>
        )
      }
  }