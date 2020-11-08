import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import env from '../env.json';
import * as firebase from 'firebase';
import 'firebase/firestore';



interface Props {
    navigation: any
    route:any
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

interface State {
  feature:string;
  data:any;
  points:number
}

  export class Feature extends React.Component<Props,State> implements Function {
      constructor(props){
          super(props)

          this.state = {
            feature:"",
            data:null,
            points:0
          }

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


      featureTextChange(text:string){

        this.setState({feature:text})

      }

    onPress(){

      let user = this.state.data.users["Dr3hsLjWSLdplUzTPS54SIBCmgo2"]
  
      
      let points = user["points"]

      points = points + 1

      let features = user["features"]

      let feature = {
        "body":this.state.feature,
        "comments":{}
      }


      
      
      features.push(feature)
      

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
      
      this.setState({feature:"",points:points})

      }

      render(){

        return (

            <View>

              <Text>Timer:</Text>
              <Text>Your points:{this.state.points}</Text>
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