import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight, TextInput} from 'react-native';



export default class Publish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "a",
            test:"test"
        
        };
        this.handleTextChange = this.handleTextChange.bind(this);
      }

      handleTextChange(value:String){

        this.setState({value:value});

      }  

    render(){

        return (
            <View>
                    <TextInput
                        value={this.state.value}
                        style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1
                        }}
                        onChangeText={this.handleTextChange}
      />
      <Text>{this.state.value}</Text>

            </View>

        )

        
    }
}