import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import  appReducer from '../../reducers/Reducer'
import { createStore } from 'redux';
import { addIdea } from '../../actions/Idea'

const store = createStore(appReducer);




interface Props {
    navigation: any;
    route:any;
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
    }[]
  
  }


  export class IdeaList extends React.Component<Props,State> {
      constructor(props){
          super(props)
          console.log(this.props.ideas)          
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

            <View
            style={styles.backgroundImage}
            >
                <Text>
                    {this.props.win}
                </Text>
        <Text>{this.props.postId}</Text>
                <FloatingAction
    actions={this.state.actions}
    onPressItem={name => {
      if(name === 'idea'){

            this.props.navigation.navigate('Idea',{postId:this.props.postId})
     
      } else {

        this.props.navigation.navigate('Feature',{text:"a"})

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


