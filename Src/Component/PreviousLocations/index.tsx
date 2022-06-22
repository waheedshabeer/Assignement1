import {Text, View, FlatList, Button} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const PreviousLocation = () => {
  const previosLocations = useSelector(
    initialState => initialState.previosLocations,
  );
  const dispatch = useDispatch();

  const renderLocations = ({item, index}) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '80%'}}>
          <Text style={{fontWeight: '800'}}>{item?.name}</Text>
          <Text>{item.time}</Text>
        </View>
        <Button
          onPress={() => {
            removeLocation(item.id);
          }}
          title="Remove"
        />
      </View>
    );
  };
  const removeLocation = async id => {
    const filter = await previosLocations.filter(item => {
      return item.id !== id;
    });
    dispatch({type: 'setPreviousLocations', payLoad: filter});
  };
  return (
    <View>
      {previosLocations?.length > 0 ? (
        <FlatList
          data={previosLocations}
          renderItem={renderLocations}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={{alignSelf: 'center'}}>Will be updated soon</Text>
      )}
    </View>
  );
};

export default PreviousLocation;
