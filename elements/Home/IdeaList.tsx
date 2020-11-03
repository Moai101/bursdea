import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';




interface Props {
    navigation: any
    route:any
    propName:string
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
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                <FloatingAction
    actions={this.state.actions}
    onPressItem={name => {
      if(name === 'idea'){
       
        this.props.navigation.navigate('Idea',{
          userId:this.props.userId,
          win:this.props.win,
          wni:this.props.wni,
          postId:this.props.postId,
        //   ideas:this.props.ideas
        })
     
      } else {
          console.log(JSON.stringify(this.props))

        this.props.navigation.navigate('Feature',{text:"a"})

      }
    }
}
  />
  <Text>{JSON.stringify(this.props)}</Text>
            </View>
        )
      }
  }