import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Userview from "./screens/Userview";
import Details from "./screens/Details";

const UserStack = createStackNavigator();

export default function User() {
  return (
    <NavigationContainer independent={true}>
      <UserStack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
      >
        <UserStack.Screen name="Userview" component={Userview} />
        <UserStack.Screen name="Details" component={Details} />
      </UserStack.Navigator>
    </NavigationContainer>
  );
}
