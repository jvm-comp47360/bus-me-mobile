import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
import MOCK_BUS_ROUTES from "../mockdata/MOCK_BUS_ROUTES.json";


export interface Props {
  label: string,
}

const BusStopDropdown = ({label}: Props) => {
  const [busStop, setBusStop] = useState<string>("");
  const [showDropDown, setShowDropdown] = useState(false);

  const getBusStops = () => {
    const busStopOptions: any[] = [];
    MOCK_BUS_ROUTES[1]['bus_stops'].map(busStop => busStopOptions.push({label: busStop.name, value: busStop}))
    return busStopOptions;
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
      list={getBusStops()}
    />
  );
}

export default BusStopDropdown;