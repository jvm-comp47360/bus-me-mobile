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
  const [routeSelection, setRouteSelection] = useState<string | undefined>();

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
      <BusStopDropdown
        busRoutes={busRoutes}
        routeSelection={routeSelection}
        label={'Start'}
      />
      <BusStopDropdown
        busRoutes={busRoutes}
        routeSelection={routeSelection}
        label={'Finish'}
      />
      <Map/>
    </View>
  );
}

export default Main;