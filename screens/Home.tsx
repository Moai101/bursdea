import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableHighlight} from 'react-native';
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


  export class Home  extends React.Component<Props> {

    constructor(props){
      super(props)


    }

    render(){
      // const navigation = useNavigation();
      let bgColor = '#E31676';


      return(

        <View>

        <FlatList
  data={[
  {key: 'Devin'},
  {key: 'Dan'},
  {key: 'Dominic'},
  {key: 'Jackson'},
  {key: 'James'},
  {key: 'Joel'},
  {key: 'John'},
  {key: 'Jillian'},
  {key: 'Jimmy'},
  {key: 'Julie'},
  ]}
  renderItem={({item}) => 
  
  
  
  <TouchableHighlight 
  onPress={() => this.props.navigation.navigate('Details',{text:item.key})} 
  underlayColor="black">
  <Text
  style={styles.item}
  >{item.key}</Text>
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