import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const image = {
  uri:
    "https://cdn.styleblueprint.com/wp-content/uploads/2018/10/mag_bar-e1539184961498.jpg",
};
export default function Card() {
  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={image}
        style={styles.image}
      >
        <View style={styles.description}>
          <Text style={styles.date}>05/31/20</Text>
          <Text style={styles.title}>Bar Crawl 1</Text>
          <View style={styles.info}>
            <Text style={styles.infotext} numberOfLines={4}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.{" "}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "black",
    elevation: 8,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  description: {
    position: "absolute",
    padding: 5,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    height: "40%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  date: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "white",
  },
  title: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
  },
  info: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    overflow: "hidden",
  },
  infotext: {
    color: "white",
  },
});
