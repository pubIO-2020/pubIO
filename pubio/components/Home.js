import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Cardview from "./screens/Cardview";
import Mapview from "./screens/Mapview";

const Stack = createStackNavigator();

export default function Home() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
      >
        <Stack.Screen name="Cardview" component={Cardview} />
        <Stack.Screen name="Mapview" component={Mapview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
