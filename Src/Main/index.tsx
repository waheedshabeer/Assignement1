import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import React from 'react';
import CurrentLocation from '../Component/CurrentLocation';
import PreviousLocation from '../Component/PreviousLocations/index';
import {useDispatch, useSelector} from 'react-redux';

const Dashboard = () => {
  const previosLocations = useSelector(
    initialState => initialState.previosLocations,
  );
  const dispatch = useDispatch();
  const clearAllLocation = () => {
    dispatch({type: 'setPreviousLocations', payLoad: []});
  };
  return (
    // <ScrollView>
    <View style={{flex: 1, padding: 10}}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>Current Location</Text>
      <CurrentLocation />
      <Text style={{color: 'black', fontWeight: 'bold'}}>
        Previous Locations
      </Text>
      <PreviousLocation />
      <View
        style={{
          position: 'absolute',
          width: '70%',
          bottom: '5%',
          alignSelf: 'center',
          elevation: 10,
        }}>
        <Button onPress={() => clearAllLocation()} title="Clear All" />
      </View>
    </View>
    // </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
