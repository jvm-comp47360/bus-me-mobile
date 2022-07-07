import DropDown from "react-native-paper-dropdown";
import {useState} from "react";
export default function BusRouteDropdown() {

  const [color, setColor] = useState<string>("");
  const [showDropDown, setShowDropdown] = useState(false);

  const colorList = [
    {
      label: 'White',
      value: 'white',
    },
    {
      label: 'Red',
      value: 'red',
    },
  ];

  return (
    <DropDown
      label={'Route'}
      mode={'outlined'}
      visible={showDropDown}
      onDismiss={() => setShowDropdown(false)}
      showDropDown={() => setShowDropdown(true)}
      value={color}
      setValue={setColor}
      list={colorList}
    />
  );
}