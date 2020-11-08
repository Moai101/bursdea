import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../../env.json';
import { Divider } from 'react-native-elements';
import { assign } from 'lodash';




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
    rank:any,
    ideas:any

  
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

  export class IdeaList extends React.Component<Props,State> {

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
            users:{},
            rank:[],
            ideas:[]
      
      
          }

      }
      

      async getData(){

        let firestoreData = await db.collection("posts").doc(this.props.route.params.postId).get()
        let data = firestoreData.data()

        let users = data["users"]

        let num = 0

        this.setState({
          data:data,
          users:users
        
        })

        let usersKey = Object.keys(users)
        let ideas = this.state.ideas

        usersKey.forEach(key=>{
          users[key].ideas.forEach(item=>{
            
            Object.assign(item,{"num":String(num)})
            ideas.push(item)
           
            num++

          })
        })


    

      }

      componentDidMount(){

        this.getData()
        

   
       
      }

      render(){



        return (

            <View
            style={styles.backgroundImage}
            >

{/* <Text>{JSON.stringify(this.state.ideas)}</Text> */}

        <FlatList 
        data={this.state.ideas} 
        keyExtractor={(item) => item.num}
        renderItem={({ item }) =>
        <View>
          {/* <Text>{item}</Text> */}
          <Text>{JSON.stringify(item)}</Text>
          <Divider  />

        </View>
      
      }
        />  
                        <FloatingAction
    actions={this.state.actions}
    onPressItem={name => {
      if(name === 'idea'){

            this.props.navigation.navigate('Idea',{
              authorId:this.props.authorId,
              postId:this.props.postId,
              userId:this.props.userId,
              win:this.props.win,
              wni:this.props.wni,
              ideas:this.props.ideas
            })
     
      } else {

        this.props.navigation.navigate('Feature',{postId:this.props.postId})

      }
    }
}
  />

            </View>
        )
      }

  }

  const styles = StyleSheet.create({
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
      },

  })
