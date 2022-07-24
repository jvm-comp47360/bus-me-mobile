import MapView from 'react-native-maps';

const Map = () => {
  return (
    <MapView
      style={{height: '100%', width: '100%'}}
      initialRegion={{
        latitude: 53.22947559137039,
        longitude: -6.269868208190408,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }}
    />
  );
};

export default Map;
