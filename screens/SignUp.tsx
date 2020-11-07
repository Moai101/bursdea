import React from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableHighlight,
  TextInput
} from 'react-native';
import  appReducer from '../reducers/Reducer'
import { createStore } from 'redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
// import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
      email:string;
      password:string;

  }

  export class SignUp  extends React.Component<Props,State> {

    constructor(props){
      super(props)

      this.state = {
          email:"",
          password:""
      }



    }

    onPress(){

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.email).then(function(){

            console.log("success")


        }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
           
            console.log(error)
            // ...
          });



    }

    emailTextChange(text:string){

        this.setState({email:text})

    }

    passwordTextChange(text:string){

        this.setState({password:text})
        

    }

    render(){
      let bgColor = '#00B900';

      return(

        <View
        style={styles.backgroundImage}
        >
            <Text>Sign up</Text>

            <TextInput 
                value={this.state.email}
                onChangeText={this.emailTextChange.bind(this)}
                placeholder={'Enter Email'}
                style={{ width: 200, height: 44, padding: 8 }}
                multiline
                />
                                <TextInput 
                value={this.state.password}
                onChangeText={this.passwordTextChange.bind(this)}
                placeholder={'Enter Password'}
                style={{ width: 200, height: 44, padding: 8 }}
                multiline
                />
                
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
    backgroundImage: {
      ...StyleSheet.absoluteFillObject,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 70,
      }
  });