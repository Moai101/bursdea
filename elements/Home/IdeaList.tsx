import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';





function IdeaList(props){
    const actions = [
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

    return (
    <View>

        <Text>
            {JSON.stringify(props)}
        </Text>
        <FloatingAction
    actions={actions}
    onPressItem={name => {
        console.log(name)
    }}
  />
    </View>
    )
  }


  export default IdeaList