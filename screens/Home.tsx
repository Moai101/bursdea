import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableHighlight, Button} from 'react-native';
import  appReducer from '../reducers/Reducer'
import { createStore } from 'redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
// import { createStackNavigator } from 'react-navigation';
  const store = createStore(appReducer);
  

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

  interface Props {
    navigation: any
  }

  interface Data {
    postId: string;

  }

  interface State {
    data:any

  }

  export class Home  extends React.Component<Props,State> {

    constructor(props){
      super(props)

      this.state = {
        data:[]
      }

    this.getData()

    }

    async getData(){


      const querySnapshot = await db.collection("posts").get()

      const data:Data[] = []

      querySnapshot.forEach(doc => {
        const result:Data = {...doc.data(), ...{"postId": doc.id}}
        data.push(result);
      });

      this.setState({ data: data });

    }


    render(){
      let bgColor = '#E31676';


      return(

        <View>
        <FlatList
          data={this.state.data}
          extraData={this.state.data}
          keyExtractor={(item) => item.postId}
          renderItem={({item}) => 
          
          <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('Details',{text:item.postId})} 
          underlayColor="black">
          <Text
          style={styles.item}
          >{item.win}</Text>
          </TouchableHighlight>
          
          }
          />
        
  
      <TouchableHighlight 
      style={[styles.container]} 
      onPress={() => this.props.navigation.navigate('Publish')} 
      underlayColor="transparent">
  <View style={[styles.circleButton, { backgroundColor: bgColor }]}>
  </View>
  </TouchableHighlight>
  </View>


        


      )
    }

  }






  const styles = StyleSheet.create({
    container: {
      width: 64,
      height: 64,
      position: 'absolute',
      bottom: 24,
      right: 24,
    },
    circleButton: {
      width: 48,
      height: 48,
      margin: 8,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    circleButtonTitle: {
      fontSize: 24,
      lineHeight: 24,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 70,
      }
  });