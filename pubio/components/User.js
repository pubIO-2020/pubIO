import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./Header";
import CardScrollView from "./CardScrollView";

export default function User({ route }) {
  return (
    <View>
      <Header routename={route.name} />
      <View>
        <CardScrollView />
      </View>
    </View>
  );
}
