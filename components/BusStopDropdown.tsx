import DropDown from "react-native-paper-dropdown";
import {Dispatch, SetStateAction, useState} from "react";
import MOCK_BUS_ROUTES from "../mockdata/MOCK_BUS_ROUTES.json";
import BusRoute from "../types/BusRoute";


export interface Props {
  busRoutes: BusRoute[];
  routeSelection: string | undefined;
  selection: string | undefined;
  setSelection: Dispatch<SetStateAction<string | undefined>>;
  label: string,
}

const BusStopDropdown = ({busRoutes, routeSelection, selection, setSelection, label}: Props) => {
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

  const busStopOptions = getBusStops(busRoutes, routeSelection);

  return (
    <DropDown
      label={label}
      mode={'outlined'}
      visible={showDropDown}
      onDismiss={() => setShowDropdown(false)}
      showDropDown={() => setShowDropdown(true)}
      value={selection}
      setValue={setSelection}
      list={busStopOptions}
    />
  );
}

export default BusStopDropdown;