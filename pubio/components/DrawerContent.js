import React, { useState, useContext, useEffect } from "react";
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
import { Avatar } from "react-native-paper";

import { CrawlContext } from "./Context";

export default function DrawerContent(props) {
  const crawlcontext = useContext(CrawlContext);

  // dark mode toggle state
  const [isEnabled, setIsEnabled] = useState(false);
  const darkModeToggleSwitch = () =>
    setIsEnabled((previousState) => !previousState);

  const STORAGE_TOKEN = "@token";

  let image = crawlcontext[2].profile;

  const [profileImage, setProfilemage] = useState({
    url: "",
  });

  // set current profile image on mount
  useEffect(() => {
    switch (image) {
      case "monk.png":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/monk.png"),
        });
        break;
      case "bart.png":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/bart.png"),
        });
        break;
      case "batman.jpg":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/batman.jpg"),
        });
        break;
      case "darthvader.jpg":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/darthvader.jpg"),
        });
        break;
      case "futurama.jpg":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/futurama.jpg"),
        });
        break;
      case "goku.jpg":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/goku.jpg"),
        });
        break;
      case "greenlantern.jpg":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/greenlantern.jpg"),
        });
        break;
      case "leela.png":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/leela.png"),
        });
        break;
      case "monk.png":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/monk.png"),
        });
        break;
      case "soldier76.jpg":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/soldier76.jpg"),
        });
        break;
      case "wonderwoman.jpg":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/wonderwoman.jpg"),
        });
        break;
      case "yoda.jpg":
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/yoda.jpg"),
        });
        break;
      default:
        setProfilemage({
          ...profileImage,
          url: require("../assets/profileimages/beer.png"),
        });
    }
  }, [crawlcontext[2]]);

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
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Profileimages");
          }}
        >
          {profileImage.url !== "" && (
            <Avatar.Image
              source={profileImage.url}
              style={styles.avatar}
              size={100}
            />
          )}

          <View
            style={{
              position: "absolute",
              elevation: 20,
              // alignItems: "center",
              bottom: -10,
              right: 0,
              zIndex: 999,
            }}
          >
            <Ionicons
              name="md-construct"
              color={Colors.colors.primary}
              size={30}
              style={{
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowColor: "black",
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                // elevation: 20,
              }}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.profileName}>{crawlcontext[2]["username"]}</Text>

        {/* <View
          style={{
            borderBottomWidth: 1,
            width: "90%",
            marginTop: 3,
            borderColor: "lightgray",
          }}
        ></View> */}
        {/* <View style={styles.settingsContainer}>
          <View style={styles.darkToggle}>
            <Text style={{ marginRight: 5 }}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#767577", true: "black" }}
              thumbColor={isEnabled ? "gray" : "#f4f3f4"}
              onValueChange={darkModeToggleSwitch}
              value={isEnabled}
            />
          </View>
        </View> */}
        <View style={styles.adminLogoutContainer}>
          {crawlcontext[2].admin && (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                props.navigation.navigate("Adminview");
              }}
            >
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
          )}

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
    marginTop: 10,
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
  avatar: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    marginTop: 10,
  },
});
