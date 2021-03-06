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
import { Detail }  from '../elements/Home/Detail'
import { IdeaList }  from '../elements/Home/IdeaList'
import { Rank } from '../elements/Home/Rank'
import { YourIdea } from '../elements/Home/YourIdea'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  appReducer from '../reducers/Reducer'
import { createStore } from 'redux';
import { addIdea } from '../actions/Idea'

const store = createStore(appReducer);

const Tab = createMaterialTopTabNavigator();



interface Props {
  navigation: any;
  route:any;
  postId:string;
  userId:string;
  auhorId:string;
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
      store.dispatch(addIdea({
          postId:this.props.route.params.postId,
          userId:this.props.route.params.userId,
          win:this.props.route.params.win,
          wni:this.props.route.params.wni,
          ideas:this.props.route.params.ideas
    
    }))

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

    render(){
      return (

<Tab.Navigator
      initialRouteName="Detail"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#fff' },
      }}
    >

<Tab.Screen
        name="Detail"
        children={()=><Detail 
          navigation={this.props.navigation}
          route={this.props.route}
          authorId={this.props.route.params.authorId}
          postId={this.props.route.params.postId}
          userId={"test"}
          win={this.props.route.params.win}
          wni={this.props.route.params.wni}
          ideas={this.props.route.params.ideas}
          
          />}
        options={{ tabBarLabel: 'Detail' }}
      />
      <Tab.Screen
        name="Ideas"
        children={()=><IdeaList 
          navigation={this.props.navigation}
          route={this.props.route}
          authorId={this.props.route.params.authorId}
          postId={this.props.route.params.postId}
          userId={"test"}
          win={this.props.route.params.win}
          wni={this.props.route.params.wni}
          ideas={this.props.route.params.ideas}
          
          />}
        options={{ tabBarLabel: 'Every Ideas' }}
      />
      <Tab.Screen
        name="Rank"
        children={()=><Rank 
          navigation={this.props.navigation}
          route={this.props.route}
          authorId={this.props.route.params.authorId}
          postId={this.props.route.params.postId}
          userId={"test"}
          win={this.props.route.params.win}
          wni={this.props.route.params.wni}
          ideas={this.props.route.params.ideas}
          
          />}
        options={{ tabBarLabel: 'Rank' }}
      />
      <Tab.Screen
        name="Profile"
        component={YourIdea}
        options={{ tabBarLabel: 'Your Ideas' }}
      />
    </Tab.Navigator>





      )
    }


  } 
  