import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Userview from "./screens/Userview";
import Details from "./screens/Details";

const Stack = createStackNavigator();

export default function User({ route }) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
      >
        <Stack.Screen name="Userview" component={Userview} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
