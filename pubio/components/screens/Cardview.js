import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

import Header from "../Header";
import CardScrollView from "../CardScrollView";
import Colors from "../Colors";

export default function Cardview({ navigation, route }) {
  return (
    <View>
      <Header />
      <View>
        <LinearGradient
          colors={["rgba(0,0,0,0.2)", "transparent"]}
          style={styles.viewstyles}
        >
          {/* Card View nav button */}
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
                color={route.name === "Cardview" ? "white" : Colors.colors.gray}
              />
              <Text
                style={{
                  color:
                    route.name === "Cardview" ? "white" : Colors.colors.gray,
                  marginLeft: 4,
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
                color={route.name === "Mapview" ? "white" : Colors.colors.gray}
              />
              <Text
                style={{
                  color:
                    route.name === "Mapview" ? "white" : Colors.colors.gray,
                  marginLeft: 4,
                  fontSize: 13,
                }}
              >
                Map View
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <CardScrollView />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewstyles: {
    flexDirection: "row",
    backgroundColor: Colors.colors.primary,
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
    marginRight: 8,
    marginLeft: 8,
  },
});
