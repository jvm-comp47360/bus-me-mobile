import Main from './components/Main';
import { Provider as PaperProvider } from 'react-native-paper';

// Note: The majority of the code is reworked from the core BusMe repository.
// Please see the BusMe repository for sources for the code - in particular,
// the Main.tsx component shares a lot of similarities with the core codebase.

// Other sources used:
// React native paper documentation: https://callstack.github.io/react-native-paper/
// React native maps documentation: https://github.com/react-native-maps/react-native-maps
// React native documentation: https://reactnative.dev/docs/getting-started
// React expo documentation: https://docs.expo.dev/

export default function App() {
  return (
    <PaperProvider>
      <Main/>
    </PaperProvider>
  );
}
