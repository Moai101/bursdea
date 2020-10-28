import React from 'react';
import { Text, View, Button, FlatList, StyleSheet, TouchableHighlight} from 'react-native';




 export function Home({ navigation }) {
    let bgColor = '#E31676';
    return (


            <View>
                <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
                

              <TouchableHighlight style={[styles.container]} onPress={() => navigation.navigate('Details')} underlayColor="transparent">
        <View style={[styles.circleButton, { backgroundColor: bgColor }]}>
        </View>
      </TouchableHighlight>
      </View>


    );
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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      }
  });