import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import Header from "../Header";
import Colors from "../Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

import { CrawlContext } from "../Context";

export default function Profileimages({ navigation }) {
  const [profileimg, setProfileimg] = useState({
    img: "",
    url: "",
  });

  const crawlcontext = useContext(CrawlContext);
  // users currently will have to unsubscribe and subscribe on the crawl cards to see ther avatars change on the crawl cards
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
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "batman.jpg",
                url: require("../../assets/profileimages/" + "batman.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/batman.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "goku.jpg",
                url: require("../../assets/profileimages/" + "goku.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/goku.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "arial.jpg",
                url: require("../../assets/profileimages/" + "arial.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/arial.jpg")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "darthvader.jpg",
                url: require("../../assets/profileimages/" + "darthvader.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/darthvader.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "soldier76.jpg",
                url: require("../../assets/profileimages/" + "soldier76.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/soldier76.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "monk.png",
                url: require("../../assets/profileimages/" + "monk.png"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/monk.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "wonderwoman.jpg",
                url: require("../../assets/profileimages/" + "wonderwoman.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/wonderwoman.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "bart.png",
                url: require("../../assets/profileimages/" + "bart.png"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/bart.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "futurama.jpg",
                url: require("../../assets/profileimages/" + "futurama.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/futurama.jpg")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "leela.png",
                url: require("../../assets/profileimages/" + "leela.png"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/leela.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "yoda.jpg",
                url: require("../../assets/profileimages/" + "yoda.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/yoda.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileimg({
                ...profileimg,
                img: "greenlantern.jpg",
                url: require("../../assets/profileimages/" +
                  "greenlantern.jpg"),
              })
            }
          >
            <Avatar.Image
              style={styles.avatars}
              size={100}
              source={require("../../assets/profileimages/greenlantern.jpg")}
            />
          </TouchableOpacity>
        </View>
      </View>

      {profileimg.img !== "" && (
        <>
          <Button
            mode="contained"
            style={{ marginTop: 20, width: "80%", alignSelf: "center" }}
            color={Colors.colors.primary}
            // change profile image in state
            onPress={() => {
              navigation.navigate("Main");
              crawlcontext[3]({ ...crawlcontext[2], profile: profileimg.img });
              console.log(crawlcontext[2].profile, "wheee");
            }}
          >
            Change Avatar
          </Button>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "gray" }}>Selected:</Text>
            <Avatar.Image
              style={[styles.avatars, { alignSelf: "center", marginTop: 10 }]}
              size={100}
              source={profileimg.url}
            />
          </TouchableOpacity>
        </>
      )}
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
