import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../../env.json';




interface Props {
  navigation: any;
  route:any;
  authorId:string;
  postId:string;
  userId:string;
  win:string;
  wni:string;
  ideas:any;
  }
  
  
  interface State {
    actions:{
      text:string,
      icon:JSX.Element,
      name:string,
      position:number
    }[],
    data:any,
    points:number
    users:any

  
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

  export class Rank extends React.Component<Props,State> {

    test = 2
      constructor(props){
          super(props)

     



          this.state = {
  
            actions:[
              {
                text: "Write down features",
                icon: <Icon name="list" size={20}/>,
                name: "feature",
                position: 2
              },
              {
                text: "Post your idea",
                icon: <Icon name="lightbulb" size={20}/>,
                name: "idea",
                position: 1
                
              }
            ],
            data:{},
            points:0,
            users:{}
      
      
          }

      }
      

      async getData(){

        let firestoreData = await db.collection("posts").doc(this.props.route.params.postId).get()
        let data = firestoreData.data()

         await this.setState({
          data:data,
          users:data["users"]
        
        })

    

      }

      componentDidMount(){

        this.getData()
        

   
       
      }

      render(){

        let test1 = "tes"


        return (

            <View
            style={styles.backgroundImage}
            >
              <Text>{JSON.stringify(this.state.users.uid)}</Text>
        <Text>{this.props.route.params.postId}</Text>
            </View>
        )
      }

  }

  const styles = StyleSheet.create({
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
      },

  })