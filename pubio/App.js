import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from "./components/DrawerContent";
import Main from "./components/Main";
import Loginview from "./components/screens/Loginview";

import { CrawlContext } from "./components/Context";

import firebase from "./Firebase";

console.ignoredYellowBox = ["Setting a timer"];

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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [crawlcard, setCrawlcard] = useState();
  const [currentuser, setCurrentuser] = useState();

  const db = firebase.firestore();
  const crawlRef = db.collection("crawls").doc("crawls");

  useEffect(() => {
    crawlRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          let crawlArray = [];

          for (let crawl in doc.data()) {
            crawlArray.push(doc.data()[crawl]);
          }
          console.log(doc.data());
          setCrawlcard(crawlArray);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <CrawlContext.Provider value={[crawlcard, setCrawlcard]}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, animationEnabled: false }}
        >
          <Stack.Screen name="Loginview" component={Loginview} />
          <Stack.Screen name="Mainview" component={Mainview} />
        </Stack.Navigator>
      </NavigationContainer>
    </CrawlContext.Provider>
  );
}
