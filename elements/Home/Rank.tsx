import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../../env.json';
import { Divider } from 'react-native-elements';




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
    rank:any

  
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
            users:{},
            rank:[]
      
      
          }

      }
      

      async getData(){

        let firestoreData = await db.collection("posts").doc(this.props.route.params.postId).get()
        let data = firestoreData.data()

        let users = data["users"]

        let num = 0

        let rank = this.state.rank


        this.setState({
          data:data,
          users:users
        
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

        <FlatList 
        data={Object.keys(this.state.users)} 
        keyExtractor={(item) => item}
        renderItem={({ item }) =>
        <View>
          <Text>{item}</Text>
          <Text>{this.state.users[item].points}</Text>
          <Divider />

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

  const renderPerson = ({item}: {item: any}) => {

    console.log(item)

    return(
        <View>
            <View>
                <Text>{item}</Text>
            </View>
        </View>
    )
}