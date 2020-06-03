import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";

export default function DrawerContent(props) {
  // dark mode toggle state
  const [isEnabled, setIsEnabled] = useState(false);
  const darkModeToggleSwitch = () =>
    setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.settingsView}>
      <Image
        style={styles.profileImage}
        source={require("../assets/alcohol.png")}
        resizeMode="cover"
      />
      <Text style={styles.profileName}>testprofileName</Text>
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
          <Text style={{ fontWeight: "bold", color: "#2b9eb3", margin: 10 }}>
            Switch to admin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout}>
          <View>
            <Text style={{ color: "white" }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 5,
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
    backgroundColor: "red",
    width: "80%",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  adminLogoutContainer: {
    position: "absolute",
    bottom: 10,
    // alignItems: "center",
    width: "100%",
  },
  settingsView: { paddingTop: 35, alignItems: "center", height: "100%" },
});
