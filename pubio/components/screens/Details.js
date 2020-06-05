import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import CarouselCards from "../CarouselCards";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../Header";
import Colors from '../Colors'

export default function Details({ navigation, route }) {
  const [crawlCard, setCrawlCard] = useState([
    {
      title: "Dirty Sixth",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://cdn.totalfratmove.com/wp-content/uploads/2013/12/edb80833973f58ba28a343975c42326e760734339.png",
      coords: { lat: 30.267106, lon: -97.738921 },
      bars: [
        { name: "MooseKnuckle Pub" },
        { name: "The Dizzy Rooster" },
        { name: "BD Riley's Irish Pub" },
        { name: "HandleBar" },
      ],
    },
    {
      title: "East Austin",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://static01.nyt.com/images/2014/02/02/travel/02HEADS4/02HEADS4-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      coords: { lat: 30.262135, lon: -97.724546 },
      bars: [
        { name: "East Austin" },
        { name: "East Austin 2" },
        { name: "East Austin 3" },
        { name: "East Austin 4" },
      ],
    },
    {
      title: "South Congress",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://i.pinimg.com/originals/e9/23/67/e923672711849b9df8f49f16be405fff.jpg",
      coords: { lat: 30.250506, lon: -97.749077 },
      bars: [
        { name: "South Congress" },
        { name: "South Congress 2" },
        { name: "South Congress 3" },
        { name: "South Congress 4" },
      ],
    },
    {
      title: "Rock Rose",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_362,q_75,w_545/https://assets.simpleviewinc.com/simpleview/image/upload/crm/austin/Dogwood.-Credit-Carmack-Concepts-858cabb8f774c1e_858cac7e-ec0b-30f6-8b81c18a6e1bc62a.jpg",
      coords: { lat: 30.400988, lon: -97.72301 },
      bars: [
        { name: "Rock Rose" },
        { name: "Rock Rose 2" },
        { name: "Rock Rose 3" },
        { name: "Rock Rose 4" },
      ],
    },
    {
      title: "West Sixth",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://6street.com/listify/wp-content/uploads/2018/10/west-6th-02-star-bar.jpg",
      coords: { lat: 30.269952, lon: -97.748538 },
      bars: [
        { name: "West Sixth" },
        { name: "West Sixth 2" },
        { name: "West Sixth 3" },
        { name: "West Sixth 4" },
      ],
    },
  ]);
  const { index } = route.params;

  return (
    <View>
      {/* when on details page pass route name at detailroute prop */}
      <Header detailroute={route.name} />
      <MapView style={styles.mapStyle}
       mapPadding={{ top: 0, right: 0, bottom: 430, left: 0 }}
       initialRegion={{
         latitude: crawlCard[index].coords.lat - .004,
         longitude: crawlCard[index].coords.lon,
         latitudeDelta: 0.02,
         longitudeDelta: 0.01,
       }}>
         <Marker
                coordinate={{
                  latitude: crawlCard[index].coords.lat,
                  longitude: crawlCard[index].coords.lon,
                }}
                title={crawlCard[index].title}
              />
        
      </MapView>
      <View style={styles.container}>
        <Text style={styles.title}>{crawlCard[index].title}</Text>
        {crawlCard[index].bars.map((name, key) => {
          return (
            <View key={key} style={styles.bar}>
              <View style={{width: 30, alignItems: 'center'}}>
              <Ionicons
                color= {
                  key === 0
                    ? Colors.colors.primary
                    : key === crawlCard[index].bars.length - 1
                    ? Colors.colors.primary
                    : '	rgb(128,128,128)'
                }
                name={
                  key === 0
                    ? "md-pin"
                    : key === crawlCard[index].bars.length - 1
                    ? "md-beer"
                    : "md-arrow-dropdown"
                }
                size={25}
              />
              </View>
              <Text style={styles.text}>{name.name}</Text>
            </View>
          );
        })}
        
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)']} style={styles.subscribe}>
        <TouchableHighlight style={styles.press} onPress={() =>{console.log('subscribed')}} activeOpacity={0.4} underlayColor={'rgba(255,255,255,0.2)'}>
          
          
          <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    position: "absolute",
    bottom: 235,
    alignSelf: "center",
    height: 250,
    width: "100%",
    backgroundColor: Colors.colors.cardbackground,
    opacity: 0.95,
    padding: 20,
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
    marginBottom: 20,
    fontWeight: "700",
    fontSize: 25,
  },
  text: {
    fontSize: 20,
    margin: 5,
    textShadowColor: Colors.colors.gray,
    textShadowRadius: 4,
    textShadowOffset: { width:0, height:0.5 },
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
    elevation: 8
  },
  subscribeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  press: {
		width: '100%',
		height: '100%',
    justifyContent: 'center',
    alignItems: "center",
			borderRadius: 10,
  },
});
