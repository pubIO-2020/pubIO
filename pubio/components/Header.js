import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function Header() {
  return (
    <SafeAreaView style={styles.headerStyle}>
      <Text>pubio</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 100,
    backgroundColor: "red",
  },
});
