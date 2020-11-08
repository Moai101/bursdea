import React,{ Component} from 'react';
import env from './env.json';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { DrawerActions } from '@react-navigation/routers'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './screens/Home'
import { Topic } from './screens/Topic'
import { Idea } from './screens/Idea'
import { Feature } from './screens/Feature'
import { SignIn } from './screens/SignIn'
import { SignUp } from './screens/SignUp'
import { EditProfile } from './screens/EditProfile'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as Analytics from 'expo-firebase-analytics';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Provider } from 'react-redux';
import { Publish } from './screens/Publish'
import  appReducer from './reducers/Reducer'
import { createStore } from 'redux';


  const store = createStore(appReducer);

  // https://reactnavigation.org/docs/headers/




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
// Initialize Firebase





const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();



export default class App extends Component {

  constructor(props){
    super(props)
  }

  openDrawer(){

    const { dispatch } = useNavigation()
    dispatch(DrawerActions.openDrawer()) 

  }



  render(){

    return (
      <Provider store={store}>

        <NavigationContainer>


      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Home" 
        component={Home}

        options={({ navigation, route }) => ({

          headerRight: () => (
            <Button
              onPress={() => 
                navigation.navigate("SignIn")
            
            }
              title="Sign In"
              color="#00cc00"
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => 
                navigation.navigate("EditProfile")
            
            }
              title="Edtit Profile"
              color="#00cc00"
            />
          ),
        }
        )}
         />
        <Stack.Screen name="Topic" component={Topic} />
        <Stack.Screen name="Publish" component={Publish} />
        <Stack.Screen name="Idea" component={Idea} />
        <Stack.Screen name="Feature" component={Feature} />
        <Stack.Screen name="SignIn" 
        component={SignIn}
        options={({ navigation, route }) => ({

          headerRight: () => (
            <Button
              onPress={() => 
                navigation.navigate("SignUp")
            
            }
              title="Sign up"
              color="#00cc00"
            />
          ),

        })}
        />
        <Stack.Screen name="EditProfile" 
        component={EditProfile}
        options={({ navigation, route }) => ({

          headerRight: () => (
            <Button
              onPress={() => 
                navigation.navigate("Home")
            
            }
              title="Edit Profile"
              color="#00cc00"
            />
          )

        })}
        />

                <Stack.Screen name="SignUp" 
        component={SignUp}
        />



      </Stack.Navigator>
      

    </NavigationContainer>
    </Provider>

    );

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


