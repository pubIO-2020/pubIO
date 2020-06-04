import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Card(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate("Details", {
          index: props.crawlIndex,
        });
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          imageStyle={{ borderRadius: 10 }}
          source={{ uri: props.imageURL }}
          style={styles.image}
        >
          <View style={styles.description}>
            <Text style={styles.date}>{props.date}</Text>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.info}>
              <Text style={styles.infotext} numberOfLines={3}>
                {props.info}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    margin: 20,
    marginBottom: 0,
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
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Arial" : "sans-serif",
  },
  title: {
    position: "absolute",
    top: 7,
    left: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Arial" : "sans-serif",
  },
  info: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    overflow: "hidden",
    fontFamily: Platform.OS === "ios" ? "Arial" : "sans-serif",
  },
  infotext: {
    color: "white",
  },
});
