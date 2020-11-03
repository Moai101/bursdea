import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
import { IdeaList } from '../elements/Home/IdeaList'
import { Rank } from '../elements/Home/Rank'
import { YourIdea } from '../elements/Home/YourIdea'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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
  }[],
  title:string;
  detail:string;

 } 

 interface Function {
   press:() => void;
   titleTextChange:(text:string) => void;
   detailTextChange:(text:string) => void;
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

  export class Idea extends React.Component<Props,State> implements Function {
      constructor(props){
          super(props)
          this.state = {
            title:"",
            userId:"",
            ideas:[],
            detail:"",
          }

      }

    
      async press(){
        this.setState({ideas:[]})

        let data = await db.collection("posts").doc(this.props.route.params.postId).get()

        data.data()["ideas"].forEach(element => {
          this.state.ideas.push(element)
          
        });
        
        this.state.ideas.push({title:this.state.title,detail:this.state.detail,userId:"userId"})

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
        this.setState({title:"",detail:""})

      }

      titleTextChange(text:string){

        this.setState({title:text})

      }

      detailTextChange(text:string){

        this.setState({detail:text})


      }



      render(){

        return (

            <View>
                <TextInput 
                value={this.state.title}
                onChangeText={this.titleTextChange.bind(this)}
                placeholder={'Enter title'}
                style={{ width: 200, height: 44, padding: 8 }}
                />
                <TextInput 
                value={this.state.detail}
                onChangeText={this.detailTextChange.bind(this)}
                placeholder={'Enter detail'}
                style={{ width: 200, height: 44, padding: 8 }}
                />
                <Text>{this.state.detail}</Text>
                <Button
                onPress={this.press.bind(this)}
                title="Post your idea"
                >
                </Button>
            </View>
        )
      }
  }