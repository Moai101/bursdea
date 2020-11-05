import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
import { IdeaList } from '../elements/Home/IdeaList'
import { Rank } from '../elements/Home/Rank'
import { YourIdea } from '../elements/Home/YourIdea'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CountDown from 'react-native-countdown-component';


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
  authorId:string;

 } 

 interface Function {
   onPress:() => void;
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
            authorId:""
          }


      }

    
      async onPress(){

                this.props.route.params.ideas.forEach(element => {
                  this.state.ideas.push(element)
                  
                      });
              

              
              this.state.ideas.push({title:this.state.title,detail:this.state.detail,userId:"userId"})
              console.log(this.state.ideas)

              db.collection("posts").doc(this.props.route.params.postId).set({
                  authorId: this.props.route.params.authorId,
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

              <Text>Timer:</Text>
              <Text>Your points:</Text>
              <CountDown
        until={10}
        onFinish={() => alert('finished')}
        onPress={() => alert('hello')}
        size={20}
      />
                <TextInput 
                value={this.state.title}
                onChangeText={this.titleTextChange.bind(this)}
                placeholder={'Enter title'}
                style={{ width: 200, height: 44, padding: 8 }}
                multiline
                />
                <TextInput 
                value={this.state.detail}
                onChangeText={this.detailTextChange.bind(this)}
                placeholder={'Enter detail'}
                style={{ width: 200, height: 44, padding: 8 }}
                multiline
                />
                <Button
                onPress={this.onPress.bind(this)}
                title="Post your idea"
                >
                </Button>
            </View>
        )
      }
  }

  const styles = StyleSheet.create({
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
      },

  })