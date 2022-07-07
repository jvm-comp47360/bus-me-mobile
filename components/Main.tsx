import {View} from "react-native";
import Map from "./Map";
import Header from "./Header";
import BusRouteDropdown from "./BusRouteDropdown";

export default function Main() {
  return (
    <View>
      <Header/>
      <BusRouteDropdown/>
      <Map/>
    </View>
  );
}