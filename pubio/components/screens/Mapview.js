import React, { useState, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from 'expo-linear-gradient';
import CarouselCards from "../CarouselCards";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CrawlContext } from "../Context";
import Colors from '../Colors'
import Beer from "../../assets/beer.png";

import Header from "../Header";

export default function Mapview({ navigation, route }) {
  const crawlcontext = useContext(CrawlContext);

  return (
    <View>
      <Header />
      <View>
        <LinearGradient colors={['rgba(0,0,0,0.2)', 'transparent']} style={styles.viewstyles}>
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("Cardview");
            }}
            style={styles.icontouchables}
          >
            <View style={styles.iconsviews}>
              <Ionicons
                name="ios-albums"
                size={30}
                color={route.name === "Cardview" ? "white" : Colors.colors.gray}
              />
              <Text
                style={{
                  color: route.name === "Cardview" ? "white" : Colors.colors.gray,
                  marginLeft: 4,
                  fontSize: 13,
                }}
              >
                Card View
              </Text>
            </View>
          </TouchableOpacity>

          {/* Map View nav button */}
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("Mapview");
            }}
            style={styles.icontouchables}
          >
            <View style={styles.iconsviews}>
              <Ionicons
                name="ios-pin"
                size={30}
                color={route.name === "Mapview" ? "white" : Colors.colors.gray}
              />
              <Text
                style={{
                  color: route.name === "Mapview" ? "white" : Colors.colors.gray,
                  marginLeft: 4,
                  fontSize: 13,
                }}
              >
                Map View
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        {/* Display Map */}
        <MapView
          mapPadding={{ top: 0, right: 0, bottom: 430, left: 0 }}
          initialRegion={{
            latitude: 30.2303 - 0.0123,
            longitude: -97.7538,
            latitudeDelta: 0.2,
            longitudeDelta: 0.1,
          }}
          style={styles.mapStyle}
        >
          {crawlcontext[0].map((crawl, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: crawl.coords.latitude,
                  longitude: crawl.coords.longitude,
                }}
                title={crawl.title}
                key={index}
              >
                <Ionicons color={Colors.colors.primary} name="ios-beer" size={38} />
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.carousel}>
          <CarouselCards />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    position: "absolute",
    bottom: 250,
    alignSelf: "center",
  },
  viewstyles: {
    flexDirection: "row",
    backgroundColor: Colors.colors.primary,
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 8,
    paddingTop: 3,
  },
  iconsviews: {
    flexDirection: "row",
    alignItems: "center",
  },
  icontouchables: {
    marginRight: 8,
    marginLeft: 8,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
