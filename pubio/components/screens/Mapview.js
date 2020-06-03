import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
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
import Beer from "../../assets/beer.png";

import Header from "../Header";

export default function Mapview({ navigation, route }) {
  const [crawlCard, setCrawlCard] = useState([
    {
      title: "Dirty Sixth",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://cdn.totalfratmove.com/wp-content/uploads/2013/12/edb80833973f58ba28a343975c42326e760734339.png",
      coords: { lat: 30.267106, lon: -97.738921 },
    },
    {
      title: "East Austin",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://static01.nyt.com/images/2014/02/02/travel/02HEADS4/02HEADS4-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      coords: { lat: 30.262135, lon: -97.724546 },
    },
    {
      title: "South Congress",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://i.pinimg.com/originals/e9/23/67/e923672711849b9df8f49f16be405fff.jpg",
      coords: { lat: 30.250506, lon: -97.749077 },
    },
    {
      title: "Rock Rose",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_362,q_75,w_545/https://assets.simpleviewinc.com/simpleview/image/upload/crm/austin/Dogwood.-Credit-Carmack-Concepts-858cabb8f774c1e_858cac7e-ec0b-30f6-8b81c18a6e1bc62a.jpg",
      coords: { lat: 30.400988, lon: -97.72301 },
    },
    {
      title: "West Sixth",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://6street.com/listify/wp-content/uploads/2018/10/west-6th-02-star-bar.jpg",
      coords: { lat: 30.269952, lon: -97.748538 },
    },
  ]);

  return (
    <View>
      <Header />
      <View>
        <View style={styles.viewstyles}>
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
                color={route.name === "Cardview" ? "white" : "darkgray"}
              />
              <Text
                style={{
                  color: route.name === "Cardview" ? "white" : "darkgray",
                  marginLeft: 2,
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
                color={route.name === "Mapview" ? "white" : "darkgray"}
              />
              <Text
                style={{
                  color: route.name === "Mapview" ? "white" : "darkgray",
                  marginLeft: 2,
                  fontSize: 13,
                }}
              >
                Map View
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Display Map */}
        <MapView
          mapPadding={{ top: 0, right: 0, bottom: 550, left: 0 }}
          paddingAdjustmentBehavior="always"
          initialRegion={{
            latitude: 30.2303 - 0.0123,
            longitude: -97.7538,
            latitudeDelta: 0.2,
            longitudeDelta: 0.1,
          }}
          style={styles.mapStyle}
        >
          {crawlCard.map((crawl, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: crawl.coords.lat,
                  longitude: crawl.coords.lon,
                }}
                title={crawl.title}
                key={index}
              />
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
    backgroundColor: "rgba(43, 158, 179, 0.7)",
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
    marginRight: 5,
    marginLeft: 5,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
