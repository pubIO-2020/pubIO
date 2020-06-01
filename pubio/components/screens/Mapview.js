import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Header from "../Header";

export default function Mapview({ navigation, route }) {
  return (
    <View>
      <Header />
      <View>
        <View style={styles.viewstyles}>
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("Cardview");
            }}
            style={styles.icontouchables}
          >
            <View style={styles.iconsviews}>
              <Ionicons
                name="ios-albums"
                size={30}
                color={route.name === "Cardview" ? "white" : "darkgray"}
              />
              <Text
                style={{
                  color: route.name === "Cardview" ? "white" : "darkgray",
                  marginLeft: 2,
                  fontSize: 13,
                }}
              >
                Card View
              </Text>
            </View>
          </TouchableOpacity>

          {/* Map View nav button */}
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("Mapview");
            }}
            style={styles.icontouchables}
          >
            <View style={styles.iconsviews}>
              <Ionicons
                name="ios-pin"
                size={30}
                color={route.name === "Mapview" ? "white" : "darkgray"}
              />
              <Text
                style={{
                  color: route.name === "Mapview" ? "white" : "darkgray",
                  marginLeft: 2,
                  fontSize: 13,
                }}
              >
                Map View
              </Text>
            </View>
          </TouchableOpacity>
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
    // elevation: 8,
    paddingTop: 3,
  },
  iconsviews: {
    flexDirection: "row",
    alignItems: "center",
  },
  icontouchables: {
    marginRight: 5,
    marginLeft: 5,
  },
});
