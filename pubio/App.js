import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from "./components/DrawerContent";
import Main from "./components/Main";
import Loginview from "./components/screens/Loginview";
import Adminview from "./components/screens/Adminview";
import Profileimages from "./components/screens/Profileimages";
import Registerview from "./components/screens/Registerview";

import { CrawlContext } from "./components/Context";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Mainview() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        edgeWidth={60}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{ backgroundColor: "whitesmoke", width: 240 }}
        drawerPosition="right"
      >
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="Adminview" component={Adminview} />
        <Drawer.Screen name="Profileimages" component={Profileimages} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [crawlcard, setCrawlCard] = useState();
  const [currentuser, setCurrentuser] = useState();
  const [cameraAllowed, setCameraAllowed] = useState(false);
  // user data from firestore
  const [users, setUsers] = useState();
  const [subs, setSubs] = useState();

  return (
    <CrawlContext.Provider
      value={[
        crawlcard,
        setCrawlCard,
        currentuser,
        setCurrentuser,
        users,
        setUsers,
        subs,
        setSubs,
        cameraAllowed,
        setCameraAllowed
      ]}
    >
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animationEnabled: false }}
        >
          <Stack.Screen name="Loginview" component={Loginview} />
          <Stack.Screen name="Registerview" component={Registerview} />
          <Stack.Screen name="Mainview" component={Mainview} />
        </Stack.Navigator>
      </NavigationContainer>
    </CrawlContext.Provider>
  );
}
