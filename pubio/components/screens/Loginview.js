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
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../Colors'

export default function Loginview({ navigation, route }) {
  return (
    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.03)', 'rgba(0,0,0,0.2)']} style={styles.container}>
      <View style={{ marginTop: 50, width: "85%" }}>
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 28,
            textShadowColor: "rgba(169, 169, 169, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
            color: Colors.colors.primary,
          }}
        >
          pubIO
          <Ionicons name="md-beer" size={28} color={Colors.colors.yellow} />
        </Text>
        <TextInput
          label="Username"
          mode="outlined"
          style={{ marginTop: 10 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
        />

        <Button
          mode="contained"
          color={Colors.colors.primary}
          onPress={() => {
            Keyboard.dismiss();
            navigation.navigate("Mainview");
          }}
          style={{ marginTop: 12, justifyContent: "center" }}
        >
          Signin
        </Button>
        <Button
          color={Colors.colors.primary}
          onPress={() => {
            console.log("signup");
          }}
          style={{ marginTop: 5, justifyContent: "center" }}
        >
          Signup
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
});
