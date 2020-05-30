import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";

export default function App() {
  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text>Hello pubIO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
