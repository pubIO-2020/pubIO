import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  TouchableHighlight,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import Colors from "./Colors";

import { CrawlContext } from "./Context";

export default function Card(props) {
  const crawlcontext = useContext(CrawlContext);
  const navigation = useNavigation();

  console.log();
  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 999,
          top: 50,
          left: 28,
          overFlow: "hidden",
          justifyContent: "center",
        }}
      >
        {crawlcontext[0][props.crawlIndex].subscribed.map((test, index) => {
          return (
            <Avatar.Image
              key={index}
              style={{
                borderWidth: 0.7,
                borderRadius: 50,
                height: 45,
                width: 45,
                position: "absolute",
                zIndex: 999 - index,
                left: index * 20,
                borderColor: "lightgray",
                opacity: index > 0 ? 0.8 : 1,
                overFlow: "hidden",
                backgroundColor: "lightgray",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowColor: "black",
                shadowOpacity: 0.7,
                shadowRadius: 3.84,
                elevation: 8,
              }}
              source={{
                uri: test.profile,
              }}
              size={45}
            />
          );
        })}
        {crawlcontext[0][props.crawlIndex].subscribed.length >= 5 && (
          <Text
            style={{
              position: "absolute",
              left: 125,
              color: "white",
              textShadowColor: "rgb(0, 0, 0)",
              textShadowOffset: { width: -0.4, height: 0.5 },
              textShadowRadius: 2,
              fontWeight: "bold",
            }}
          >
            +{crawlcontext[0][props.crawlIndex].subscribed.length - 5}others
          </Text>
        )}
      </TouchableOpacity>

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
      {props.routename && (
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)"]}
          style={styles.badge}
        >
          <TouchableHighlight
            onPress={() => {
              props.setqrcode({
                ...props.qrcode,
                visible: true,
                qrdata: props.title,
              });
            }}
            style={styles.press}
          >
            <Image
              style={{
                height: 30,
                width: 30,
                tintColor: "white",
                alignSelf: "center",
              }}
              source={require("../assets/qr-code-black.png")}
            />
          </TouchableHighlight>
        </LinearGradient>
      )}
    </View>
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
  press: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 10,
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
  badge: {
    position: "absolute",
    backgroundColor: Colors.colors.primary,
    width: 100,
    height: 50,
    right: 10,
    top: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderRadius: 10,
  },
});
