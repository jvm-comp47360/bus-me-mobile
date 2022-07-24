import {View} from "react-native";
import Map from "./Map";
import Header from "./Header";
import BusRouteDropdown from "./BusRouteDropdown";
import BusStopDropdown from "./BusStopDropdown";
import {useEffect, useState} from "react";
import BusRoute from "../types/BusRoute";
import BusRouteOption from "../types/BusRouteOption";

const Main = () => {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([])
  const [busRouteOptions, setBusRouteOptions] = useState<BusRouteOption[]>([])
  const [routeSelection, setRouteSelection] = useState<string | undefined>();

  const convertRoutesToOptions = (busRoutes: BusRoute[]) => {
    const busRouteOptions: BusRouteOption[] = [];
    busRoutes.map(route => busRouteOptions.push({
      label: `${route.name} (to ${route.bus_stops[route.bus_stops.length - 1]['name']})`,
      value: route}))
    setBusRouteOptions(busRouteOptions);
  }

  useEffect(() => {
    fetch('http://ipa-002.ucd.ie/api/bus_routes/')
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<BusRoute[]>;
        } else {
          throw new Error();
        }
      })
      .then(setBusRoutes)
      .catch((error) => console.log(error));
  }, [])

  return (
    <View>
      <Header/>
      <BusRouteDropdown
        busRoutes={busRoutes}
        routeSelection={routeSelection}
        setRouteSelection={setRouteSelection}
      />
      <BusStopDropdown label={'Start'}/>
      <BusStopDropdown label={'Finish'}/>
      <Map/>
    </View>
  );
}

export default Main;