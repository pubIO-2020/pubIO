import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";

export default function Header() {
  return (
    <SafeAreaView style={styles.headerStyle}>
      <Text style = {styles.text}>pubIO</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    paddingTop: Platform.OS === "android"? 50:0,
    alignItems: "center",
    height: 100,
    backgroundColor: "#2b9eb3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: Platform.OS === "ios" ? "Arial" : "sans-serif",
  }
});
