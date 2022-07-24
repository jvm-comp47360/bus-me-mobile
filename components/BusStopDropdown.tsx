import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
import MOCK_BUS_ROUTES from "../mockdata/MOCK_BUS_ROUTES.json";
import BusRoute from "../types/BusRoute";


export interface Props {
  busRoutes: BusRoute[];
  routeSelection: string | undefined;
  label: string,
}

const BusStopDropdown = ({busRoutes, routeSelection, label}: Props) => {
  const [busStop, setBusStop] = useState<string>("");
  const [showDropDown, setShowDropdown] = useState(false);

  const getBusStops = (busRoutes: BusRoute[], routeSelection: string | undefined) => {
    if (!routeSelection) {
      return [];
    }

    const currentRoute: BusRoute | undefined = busRoutes.find((route) => route.id === routeSelection);

    if (currentRoute) {
      const busStopOptions: any[] = [];
      currentRoute.bus_stops.map(busStop => busStopOptions.push({
        label: `${busStop.name}, Stop No.${busStop.number}`,
        value: busStop.id}))
      return busStopOptions;
    }

    return [];
  }

  return (
    <DropDown
      label={label}
      mode={'outlined'}
      visible={showDropDown}
      onDismiss={() => setShowDropdown(false)}
      showDropDown={() => setShowDropdown(true)}
      value={busStop}
      setValue={setBusStop}
      list={getBusStops(busRoutes, routeSelection)}
    />
  );
}

export default BusStopDropdown;