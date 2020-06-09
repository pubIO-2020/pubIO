import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import Header from "../Header";
import Colors from "../Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Profileimages({ navigation }) {
  return (
    <View>
      <Header />
      <TouchableOpacity
        style={{ alignItems: "flex-end", marginRight: 10 }}
        onPress={() => navigation.navigate("Main")}
      >
        <Ionicons
          name="md-arrow-forward"
          size={28}
          color={Colors.colors.primary}
        />
      </TouchableOpacity>

      <View style={{ alignItems: "center" }}>
        <Text style={{ color: Colors.colors.primary, margin: 10 }}>
          Select Avatar Image
        </Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/batman.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/goku.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/arial.jpg")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/darthvader.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/soldier76.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/monk.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/wonderwoman.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/bart.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/futurama.jpg")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/leela.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/yoda.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/greenlantern.jpg")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        mode="contained"
        style={{ marginTop: 20, width: "80%", alignSelf: "center" }}
        color={Colors.colors.primary}
        onPress={() => {
          console.log("set picture");
        }}
      >
        Change Avatar
      </Button>

      <TouchableOpacity>
        <Avatar.Image
          style={[styles.avatars, { alignSelf: "center", marginTop: 10 }]}
          size={100}
          source={require("../../assets/profileimages/arial.jpg")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatars: {
    margin: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderWidth: 1,
    borderColor: "lightgray",
  },
});
