import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./Header";
import CardScrollView from "./CardScrollView"

export default function User() {
  return (
    <View>
      <Header />
      <View>
        <CardScrollView />
      </View>
    </View>
  );
}
