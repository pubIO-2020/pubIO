import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./Colors";

import { CrawlContext } from "./Context";

export default function DrawerContent(props) {
  const crawlcontext = useContext(CrawlContext);

  // dark mode toggle state
  const [isEnabled, setIsEnabled] = useState(false);
  const darkModeToggleSwitch = () =>
    setIsEnabled((previousState) => !previousState);

  const STORAGE_TOKEN = "@token";

  // Set Token Logged out Token in async storage
  const saveToken = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_TOKEN, "false");
    } catch (e) {
      console.log("Failed to save the data to the storage");
    }
  };

  return (
    <LinearGradient colors={["transparent", "rgba(0,0,0,0.1)"]}>
      <View style={styles.settingsView}>
        <Image
          style={styles.profileImage}
          source={require("../assets/alcohol.png")}
          resizeMode="cover"
        />
        <Text style={styles.profileName}>{crawlcontext[2]["username"]}</Text>
        <View
          style={{
            borderBottomWidth: 1,
            width: "90%",
            marginTop: 3,
            borderColor: "lightgray",
          }}
        ></View>
        <View style={styles.settingsContainer}>
          <View style={styles.darkToggle}>
            <Text style={{ marginRight: 5 }}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#767577", true: "black" }}
              thumbColor={isEnabled ? "gray" : "#f4f3f4"}
              onValueChange={darkModeToggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={styles.adminLogoutContainer}>
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.colors.primary,
                margin: 10,
              }}
            >
              Switch to admin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // set token to null
              saveToken();
              // this doc was a life safer for navigating to parent login view https://reactnavigation.org/docs/navigation-prop/
              props.navigation.popToTop();
            }}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.4)"]}
              style={styles.logout}
            >
              <View style={styles.logoutContainer}>
                <Ionicons name="md-log-out" size={20} color="white" />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    backgroundColor: "lightgray",
    borderRadius: 75,
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "gray",
    alignSelf: "center",
  },
  profileName: {
    fontWeight: "bold",
    marginTop: 3,
  },

  darkToggle: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingsContainer: {
    alignSelf: "center",
    marginTop: 50,
  },

  logout: {
    backgroundColor: Colors.colors.primary,
    width: "80%",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutText: { color: "white", fontWeight: "bold", marginLeft: 3 },
  adminLogoutContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  settingsView: { paddingTop: 35, alignItems: "center", height: "100%" },
});
