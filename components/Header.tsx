import {Appbar} from "react-native-paper";

// Please see core repository for comments and sources - the code is largely the same and has been
// tweaked slightly in line with React Native.

const Header = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title={'BusMe! (Beta)'}/>
    </Appbar.Header>
  );
}

export default Header;