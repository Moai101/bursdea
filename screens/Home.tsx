import React from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  TouchableHighlight
} from 'react-native';
import  appReducer from '../reducers/Reducer'
import { createStore } from 'redux';
import * as firebase from 'firebase';
import 'firebase/firestore';
import env from '../env.json';
// import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header, Button } from 'react-native-elements';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Divider } from 'react-native-elements';

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
    isFetching:boolean

  }

  function Feed({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
        <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      </View>
    );
  }
  
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
  
  const Drawer = createDrawerNavigator();
  
  function MyDrawer() {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Feed" component={Feed} />
      </Drawer.Navigator>
    );
  }



  export class Home  extends React.Component<Props,State> {

    constructor(props){
      super(props)

      this.state = {
        data:[],
        isFetching: false
      }

    this.getData()


    }


    async onRefresh() {
      const querySnapshot = await db.collection("posts").get()

      const data:Data[] = []

      querySnapshot.forEach(doc => {
        const result:Data = {...doc.data(), ...{"postId": doc.id}}
        data.push(result);
      });
      this.setState({ isFetching: !this.state.isFetching,data: data });
      this.setState({ isFetching: !this.state.isFetching });

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
      let bgColor = '#00B900';

      return(

        <View
        style={styles.backgroundImage}
        >
        <FlatList
          data={this.state.data}
          extraData={this.state.data}
          keyExtractor={(item) => item.postId}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          renderItem={({item}) => 
          <View>
          <TouchableHighlight 
          onPress={() => this.props.navigation.navigate('Topic',{
            authorId:item.authorId,
            win:item.win,
            wni:item.wni,
            postId:item.postId,
            ideas:item.ideas

          })} 
          underlayColor="black">
          <Text
          style={styles.item}
          >{item.win}</Text>
          </TouchableHighlight>
            <Divider />
            </View>
          
          }
          />
        
  
      <TouchableHighlight 
      style={[styles.container]} 
      onPress={() => this.props.navigation.navigate('Publish')} 
      underlayColor="transparent">
  <View style={[styles.circleButton, { backgroundColor: bgColor }]}>
  <Icon name="pen" size={30}/>
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
    backgroundImage: {
      ...StyleSheet.absoluteFillObject,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 70,
      }
  });