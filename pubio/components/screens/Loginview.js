import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, TextInput } from "react-native-paper";

export default function Loginview({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, width: "85%" }}>
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 28,
            textShadowColor: "rgba(169, 169, 169, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
            color: "#2b9eb3",
          }}
        >
          pubIO
          <Ionicons name="md-beer" size={28} color="gold" />
        </Text>
        <TextInput
          label="Username"
          mode="outlined"
          style={{ marginTop: 10 }}
          theme={{ colors: { primary: "#2b9eb3" } }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: "#2b9eb3" } }}
        />

        <Button
          mode="contained"
          color="#2b9eb3"
          onPress={() => {
            console.log("login");
            Keyboard.dismiss();
            navigation.navigate("Main");
          }}
          style={{ marginTop: 12, height: 50, justifyContent: "center" }}
        >
          Signin
        </Button>
        <Button
          color="#2b9eb3"
          onPress={() => {
            console.log("signup");
            // navigation.navigate("Main");
          }}
          style={{ marginTop: 5, height: 50, justifyContent: "center" }}
        >
          Signup
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
});
