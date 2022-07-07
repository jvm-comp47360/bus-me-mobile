import MapView from 'react-native-maps';

export default function Map() {
  return (
    <MapView
      style={{height: '50%', width: '100%'}}
      initialRegion={{
        latitude: 53.33947559137039,
        longitude: -6.269868208190408,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    />
  );
};

