import React from 'react';
import * as Font from 'expo-font';

import { createIconSet } from '@expo/vector-icons';
import { StyleSheet, View, TouchableHighlight } from 'react-native';

function test(){
  console.log("test")
}

class CircleButton extends React.Component {
  state = {
    fontLoaded: false,
  }

  render() {

    let bgColor = '#E31676';
    let textColor = '#fff';







    return (
      <TouchableHighlight style={[styles.container]} onPress={test} underlayColor="transparent">
        <View style={[styles.circleButton, { backgroundColor: bgColor }]}>
          {
            this.state.fontLoaded ? (
              <CustomIcon name={name} style={[styles.circleButtonTitle, { color: textColor }]} />
            ) : null
          }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  circleButton: {
    width: 48,
    height: 48,
    margin: 8,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  circleButtonTitle: {
    fontSize: 24,
    lineHeight: 24,
  },
});

export default CircleButton;