import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import Header from "../Header";

export default function Cardview({navigation}) {
  return (
    <View>
      <Header />
      <View>
          <Button onPress= {function() {navigation.navigate("Cardview")}} title="Card View"/>
          <Button onPress= {function() {navigation.navigate("Mapview")}} title="Map View"/>
        <Text>Cardview</Text>
        </View>
    </View>
  );
}