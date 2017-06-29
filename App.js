import React from "react";
import {
  StyleSheet,
  Text,
  View,
  // NativeModules,
  NetInfo,
  // Alert,
  // Button,
  Platform,
} from "react-native";
import { isNetworkConnected } from "./networkMonitor";

export default class App extends React.Component {
  state = {
    isConnected: null
  };

  componentDidMount() {
    console.log("first one ", this.state.isConnected);

    NetInfo.isConnected.addEventListener(
      "change",
      this._handleConnectivityChange
    );

    console.log("second ", this.state.isConnected);


    // On Android the listener does not fire on startup
    if (Platform.OS === 'android') {
      NetInfo.isConnected.fetch()
        .then(isConnected => this._handleConnectivityChange(isConnected));
    }

    console.log("third ", this.state.isConnected);
  }

  componentWillUnmount() {
    console.log("did it unmount ", this.state.isConnected);
    NetInfo.isConnected.removeEventListener(
      "change",
      this._handleConnectivityChange
    );
    console.log("it did unmount ", this.state.isConnected);
  }

  _handleConnectivityChange = isConnected => {
    this.setState({
      isConnected
    });
  };

  render() {
    console.log("fourth ", this.state.isConnected);

    return (
      <View style={styles.container}>
        <Text>
            {this.state.isConnected ? 'ON LINE' : 'OFF LINE'}
        </Text>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
