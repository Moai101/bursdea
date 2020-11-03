import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StyleSheet, 
  TouchableHighlight,
} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IdeaList }  from '../elements/Home/IdeaList'
import { Rank } from '../elements/Home/Rank'
import { YourIdea } from '../elements/Home/YourIdea'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();



interface Props {
  navigation: any
  route:any
}


interface State {
  actions:{
    text:string,
    icon:JSX.Element,
    name:string,
    position:number
  }[]

}


  export class Topic extends React.Component<Props,State>{
    constructor(props){
      super(props)
      console.log(this.props.route.params.postId)
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
        ]
  
  
      }


    }

    start(){

    }



    render(){

      return (

    
    
<Tab.Navigator
      initialRouteName="ideas"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen
        name="Ideas"
        component={IdeaList}
        options={{ tabBarLabel: 'Every Ideas' }}
      />
      <Tab.Screen
        name="Rank"
        component={Rank}
        options={{ tabBarLabel: 'Rank' }}
      />
      <Tab.Screen
        name="Profile"
        component={YourIdea}
        options={{ tabBarLabel: 'Your ' }}
      />
    </Tab.Navigator>





      )
    }


  } 
  