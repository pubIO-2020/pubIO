import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import Header from "../Header";

export default function Mapview({ navigation }) {
  return (
    <View>
      <Header />
      <View>
        <View style={styles.viewstyles}>
          <Button
            onPress={function () {
              navigation.navigate("Cardview");
            }}
            title="Card View"
          />
          <Button
            onPress={function () {
              navigation.navigate("Mapview");
            }}
            title="Map View"
          />
        </View>
        <Text>Map View</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewstyles: {
    flexDirection: "row",
    backgroundColor: "rgba(43, 158, 179, 0.7)",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
});
