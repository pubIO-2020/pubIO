import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  AsyncStorage,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../Colors";

export default function Loginview({ navigation, route }) {
  // storage token
  const STORAGE_TOKEN = "@token";

  // on page load read token data
  useEffect(() => {
    readData();
  }, []);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [dontmatch, setDontmatch] = useState(false);

  const [users, setUsers] = useState([
    { username: "codemonk9", password: "Hooper33!@" },
    { username: "admin", password: "admin" },
    { username: "test", password: "test123" },
  ]);

  // Set Loggedin Token in async storage
  const saveToken = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_TOKEN, "loggedin");
      console.log("Loggedin saved");
    } catch (e) {
      console.log("Failed to save the data to the storage");
    }
  };

  // Read data in async storage
  const readData = async () => {
    try {
      const userToken = await AsyncStorage.getItem(STORAGE_TOKEN);
      if (userToken !== "loggedout") {
        console.log("You are logged in");
        navigation.navigate("Mainview");
      }
    } catch (e) {
      console.log("Failed to fetch the data from storage");
    }
  };

  // login functinality on signin button click
  function checkLogin() {
    Keyboard.dismiss();
    users.some((creds) => {
      if (
        creds.username === credentials.username &&
        creds.password === credentials.password
      ) {
        console.log("credentials match");
        setCredentials({ ...credentials, password: "", username: "" });
        setDontmatch(false);
        saveToken();
        navigation.navigate("Mainview");
        // break using return
        return true;
      } else if (
        creds.username !== credentials.username ||
        creds.password !== credentials.password
      ) {
        setDontmatch(true);
      }
    });
  }
  return (
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.03)", "rgba(0,0,0,0.2)"]}
      style={styles.container}
    >
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

        {dontmatch && (
          <Text style={{ color: "red", alignSelf: "center", marginTop: 10 }}>
            Username or Password does not match
          </Text>
        )}

        <TextInput
          label="Username"
          mode="outlined"
          style={{ marginTop: 10 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.username}
          onChangeText={(un) => {
            setDontmatch(false);
            setCredentials({ ...credentials, username: un });
          }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.password}
          onChangeText={(pass) => {
            setDontmatch(false);
            setCredentials({ ...credentials, password: pass });
          }}
        />
        {/* Signin */}
        <Button
          mode="contained"
          color={Colors.colors.primary}
          onPress={checkLogin}
          style={{ marginTop: 12, justifyContent: "center" }}
        >
          Signin
        </Button>
        {/* Signup */}
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
