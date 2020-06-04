import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from './Colors'

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)']} style={styles.headerStyle}>
      <Text style={styles.text}>pubIO</Text>

      {/* Display settings icon if on User page*/}
      {props.routeuser === "Userview" && (
        <TouchableOpacity
          style={styles.settingsicon}
          // open settings navigation drawer
          onPress={navigation.openDrawer}
        >
          <View>
            <Ionicons name="md-settings" size={28} color="white" />
          </View>
        </TouchableOpacity>
      )}

      {/* Display back button to go back to previous route, if prop is passed from detail route */}
      {props.detailroute && (
        <TouchableOpacity
          style={styles.backicon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View>
            <Ionicons name="md-arrow-back" size={28} color="white" />
          </View>
        </TouchableOpacity>
      )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    paddingTop: Platform.OS === "android" ? 50 : 0,
    alignItems: "center",
    height: 100,
    backgroundColor: Colors.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: Platform.OS === "ios" ? "Arial" : "sans-serif",
  },
  settingsicon: {
    position: "absolute",
    top: 48,
    right: 10,
  },
  backicon: {
    position: "absolute",
    top: 52,
    left: 10,
  },
});
