// Viewだけを管理する
import { View, Text, Button, StyleSheet } from 'react-native';
import * as React from 'react';
import  appReducer from '../reducers/Reducer'
import { createStore } from 'redux';
import { addCount, reset } from '../actions/Count'
  const store = createStore(appReducer);

export interface CounterProps {
  value?: number;
  addCount?: (val: number) => void;
  reset?: () => void;
}

const Counter: React.SFC<CounterProps> = (props: CounterProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.countText}>{store.getState()["counter"]["value"] || 0}</Text>
      <View style={styles.buttons}>
        <Button
          title="increment"
          onPress={() => {
            if (props.addCount){
              props.addCount(1);
              console.log(JSON.stringify(store.getState()))
              store.dispatch(addCount(1))
              console.log(JSON.stringify(store.getState()))

            } 
          }}
        />
        <Button
          title="reset"
          onPress={() => {
            if (props.reset){

              props.reset();
              store.dispatch(reset())



            } 
          }}
        />
      </View>
    </View>
  );
};

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

export default Counter;