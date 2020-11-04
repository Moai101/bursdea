import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';




interface Props {
    navigation: any
    route:any
    userId:string
  }
  
  
  interface State {
    actions:{
      text:string,
      icon:JSX.Element,
      name:string,
      position:number
    }[]
  
  }

  export class YourIdea extends React.Component<Props,State> {
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
            style={styles.backgroundImage}
            >
                <FloatingAction
    actions={this.state.actions}
    onPressItem={name => {
      if(name === 'idea'){
       
        this.props.navigation.navigate('Idea',{
          userId:this.props.route.params.userId,
          win:this.props.route.params.win,
          wni:this.props.route.params.wni,
          postId:this.props.route.params.postId
        })
     
      } else {
          console.log("test")

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