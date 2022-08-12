import {View} from "react-native";
import Map from "./Map";
import Header from "./Header";
import BusRouteDropdown from "./BusRouteDropdown";
import BusStopDropdown from "./BusStopDropdown";
import {useEffect, useState} from "react";
import BusRoute from "../types/BusRoute";
import {Button, Card, Title} from "react-native-paper";
import BusStop from "../types/BusStop";

type Prediction = {
  prediction: number;
}

const Main = () => {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([])
  const [routeSelection, setRouteSelection] = useState<string | undefined>();
  const [startSelection, setStartSelection] = useState<string | undefined>();
  const [finishSelection, setFinishSelection] = useState<string | undefined>()
  const [prediction, setPrediction] = useState<number | undefined>()

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

  const getSeconds = (date: Date) => {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    return ((60 * hours) + minutes) * 60;
  }

  const getNumStopsSegment = (routeSelection: BusRoute, startSelection: BusStop, finishSelection: BusStop): number => {
    const start_stop_number = routeSelection.bus_stops.indexOf(startSelection)
    const finish_stop_number = routeSelection.bus_stops.indexOf(finishSelection)
    return Math.abs(finish_stop_number - start_stop_number);
  }

  const getPrediction = () => {
    if (!routeSelection || !startSelection || !finishSelection) {
      return;
    }
    const route: BusRoute | undefined = busRoutes.find((route) => route.id === routeSelection);

    if (!route) {
      return;
    }

    const start: BusStop | undefined = route.bus_stops.find((busStop) => busStop.id === startSelection);
    const finish: BusStop | undefined = route.bus_stops.find((busStop) => busStop.id === finishSelection);

    if (!start || !finish) {
      return;
    }

    const num_stops_segment = getNumStopsSegment(route, start, finish);
    const time = getSeconds(new Date()).toString();

    fetch(`http://ipa-002.ucd.ie/api/prediction/${route.name.split(' ')[0]}/${num_stops_segment}/${time}`)
      .then((response) => {
        if (response.ok) {
          return response.json() as Promise<Prediction>;
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        const prediction: number = Math.round(data['prediction'] * 10) / 10
        setPrediction(prediction)
      })
      .catch((error) => console.log(error));
    console.log(prediction)
  }

  const resetSelections = () => {
    setRouteSelection(undefined);
    setStartSelection(undefined);
    setFinishSelection(undefined);
    setPrediction(undefined);
  }

  return (
    <View>
      <Header/>
      {(prediction) ?
        <Card>
          <Card.Content>
            <Title>Your journey time will be:</Title>
            <Title>{prediction} minutes</Title>
          </Card.Content>
          <Button
            mode={"contained"}
            onPress={() => resetSelections()}
          >
            Try a Different Journey!
          </Button>
        </Card>
        :
        <>
        <BusRouteDropdown
          busRoutes={busRoutes}
          routeSelection={routeSelection}
          setStartSelection={setStartSelection}
          setFinishSelection={setFinishSelection}
          setRouteSelection={setRouteSelection}
        />
        <BusStopDropdown
          busRoutes={busRoutes}
          routeSelection={routeSelection}
          selection={startSelection}
          setSelection={setStartSelection}
          label={'Start'}
        />
        <BusStopDropdown
          busRoutes={busRoutes}
          routeSelection={routeSelection}
          selection={finishSelection}
          setSelection={setFinishSelection}
          label={'Finish'}
        />
        <Button
          mode={"contained"}
          onPress={() => getPrediction()}
        >
          BusMe!
        </Button>
      </>
      }
      <Map
        busRoutes={busRoutes}
        routeSelection={routeSelection}
        startSelection={startSelection}
        finishSelection={finishSelection}
        prediction={prediction}
      />
    </View>
  );
}

export default Main;