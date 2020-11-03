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


  export class Detail extends React.Component<Props,State>{
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

    start(){

    }



    render(){

      return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Details Screen</Text>
         {/* <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} /> */}
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

        this.props.navigation.navigate('Feature',{text:this.props.route.params.text})

      }
    }}
  />
    <Text>{this.props.route.params.userId}</Text>

      </View>


      )
    }


  } 
  