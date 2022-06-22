import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../../Utils/Theme';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import useInterval from '../../Hooks';

const CurrentLocation = () => {
  const [currentLat, setcurrentLat] = useState(0);
  const [currenLng, setcurrentLng] = useState(0);
  const [address, setCurrenAddress] = useState([]);
  const [time, setTime] = useState('');

  const previosLocations = useSelector(
    initialState => initialState.previosLocations,
  );
  const dispatch = useDispatch();
  console.log(previosLocations.length);

  const getUserLocation = async location => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if ('granted' === PermissionsAndroid.RESULTS.GRANTED) {
        // do something if granted...
        Geolocation.getCurrentPosition(
          async position => {
            setcurrentLat(position.coords.latitude);
            setcurrentLng(position.coords.longitude);
            fetch(
              'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                position.coords.latitude +
                ',' +
                position.coords.longitude +
                '&key=' +
                'AIzaSyAp0t2YXQ6krqoPMovmWqyE8voH9CTZkes',
            )
              .then(response => response.json())
              .then(responseJson => {
                console.log('CALL NOW ', location.length);
                try {
                  setCurrenAddress(responseJson.results);
                  dispatch({
                    type: 'setPreviousLocations',
                    payLoad: [
                      ...location,
                      {
                        name:
                          responseJson.results[0]?.address_components[0]
                            ?.long_name +
                          ' ' +
                          responseJson.results[0]?.address_components[1]
                            ?.long_name +
                          ' ' +
                          responseJson.results[0]?.address_components[2]
                            ?.long_name +
                          ' ' +
                          responseJson.results[0]?.address_components[3]
                            ?.long_name,
                        time: Date(),
                        id: Date.now(),
                      },
                    ],
                  });

                  setTime(Date());
                } catch (error) {
                  console.log('ERROE', error);
                }
              });
          },

          async error => {
            console.log('Geolocation Error' + error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 10000},
        );
      }
    }
  };
  useInterval(() => {
    getUserLocation(previosLocations);
  }, 300000);
  useEffect(() => {
    getUserLocation(previosLocations);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Text style={{color: '#fff'}}>
          {address[0]?.address_components[0]?.long_name?.charAt(0)}
        </Text>
      </View>
      <View style={{marginStart: 10}}>
        <Text
          style={{fontWeight: '800', flex: 1, width: '80%'}}
          numberOfLines={1}>
          {address[0]?.address_components[0]?.long_name +
            ' ' +
            address[0]?.address_components[1]?.long_name +
            ' ' +
            address[0]?.address_components[2]?.long_name +
            ' ' +
            address[0]?.address_components[3]?.long_name}
        </Text>
        <Text>{time}</Text>
      </View>
    </View>
  );
};

export default CurrentLocation;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingEnd: 10,
    // backgroundColor: 'red',
    // width: '100%',
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: Theme.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
