import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';


export interface PublishProps {
    idea: string;

}



export default class Publish extends Component<PublishProps> {
    constructor(props:PublishProps) {
        super(props);
        // this.handleTextChange = this.handleTextChange.bind(this);
      }

    //   handleTextChange(value:String){

    //     this.setState({value:value});

    //   }  

    render(){

        return (
            <View>
                    <TextInput
                        value={this.props.idea}
                        style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1
                        }}
                        // onChangeText={this.handleTextChange}
      />
      <Text>{this.props.idea}</Text>

            </View>

        )

        
    }
}