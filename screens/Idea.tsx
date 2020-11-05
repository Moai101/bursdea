import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
import { IdeaList } from '../elements/Home/IdeaList'
import { Rank } from '../elements/Home/Rank'
import { YourIdea } from '../elements/Home/YourIdea'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


// https://github.com/Alhydra/React-Native-Countdown-Timer-Example-Using-MomentJs/blob/master/App.js

// https://www.wakuwakubank.com/posts/606-javascript-moment/

// 　デバイスから現在の時刻を取得
// https://reactnative-st.com/2020/07/09/%E3%80%90reactnative%E3%80%91%E7%8F%BE%E5%9C%A8%E3%81%AE%E6%97%A5%E4%BB%98%E3%80%81%E6%99%82%E9%96%93%E8%A1%A8%E7%A4%BA%E3%82%92%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/

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
  current:Date;

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
      interval: NodeJS.Timeout;
      constructor(props){
          super(props)
          this.state = {
            title:"",
            userId:"",
            ideas:[],
            detail:"",
            authorId:"",
            current: new Date()
          }
          let test:string = this.state.current.toLocaleString()
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

      componentDidMount() {
        //一秒に一回this.setStateを呼び出す
        this.interval = setInterval(() => (
          this.setState({current:new Date()})
        ), 1000);
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }



      render(){

        return (

            <View>

        <Text
        style={styles.timer}
        >{this.state.current.toLocaleString()}</Text>
              <Text>Your points:</Text>
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
      timer:{
        fontSize: 30
      }

  })