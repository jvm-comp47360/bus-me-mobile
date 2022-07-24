import DropDown from "react-native-paper-dropdown";
import {Dispatch, SetStateAction, useState} from "react";
import MOCK_BUS_ROUTES from '../mockdata/MOCK_BUS_ROUTES.json';
import BusRoute from "../types/BusRoute";



interface Props {
  busRoutes: BusRoute[];
  routeSelection: string | undefined;
  setRouteSelection: Dispatch<SetStateAction<string | undefined>>;
}



  const BusRouteDropdown = ({
                          busRoutes,
                          routeSelection,
                          setRouteSelection
                        }: Props) => {
    const [showDropDown, setShowDropdown] = useState(false);

    const getBusRouteOptions = (busRoutes: BusRoute[] | undefined) => {
      if (!busRoutes) {
        return [];
      }

      const busRouteOptions: any[] = [];
      busRoutes.map(route => busRouteOptions.push({
        label: `${route.name} (to ${route.bus_stops[route.bus_stops.length - 1]['name']})`,
        value: route.id}))
      return busRouteOptions;
    }

    return (
      <DropDown
        label={'Route'}
        mode={'outlined'}
        visible={showDropDown}
        onDismiss={() => setShowDropdown(false)}
        showDropDown={() => setShowDropdown(true)}
        value={routeSelection}
        setValue={setRouteSelection}
        list={getBusRouteOptions(busRoutes)}
      />
    );
  }

export default BusRouteDropdown;