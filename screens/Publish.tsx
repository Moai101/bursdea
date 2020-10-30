import { View, Text, Button, StyleSheet } from 'react-native';
import React,{ Component} from 'react';


export class Publish extends Component {

  render(){
    return (
      <View>
        <Text>test</Text>

      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  countText: {
    flex: 0.2,
    fontSize: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    color: 'black',
  },
  buttons: {
    flex: 0.2,
    flexDirection: 'row',
  },
});

export default Publish;