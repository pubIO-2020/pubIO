import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Keyboard,
  AsyncStorage,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../Colors";
import firebase from "../../Firebase";

export default function Registerview({ navigation }) {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc("users");

  // username and password from inputs
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
    reenterpass: "",
    settings: { DARKMODE: false },
    subscription: [],
  });

  return (
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.03)", "rgba(0,0,0,0.2)"]}
      style={styles.container}
    >
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

        {/* username input */}
        <TextInput
          label="Fullname"
          mode="outlined"
          style={{ marginTop: 10 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.fullname}
          onChangeText={(fn) => {
            setCredentials({ ...credentials, fullname: fn });
          }}
        />
        {/* username password */}
        <TextInput
          label="Username"
          mode="outlined"
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.username}
          onChangeText={(un) => {
            setCredentials({ ...credentials, username: un });
          }}
        />
        <TextInput
          label="Email"
          mode="outlined"
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.email}
          onChangeText={(em) => {
            setCredentials({ ...credentials, email: em });
          }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.password}
          onChangeText={(pw) => {
            setCredentials({ ...credentials, password: pw });
          }}
        />
        <TextInput
          label="Re-Enter Password"
          mode="outlined"
          secureTextEntry={true}
          style={{ marginTop: 3 }}
          theme={{ colors: { primary: Colors.colors.dark } }}
          value={credentials.reenterpassword}
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
            console.log("register");
            userRef
              .get()
              .then(function (doc) {
                if (doc.exists) {
                  let userArray = [];
                  // loop through objects in firebase data
                  for (let x in doc.data()) {
                    // push data objects to user array
                    userArray.push(doc.data()[x]);
                  }
                  // setUsers state to new userArray array
                  userArray.push(credentials);
                  userRef.set(Object.assign({}, userArray));
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
              })
              .catch(function (error) {
                console.log("Error getting document:", error);
              });
            navigation.navigate("Loginview");
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
    marginTop: 80,
  },
});
