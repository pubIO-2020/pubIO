import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import CarouselCards from "../CarouselCards";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../Header";
import Colors from "../Colors";

import { REACT_APP_GOOGLE_API_KEY } from "react-native-dotenv";

export default function Details({ navigation, route }) {
  const [distance, setDistance] = useState("");
  const [specials, setSpecials] = useState({ visible: false, index: 0 });

  const [crawlCard, setCrawlCard] = useState([
    {
      title: "Dirty Sixth",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://cdn.totalfratmove.com/wp-content/uploads/2013/12/edb80833973f58ba28a343975c42326e760734339.png",
      coords: { latitude: 30.26588, longitude: -97.735678 },
      bars: [
        {
          name: "Easy Tiger",
          coords: { latitude: 30.26588, longitude: -97.735678 },
        },
        {
          name: "MooseKnuckle Pub",
          coords: { latitude: 30.267106, longitude: -97.738921 },
        },
        {
          name: "The Dizzy Rooster",
          coords: { latitude: 30.2674, longitude: -97.740014 },
        },
        {
          name: "BD Riley's Irish Pub",
          coords: { latitude: 30.267722, longitude: -97.741123 },
        },
      ],
    },
    {
      title: "East Austin",
      date: "5/31/20",
      info:
        "See the ever changing and growing East 6th street with local favorite dive bars, venues, and breweries.",
      imageURL:
        "https://static01.nyt.com/images/2014/02/02/travel/02HEADS4/02HEADS4-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      coords: { latitude: 30.261739, longitude: -97.722008 },
      bars: [
        {
          name: "Lazarus Brewing",
          coords: { latitude: 30.261739, longitude: -97.722008 },
        },
        {
          name: "Whisler's",
          coords: { latitude: 30.261933, longitude: -97.722738 },
        },
        {
          name: "Zilker Brewing",
          coords: { latitude: 30.262135, longitude: -97.724546 },
        },
        {
          name: "The Liberty",
          coords: { latitude: 30.2627, longitude: -97.725086 },
        },
      ],
    },
    {
      title: "South Lamar",
      date: "5/31/20",
      info:
        "Keep South Austin Weirder. Take a stroll on South Lamar for a variety of venues with music, food, and style.",
      imageURL:
        "https://static1.squarespace.com/static/54d14cdee4b00762783815a8/56a1bded69492e98c1ca4b0f/5994d725f5e23118b93e8de5/1502927038228/ABGB-Events-8-1200x800.0.0.jpg?format=800w",
      coords: { latitude: 30.256201, longitude: -97.763167 },
      bars: [
        {
          name: "The Highball",
          coords: { latitude: 30.256201, longitude: -97.763167 },
        },
        {
          name: "Saxon Pub",
          coords: { latitude: 30.25354, longitude: -97.763579 },
        },
        {
          name: "Corner Bar",
          coords: { latitude: 30.249437, longitude: -97.766893 },
        },
        {
          name: "ABGB",
          coords: { latitude: 30.245387, longitude: -97.768852 },
        },
      ],
    },
    {
      title: "Rock Rose",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_362,q_75,w_545/https://assets.simpleviewinc.com/simpleview/image/upload/crm/austin/Dogwood.-Credit-Carmack-Concepts-858cabb8f774c1e_858cac7e-ec0b-30f6-8b81c18a6e1bc62a.jpg",
      coords: { latitude: 30.401483, longitude: -97.722765 },
      bars: [
        {
          name: "Wonder Bar",
          coords: { latitude: 30.401483, longitude: -97.722765 },
        },
        {
          name: "Kung Fu Saloon",
          coords: { latitude: 30.400869, longitude: -97.7226641 },
        },
        {
          name: "Lavaca Street Bar",
          coords: { latitude: 30.400585, longitude: -97.723156 },
        },
        {
          name: "Punch Bowl Social",
          coords: { latitude: 30.400014, longitude: -97.725509 },
        },
      ],
    },
    {
      title: "West Sixth",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://6street.com/listify/wp-content/uploads/2018/10/west-6th-02-star-bar.jpg",
      coords: { latitude: 30.269758, longitude: -97.748101 },
      bars: [
        {
          name: "Little Woodrow's",
          coords: { latitude: 30.269758, longitude: -97.748101 },
        },
        {
          name: "Star Bar",
          coords: { latitude: 30.269952, longitude: -97.748538 },
        },
        {
          name: "Whiskey Tango Foxtrot Icehouse",
          coords: { latitude: 30.269771, longitude: -97.749865 },
        },
        {
          name: "Green Light Social",
          coords: { latitude: 30.270369, longitude: -97.750391 },
        },
      ],
    },
  ]);
  const { index } = route.params;

  return (
    <View>
      {/* when on details page pass route name at detailroute prop */}
      <View style={{ zIndex: 300 }}>
        <Header detailroute={route.name} />
      </View>

      <MapView
        toolbarEnabled={true}
        style={styles.mapStyle}
        mapPadding={{ top: 0, right: 0, bottom: 430, left: 0 }}
        initialRegion={{
          latitude: crawlCard[index].coords.latitude - 0.004,
          longitude: crawlCard[index].coords.longitude,
          latitudeDelta: 0.018,
          longitudeDelta: 0.008,
        }}
      >
        {crawlCard[index].bars.map((bar, key) => {
          return (
            <Marker coordinate={bar.coords} title={bar.name} key={key}>
              <Ionicons
                color={
                  key === 0
                    ? Colors.colors.primary
                    : key === crawlCard[index].bars.length - 1
                    ? Colors.colors.primary
                    : "rgb(128,128,128)"
                }
                name={
                  key === 0
                    ? "md-pin"
                    : key === crawlCard[index].bars.length - 1
                    ? "ios-beer"
                    : "ios-arrow-dropdown-circle"
                }
                size={
                  key === 0
                    ? 38
                    : key === crawlCard[index].bars.length - 1
                    ? 38
                    : 30
                }
              />
            </Marker>
          );
        })}
        <MapViewDirections
          origin={crawlCard[index].coords}
          waypoints={[
            crawlCard[index].bars[1].coords,
            crawlCard[index].bars[2].coords,
          ]}
          destination={crawlCard[index].bars[3].coords}
          apikey={REACT_APP_GOOGLE_API_KEY}
          strokeWidth={8}
          lineCap="round"
          lineDashPattern={[10, 10]}
          strokeColor={Colors.colors.yellow}
          mode="WALKING"
          onReady={(result) => {
            setDistance(
              `Distance: ${(result.distance / 1.609344).toFixed(1)}mi`
            );
          }}
        />
      </MapView>
      <View style={styles.container}>
        <Text style={styles.title}>{crawlCard[index].title}</Text>
        <Text style={styles.distance}>{distance}</Text>
        {crawlCard[index].bars.map((name, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                setSpecials({ ...specials, visible: true, index: key });
              }}
            >
              <View style={styles.bar}>
                <View style={{ width: 30, alignItems: "center" }}>
                  <Ionicons
                    color={
                      key === 0
                        ? Colors.colors.primary
                        : key === crawlCard[index].bars.length - 1
                        ? Colors.colors.primary
                        : "	rgb(128,128,128)"
                    }
                    name={
                      key === 0
                        ? "md-pin"
                        : key === crawlCard[index].bars.length - 1
                        ? "ios-beer"
                        : "ios-arrow-dropdown-circle"
                    }
                    size={
                      key === 0
                        ? 35
                        : key === crawlCard[index].bars.length - 1
                        ? 35
                        : 18
                    }
                  />
                </View>

                <Text style={styles.text}>{name.name}</Text>
                <View>
                  <Ionicons
                    style={styles.arrow}
                    name={"ios-arrow-forward"}
                    size={20}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)"]}
          style={styles.subscribe}
        >
          <TouchableHighlight
            style={styles.press}
            onPress={() => {
              console.log("subscribed");
            }}
            activeOpacity={0.4}
            underlayColor={"rgba(255,255,255,0.2)"}
          >
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>

      {specials.visible && (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            position: "absolute",
            zIndex: 100,
          }}
        >
          <Modal
            animationType="slide"
            visible={specials.visible}
            transparent={true}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {crawlCard[index].bars[specials.index].name}
                </Text>

                <TouchableHighlight
                  style={{
                    ...styles.openButton,
                    backgroundColor: Colors.colors.primary,
                    position: "absolute",
                    right: 10,
                    top: -15,
                  }}
                  onPress={() => {
                    setSpecials({ ...specials, visible: false });
                  }}
                >
                  <Ionicons name="md-close" size={26} color="white" />
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  distance: {
    color: Colors.colors.distance,
    marginBottom: 3,
  },
  container: {
    position: "absolute",
    bottom: 235,
    alignSelf: "center",
    height: 260,
    width: "100%",
    backgroundColor: Colors.colors.cardbackground,
    opacity: 0.95,
    padding: 18,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  title: {
    marginBottom: 2,
    fontWeight: "700",
    fontSize: 25,
  },
  text: {
    fontSize: 20,
    margin: 5,
    textShadowColor: Colors.colors.gray,
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 0.5 },
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
  },
  subscribe: {
    position: "absolute",
    bottom: -40,
    alignSelf: "center",
    backgroundColor: Colors.colors.primary,
    width: 100,
    height: 60,
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  subscribeText: {
    color: "white",
    fontWeight: "bold",
  },
  press: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  arrow: {
    position: "absolute",
    top: -9,
    color: Colors.colors.distance,
  },
  modalview: {
    backgroundColor: "white",
    height: 400,
    width: "85%",
    alignSelf: "center",
    // zIndex:100,
    position: "absolute",
    alignItems: "center",
    bottom: -50,
    borderRadius: 10,
    overflow: "hidden",
  },
  specView: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    borderRadius: 10,
  },
  specTitle: {
    fontSize: 30,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "100%",
    height: "70%",
    position: "absolute",
    bottom: -30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 50,
    padding: 8,
    width: 45,
    alignItems: "center",
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
});
