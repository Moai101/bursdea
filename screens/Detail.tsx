import React from 'react';
import { 
  Text, 
  View, 
  Button, 
  StyleSheet, 
  TouchableHighlight,
} from 'react-native';
import { FloatingAction } from "react-native-floating-action";


interface Props {
  navigation: any
  route:any
}


  export class Detail extends React.Component<Props>{
    constructor(props){
      super(props)
      this.state = {

        actions:[
          {
            text: "Write down features",
            icon: require("../assets/favicon.png"),
            name: "feature",
            position: 2
          },
          {
            text: "Post your idea",
            icon: require("../assets/favicon.png"),
            name: "idea",
            position: 1
          }
        ]
  
  
      }


    }



    render(){

      return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Details Screen</Text>
         <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button title="Go to Home" onPress={() => this.props.navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
        <FloatingAction
    actions={this.state.actions}
    onPressItem={name => {
      if(name === 'idea'){
        console.log(name)
       
        this.props.navigation.navigate('Idea',{text:this.props.route.params.text})
     
      } else {

        console.log(name)

        this.props.navigation.navigate('Feature',{text:this.props.route.params.text})

      }
    }}
  />
    <Text>{this.props.route.params.text}</Text>
      </View>


      )
    }


  } 
  