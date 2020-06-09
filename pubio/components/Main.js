import React from "react";
import { StyleSheet, Image } from "react-native";
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
              return (
                <Image style={{height: 40, tintColor: color, marginBottom: -6}} source={require('../assets/pubioBeerB.png')} resizeMode="contain"/>
              )
            } else if (route.name === "User") {
              return <Ionicons name={'md-person'} size={size} color={color} />;
            }
            // return <Ionicons name={iconName} size={size} color={color} />;
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
