import React from "react";
import MapView from "react-native-maps";
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

import Header from "../Header";

export default function Mapview({ navigation, route }) {
  // If params are available from User page then set User page name param
  let { page } = route.params ? route.params : "";
  return (
    <View>
      <Header detailroute={route.name} routename={page} />
      <MapView style={styles.mapStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
