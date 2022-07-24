import MapView, {Marker} from 'react-native-maps';
import BusRoute from "../types/BusRoute";

export interface Props {
  busRoutes: BusRoute[];
  routeSelection: string | undefined;
}

const Map = ({busRoutes, routeSelection}: Props) => {
  const getBusRoute = (): BusRoute | undefined => {
    return busRoutes.find((route) => route.id === routeSelection);
  }

  const currentRoute: BusRoute | undefined = getBusRoute();

  return (
    <MapView
      style={{height: '100%', width: '100%'}}
      initialRegion={{
        latitude: 53.22947559137039,
        longitude: -6.269868208190408,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3
      }}
      >
      {(currentRoute) ? currentRoute.bus_stops.map((stop) =>
        <Marker coordinate={{
          longitude: stop.longitude,
          latitude: stop.latitude,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
        />
      ) : null}
    </MapView>
  );
};

export default Map;
