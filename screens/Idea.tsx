import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WebView } from 'react-native-webview';
import {Line} from 'react-chartjs-2';






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
  uid:string; 
  title:string;
  detail:string;
  current:Date;
  data:any;
  points:number

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
            uid:"",
            detail:"",
            current: new Date(),
            data:null,
            points:0
          }
          let test:string = this.state.current.toLocaleString()

          this.getData()

          
      }

      async getData(){



        let firestoreData = await db.collection("posts").doc(this.props.route.params.postId).get()
        let data = firestoreData.data()


        let users = data["users"]
  
        if(users["Dr3hsLjWSLdplUzTPS54SIBCmgo2"] === undefined){
  
          users["Dr3hsLjWSLdplUzTPS54SIBCmgo2"] = {
            ideas:[],
            features:[],
            points:0
          }
  
  
        }

        let points = users["Dr3hsLjWSLdplUzTPS54SIBCmgo2"]["points"]
        this.setState({
          data:data,
          points:points
        
        })



      }



    
      onPress(){


  
        let user = this.state.data.users["Dr3hsLjWSLdplUzTPS54SIBCmgo2"]
  
        let ideas = user["ideas"]
        
        let points = user["points"]

        points = points + 5


        console.log(user)


        ideas.push({title:this.state.title,detail:this.state.detail,comments:{}})
        
  
        db.collection("posts").doc(this.props.route.params.postId).update({
            authorId: this.state.data["authorId"],
            win:this.state.data["win"],
            wni:this.state.data["wni"],
            users:this.state.data.users,
            "users.Dr3hsLjWSLdplUzTPS54SIBCmgo2.points":points
  
  
  
        })
        .then(function(res) {
            console.log("Document written with ID: ", res);
  
        })
        .catch(function(error) {
        
            console.error("Error adding document: ", error);
        });
              
              this.setState({title:"",detail:"",points:points})

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

          const html = `
                <html>
                <head></head>
                <body>
                <canvas id="canvas"/>
                </body>
                </html>
              `;


        return (

            <View
            style={styles.container}
            >

        <Text
        style={styles.timer}
        >{this.state.current.toLocaleString()}</Text>
              <Text>Your points:{this.state.points}</Text>
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
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
  },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
      },
      timer:{
        fontSize: 30
      },
      loginWebView: {
        flex: 1,
        marginTop: 30,
        marginBottom: 20
    }

  })