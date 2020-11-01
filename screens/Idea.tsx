import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight} from 'react-native';



interface Props {
    navigation: any
    route:any
  }

  export class Idea extends React.Component<Props> {
      constructor(props){
          super(props)

      }

      render(){

        return (

            <View>
                <Text>
                    {this.props.route.params.text}
                    Idea
                </Text>
            </View>
        )
      }
  }