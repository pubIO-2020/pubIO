import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Header from "../Header";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

// export default function Adminview() {
//   return (
//     <View>
//       <Header />
//       <Text>Admin</Text>
//     </View>
//   );
// }
export default function Adminview() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
