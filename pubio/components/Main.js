import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import User from "./User";
import Colors from './Colors'

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        backBehavior="none"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "md-beer" : "md-beer";
            } else if (route.name === "User") {
              iconName = focused ? "md-person" : "md-person";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.colors.primary,
          inactiveTintColor: Colors.colors.gray,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
