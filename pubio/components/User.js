import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Userview from "./screens/Userview";
import Details from "./screens/Details";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();
const UserStack = createStackNavigator();

function UserScreen({ navigation }) {
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

export default function User() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        edgeWidth={60}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{ backgroundColor: "whitesmoke", width: 240 }}
        drawerPosition="right"
      >
        <Drawer.Screen name="UserScreen" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
