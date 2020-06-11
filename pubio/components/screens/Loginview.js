import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Keyboard,
  AsyncStorage,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../Colors";
import firebase from "../../Firebase";

import { CrawlContext } from "../Context";
import { set } from "react-native-reanimated";

export default function Loginview({ navigation, route }) {
  // async storage tokens
  const STORAGE_TOKEN = "@token";
  const USERNAME_TOKEN = "@username";
  const PASSWORD_TOKEN = "@password";

  // username and password from inputs
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [displaysuccess, setDisplaysuccess] = useState({
    usernamesuccess: "",
  });

  // state for if username or password is invalid
  const [dontmatch, setDontmatch] = useState(false);

  // activity state for login page
  const [activity, setActivity] = useState(true);

  // firestore db instance
  const db = firebase.firestore();

  // firestore db refs
  const usersRef = db.collection("usersTest");
  const crawlRef = db.collection("crawls").doc("crawls");

  const crawlcontext = useContext(CrawlContext);

  // get user data and set in current state on component mount
  useEffect(() => {
    usersRef
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
  }, []);

  // set crawl data in managed context state & read token
  useEffect(() => {
    if (route.params !== undefined) {
      const { username } = route.params;
      setDisplaysuccess({ ...displaysuccess, usernamesuccess: username });
    }

    setTimeout(() => {
      setDisplaysuccess({ ...displaysuccess, usernamesuccess: "" });
    }, 3000);

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
  }, [crawlcontext[4]]);

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
    if (ut !== "false" && crawlcontext[4] !== undefined) {
      // check if username & password matches in the token
      crawlcontext[4].some((creds) => {
        if (creds.username === unt && creds.password === pwt) {
          setActivity(false);
          // set current user state in managed state to logged in user
          crawlcontext[3](creds);
          navigation.navigate("Mainview");
          // break using return
          return true;
        }
      });
    } else {
      setActivity(false);
    }
  };

  // login functinality on signin button click
  function checkLogin() {
    Keyboard.dismiss();
    crawlcontext[4].some((creds) => {
      if (
        creds.username === credentials.username &&
        creds.password === credentials.password
      ) {
        setCredentials({ ...credentials, password: "", username: "" });

        // set current user state in managed state to logged in user
        crawlcontext[3](creds);
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
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS == "ios" ? 400 : 0}
      >
        {displaysuccess.usernamesuccess !== "" && (
          <View style={styles.success}>
            <Text style={{ color: "green" }}>
              {displaysuccess.usernamesuccess} successfully registered
            </Text>
          </View>
        )}

        <View
          style={{
            marginTop: 120,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              resizeMode: "center",
              width: "80%",
              tintColor: Colors.colors.primary,
              height: 350,
              marginBottom: -20,
            }}
            source={require("../../assets/pubioVertB.png")}
          />

          <View style={{ width: "85%", marginTop: 0 }}>
            {dontmatch && (
              <Text
                style={{ color: "red", alignSelf: "center", marginTop: 10 }}
              >
                Username or Password does not match
              </Text>
            )}
            {/* username input */}
            <TextInput
              label="Username"
              mode="outlined"
              selectionColor="rgba(0, 0, 0, 0.2)"
              style={{ marginTop: 10, minHeight: 20 }}
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
              style={{ marginTop: 3, minHeight: 20 }}
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
              style={{ marginTop: 12, justifyContent: "center", minHeight: 20 }}
            >
              Sign In
            </Button>
            {/* Signup */}
            <Button
              color={Colors.colors.primary}
              onPress={() => {
                // clear validation text and any inputted text
                setDontmatch(false);
                setCredentials({ ...credentials, password: "", username: "" });
                navigation.navigate("Registerview");
              }}
              style={{ marginTop: 5, justifyContent: "center", minHeight: 20 }}
            >
              Sign Up
            </Button>
            {Platform.OS === "android" && <View style={{ height: 400 }}></View>}
          </View>
        </View>
      </KeyboardAvoidingView>
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
    marginTop: Platform.OS === "android" ? 80 : 0,
    paddingBottom: 100,
  },
  success: {
    position: "absolute",
    top: 50,
    borderWidth: 1,
    padding: 10,
    borderColor: "#f7f7f7",
    borderRadius: 10,
    backgroundColor: "#d4edda",
    width: "90%",
    alignItems: "center",
    zIndex: 1500,
    opacity: 0.7,
  },
});
