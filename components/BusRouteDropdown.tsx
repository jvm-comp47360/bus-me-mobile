import DropDown from "react-native-paper-dropdown";
import {Dispatch, SetStateAction, useState} from "react";
import BusRoute from "../types/BusRoute";



interface Props {
  busRoutes: BusRoute[];
  routeSelection: string | undefined;
  setStartSelection: Dispatch<SetStateAction<string | undefined>>;
  setFinishSelection: Dispatch<SetStateAction<string | undefined>>;
  setRouteSelection: Dispatch<SetStateAction<string | undefined>>;
}

// Please see core repository for comments and sources - the code is largely the same and has been
// tweaked slightly in line with React Native.

  const BusRouteDropdown = ({
                          busRoutes,
                          routeSelection,
                          setStartSelection,
                          setFinishSelection,
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

    const busRouteOptions = getBusRouteOptions(busRoutes);

    return (
      <DropDown
        label={'Route'}
        mode={'outlined'}
        visible={showDropDown}
        onDismiss={() => setShowDropdown(false)}
        showDropDown={() => setShowDropdown(true)}
        value={routeSelection}
        setValue={(_value) => {
            setRouteSelection(_value);
            setStartSelection(undefined);
            setFinishSelection(undefined);
          }
        }
        list={busRouteOptions}
      />
    );
  }

export default BusRouteDropdown;