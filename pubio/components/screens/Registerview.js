import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

import { CrawlContext } from "../Context";

import Colors from "../Colors";
import firebase from "../../Firebase";

export default function Registerview({ navigation }) {
  const db = firebase.firestore();
  const userRef = db.collection("usersTest");
  const crawlcontext = useContext(CrawlContext);

  // credentials from inputs
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    reenterpass: "",
    profile: "beer.png",
    settings: { DARKMODE: false },
    subscription: [],
  });

  const [validation, setValidation] = useState({
    email: false,
    username: false,
    fullname: false,
    password: false,
    reenterpass: false,
    registered: false,
  });

  return (
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.03)", "rgba(0,0,0,0.2)"]}
      style={styles.container}
    >
      <View style={{ width: "100%", alignItems: "flex-start" }}>
        {/* Back button */}
        <TouchableOpacity
          style={{
            paddingLeft: 20,
            paddingTop: 5,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="md-arrow-back"
            size={28}
            color={Colors.colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 10, width: "85%" }}>
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
          Registration
        </Text>

        {validation.registered && !validation.fullname && (
          <Text style={{ color: "red", alignSelf: "center", marginTop: 10 }}>
            Fullname must be entered
          </Text>
        )}
        <TextInput
          label="Fullname"
          mode="outlined"
          style={{ marginTop: 10 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.fullname}
          onChangeText={(fn) => {
            setCredentials({ ...credentials, fullname: fn });
            if (fn !== "") {
              setValidation({ ...validation, fullname: true });
            } else setValidation({ ...validation, fullname: false });
          }}
        />
        {validation.registered && !validation.username && (
          <Text style={{ color: "red", alignSelf: "center", marginTop: 10 }}>
            Username must be entered
          </Text>
        )}
        <TextInput
          label="Username"
          mode="outlined"
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.username}
          onChangeText={(un) => {
            setCredentials({ ...credentials, username: un });
            if (un !== "") {
              setValidation({ ...validation, username: true });
            } else setValidation({ ...validation, username: false });
          }}
        />
        {validation.registered && !validation.email && (
          <Text style={{ color: "red", alignSelf: "center", marginTop: 10 }}>
            Email must be entered
          </Text>
        )}
        <TextInput
          label="Email"
          mode="outlined"
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.email}
          onChangeText={(em) => {
            setCredentials({ ...credentials, email: em });
            if (em !== "") {
              setValidation({ ...validation, email: true });
            } else setValidation({ ...validation, email: false });
          }}
        />
        {validation.registered && !validation.password && (
          <Text style={{ color: "red", alignSelf: "center", marginTop: 10 }}>
            Password must be entered
          </Text>
        )}
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.password}
          onChangeText={(pw) => {
            setCredentials({ ...credentials, password: pw });
            if (pw !== "") {
              setValidation({ ...validation, password: true });
            } else {
              setValidation({ ...validation, password: false });
            }
          }}
        />
        {credentials.password !== credentials.reenterpass &&
          validation.registered && (
            <Text style={{ color: "red", alignSelf: "center", marginTop: 10 }}>
              Passwords don't match
            </Text>
          )}
        <TextInput
          label="Re-Enter Password"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.reenterpass}
          onChangeText={(rpw) => {
            setCredentials({ ...credentials, reenterpass: rpw });
          }}
        />
        {/* Register */}
        <Button
          mode="contained"
          color={Colors.colors.primary}
          style={{ marginTop: 12, justifyContent: "center" }}
          onPress={() => {
            //   get users in database and add new user
            setValidation({ ...validation, registered: true });
            if (
              validation.email &&
              validation.fullname &&
              validation.password &&
              credentials.password === credentials.reenterpass
            ) {
              // push new user credentials into firebase
              userRef.doc(credentials.username).set(credentials);

              // loop through all users in database and set them in user context state
              userRef
                .get()
                .then(function (querySnapshot) {
                  let userArray = [];
                  querySnapshot.forEach(function (doc) {
                    userArray.push(doc.data());
                  });
                  crawlcontext[5](userArray);
                })
                .catch(function (error) {
                  console.log("Error getting documents: ", error);
                });

              // navigate to login view
              navigation.navigate("Loginview", {
                username: credentials.username,
              });
            }
          }}
        >
          Register
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
});
