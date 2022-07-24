import MapView, {Marker, Region} from 'react-native-maps';
import BusRoute from "../types/BusRoute";
import MapViewDirections, {MapViewDirectionsDestination, MapViewDirectionsOrigin} from 'react-native-maps-directions';
import {REACT_APP_GOOGLE_KEY} from '@env';
import BusStop from "../types/BusStop";

export interface Props {
  busRoutes: BusRoute[];
  routeSelection: string | undefined;
  startSelection: string | undefined;
  finishSelection: string | undefined;
  prediction: number | undefined;
}

const Map = ({
               busRoutes,
               routeSelection,
               startSelection,
               finishSelection,
               prediction
              }: Props) => {
  const getBusRoute = (): BusRoute | undefined => {
    return busRoutes.find((route) => route.id === routeSelection);
  }

  const directionsShouldBeShown = () => {
    return startSelection && finishSelection && prediction;
  }

  const currentRoute: BusRoute | undefined = getBusRoute();

  const showDirections = () => {
    if (currentRoute && startSelection && finishSelection) {
      const currentStart = currentRoute.bus_stops.find((bus_stop) => bus_stop.id === startSelection)
      const currentFinish = currentRoute.bus_stops.find((bus_stop) => bus_stop.id === finishSelection)

      if (!currentStart || !currentFinish) {
        return null;
      }

      const origin: MapViewDirectionsOrigin = {
        latitude: parseFloat(currentStart.latitude),
        longitude: parseFloat(currentStart.longitude)
      }

      const destination: MapViewDirectionsDestination = {
        latitude: parseFloat(currentFinish.latitude),
        longitude: parseFloat(currentFinish.longitude)
      }

      return <>
        <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={REACT_APP_GOOGLE_KEY}
        strokeWidth={3}
        strokeColor={'blue'}
       />
        <Marker
          coordinate={{
            longitude: origin.longitude,
            latitude: origin.latitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          }}
          icon={require('../assets/bus_me_stop.png')}
        />
        <Marker
          coordinate={{
            longitude: destination.longitude,
            latitude: destination.latitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          }}
          icon={require('../assets/bus_me_stop.png')}
        />
      </>
    } else {
      return null;
    }
  }

  const selectionRegion: Region = {
    latitude: 53.08047559137039,
    longitude: -6.255868208190408,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5
  }

  return (
    <MapView
      style={{height: '100%', width: '100%'}}
      initialRegion={selectionRegion}
      >
      {
        (currentRoute && !prediction) ? currentRoute.bus_stops.map((stop) =>
          <Marker
              coordinate={{
                longitude: stop.longitude,
                latitude: stop.latitude,
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
              }}
              icon={require('../assets/bus_me_stop.png')}
          />
         ) : null
      }
      {
        (directionsShouldBeShown()) ? showDirections() : null
      }
    </MapView>
  );
};

export default Map;
