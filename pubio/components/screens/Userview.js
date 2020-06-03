import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../Header";
import CardScrollView from "../CardScrollView";

export default function Userview({ route }) {
  return (
    <View>
      <Header routeuser={route.name} />
      <View>
        <CardScrollView routename={route.name} />
      </View>
    </View>
  );
}
