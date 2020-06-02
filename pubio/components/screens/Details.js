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

export default function Details({ navigation, route }) {
  return (
    <View>
      {/* when on details page pass route name at detailroute prop */}
      <Header detailroute={route.name} />
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
