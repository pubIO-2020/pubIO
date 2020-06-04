import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from "./components/DrawerContent";
import Main from "./components/Main";
import Loginview from "./components/screens/Loginview";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        edgeWidth={60}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{ backgroundColor: "whitesmoke", width: 240 }}
        drawerPosition="right"
      >
        <Drawer.Screen name="Loginview" component={Loginview} />
        <Drawer.Screen name="Main" component={Main} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
