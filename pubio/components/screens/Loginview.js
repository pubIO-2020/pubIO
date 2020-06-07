import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Keyboard,
  AsyncStorage,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../Colors";
import firebase from "../../Firebase";

import { CrawlContext } from "../Context";

export default function Loginview({ navigation, route }) {
  // async storage tokens
  const STORAGE_TOKEN = "@token";
  const USERNAME_TOKEN = "@username";
  const PASSWORD_TOKEN = "@password";

  // user data from firestore
  const [users, setUsers] = useState();

  // username and password from inputs
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // state for if username or password is invalid
  const [dontmatch, setDontmatch] = useState(false);

  // activity state for login page
  const [activity, setActivity] = useState(true);

  // firestore db instance
  const db = firebase.firestore();

  // firestore db refs
  const usersRef = db.collection("users").doc("users");
  const crawlRef = db.collection("crawls").doc("crawls");

  const crawlcontext = useContext(CrawlContext);

  // get user data and set in current state on component mount
  useEffect(() => {
    usersRef
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
          setUsers(userArray);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  // set crawl data in managed context state & read token
  useEffect(() => {
    crawlRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let crawlArray = [];

          for (let crawl in doc.data()) {
            crawlArray.push(doc.data()[crawl]);
          }
          crawlcontext[1](crawlArray);
          readToken();
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [users]);

  // Set token in async storage
  const saveToken = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_TOKEN, "true");
      await AsyncStorage.setItem(USERNAME_TOKEN, credentials.username);
      await AsyncStorage.setItem(PASSWORD_TOKEN, credentials.password);
    } catch (e) {
      console.log("Failed to save the data to the storage");
    }
  };

  // Read data in async storage
  const readToken = async () => {
    let ut;
    let unt;
    let pwt;
    // added security
    try {
      const userToken = await AsyncStorage.getItem(STORAGE_TOKEN);
      const unToken = await AsyncStorage.getItem(USERNAME_TOKEN);
      const pwToken = await AsyncStorage.getItem(PASSWORD_TOKEN);
      ut = userToken;
      unt = unToken;
      pwt = pwToken;
    } catch (e) {
      console.log("Failed to fetch the data from storage");
    }

    // if user token is true and users state is filled from database confirm if async storage credentials match and navigate to home view
    if (ut !== "false" && users !== undefined) {
      // check if username & password matches in the token
      users.some((creds) => {
        if (creds.username === unt && creds.password === pwt) {
          setActivity(false);
          // set current user state in managed state to logged in user
          crawlcontext[3](credentials);
          navigation.navigate("Mainview");
          // break using return
          return true;
        }
      });
      navigation.navigate("Mainview");
    } else {
      setActivity(false);
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
        setCredentials({ ...credentials, password: "", username: "" });

        // set current user state in managed state to logged in user
        crawlcontext[3](credentials);
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
  if (!activity) {
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
          {/* username input */}
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
          {/* username password */}
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
  } else {
    return (
      // react native activity indicator we can replace later in it's own component and maybe an animated image of our choice
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
});
