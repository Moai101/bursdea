import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight} from 'react-native';



interface Props {
    navigation: any
    route:any
  }

  export class YourIdea extends React.Component<Props> {
      constructor(props){
          super(props)

      }

      render(){

        return (

            <View>
                <Text>
                    your idea
                </Text>
            </View>
        )
      }
  }