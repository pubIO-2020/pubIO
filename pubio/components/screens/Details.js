import React, { useState, useEffect, useContext } from "react";
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

import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../Header";
import Colors from "../Colors";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { CrawlContext } from "../Context";
import { REACT_APP_GOOGLE_API_KEY } from "react-native-dotenv";
import firebase from "../../Firebase";

export default function Details({ navigation, route }) {
  const [distance, setDistance] = useState("");
  const [specials, setSpecials] = useState({ visible: false, index: 0 });
  const [subscribed, setSubscribed] = useState(false);
  const downAction = () => {
    setSpecials({ ...specials, visible: false });
  };
  const db = firebase.firestore();
  const userRef = db.collection("users").doc("users");
  const crawlRef = db.collection("crawls").doc("crawls");

  const crawlcontext = useContext(CrawlContext);
  const { index } = route.params;
  function userSubscriptions(subscribed) {
    // created an array with all user data
    let newUserData = [];
    let newCrawlData = [];
    // push each user object into the new array
    crawlcontext[4].forEach((user) => {
      newUserData.push(user);
    });

    // push each crawl object into the new array
    crawlcontext[0].forEach((crawl) => {
      newCrawlData.push(crawl);
    });

    //  if param is true push bar crawl title to subscriptions array
    if (subscribed) {
      // filter through new user array to find current username
      newUserData.filter((user, id) => {
        if (user.username === crawlcontext[2].username) {
          newUserData[id].subscription.push({
            QRDATA: crawlcontext[0][index].title,
          });
        }
      });
      // update context with new user array
      userRef.set(Object.assign({}, newUserData));
      // don't know why this works but when commenting the bottom line we're able to see profile images on cards & cards displayed in subscriptions right away
      // crawlcontext[5](newUserData);

      // set subbed user on crawl card
      newCrawlData.filter((crawl, id) => {
        if (crawl.title === crawlcontext[0][index].title) {
          newCrawlData[id].subscribed.unshift({
            username: crawlcontext[2].username,
            profile: "https://pbs.twimg.com/media/DQVBVpUUMAAIA-M.jpg",
          });
        }
      });
      crawlcontext[1](newCrawlData);
      crawlRef.set(Object.assign({}, newCrawlData));
      // if param is false filter through new user array and find the current user
    } else {
      newUserData.filter((user, id) => {
        if (user.username === crawlcontext[2].username) {
          newUserData[id].subscription.filter((crawl, key) => {
            // filer through the current user's subscriptions then find the current bar crawl and remove it
            if (crawl.QRDATA === crawlcontext[0][index].title) {
              newUserData[id].subscription.splice(key, 1);
            }
          });
        }
      });

      // set subbed user on crawl card
      newCrawlData.filter((crawl, id) => {
        if (crawl.title === crawlcontext[0][index].title) {
          newCrawlData[id].subscribed.filter((user, key) => {
            if (user.username === crawlcontext[2].username) {
              newCrawlData[id].subscribed.splice(key, 1);
            }
          });
        }
      });

      // update context with new user array
      userRef.set(Object.assign({}, newUserData));
      crawlRef.set(Object.assign({}, newCrawlData));
      crawlcontext[1](newCrawlData);
    }
  }

  useEffect(() => {
    crawlcontext[2].subscription.filter((element) => {
      if (element.QRDATA === crawlcontext[0][index].title) {
        setSubscribed(true);
      }
    });
  }, []);

  return (
    <View>
      {/* when on details page pass route name at detailroute prop */}
      <View style={{ zIndex: 300 }}>
        <Header detailroute={route.name} />
      </View>
      <GestureRecognizer
        // style={styles.centeredView}
        onSwipeDown={downAction}
        config={{
          gestureIsClickThreshold: 1,
          velocityThreshold: 0.1,
          directionalOffsetThreshold: 100,
        }}
      >
        <MapView
          toolbarEnabled={true}
          style={styles.mapStyle}
          mapPadding={{ top: 0, right: 0, bottom: 430, left: 0 }}
          initialRegion={{
            latitude: crawlcontext[0][index].coords.latitude - 0.004,
            longitude: crawlcontext[0][index].coords.longitude,
            latitudeDelta: 0.018,
            longitudeDelta: 0.008,
          }}
        >
          {crawlcontext[0][index].bars.map((bar, key) => {
            return (
              <Marker coordinate={bar.coords} title={bar.name} key={key}>
                <Ionicons
                  color={
                    key === 0
                      ? Colors.colors.primary
                      : key === crawlcontext[0][index].bars.length - 1
                      ? Colors.colors.primary
                      : "rgb(128,128,128)"
                  }
                  name={
                    key === 0
                      ? "md-pin"
                      : key === crawlcontext[0][index].bars.length - 1
                      ? "ios-beer"
                      : "ios-arrow-dropdown-circle"
                  }
                  size={
                    key === 0
                      ? 38
                      : key === crawlcontext[0][index].bars.length - 1
                      ? 38
                      : 30
                  }
                />
              </Marker>
            );
          })}
          <MapViewDirections
            origin={crawlcontext[0][index].coords}
            waypoints={[
              crawlcontext[0][index].bars[1].coords,
              crawlcontext[0][index].bars[2].coords,
            ]}
            destination={crawlcontext[0][index].bars[3].coords}
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
          <Text style={styles.title}>{crawlcontext[0][index].title}</Text>
          <Text style={styles.distance}>{distance}</Text>
          {crawlcontext[0][index].bars.map((name, key) => {
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
                          : key === crawlcontext[0][index].bars.length - 1
                          ? Colors.colors.primary
                          : "	rgb(128,128,128)"
                      }
                      name={
                        key === 0
                          ? "md-pin"
                          : key === crawlcontext[0][index].bars.length - 1
                          ? "ios-beer"
                          : "ios-arrow-dropdown-circle"
                      }
                      size={
                        key === 0
                          ? 35
                          : key === crawlcontext[0][index].bars.length - 1
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
            style={[styles.subscribe, subscribed && { opacity: 0.7 }]}
          >
            <TouchableHighlight
              style={styles.press}
              onPress={() => {
                if (subscribed) {
                  setSubscribed(false);
                  userSubscriptions(false);
                } else {
                  setSubscribed(true);
                  userSubscriptions(true);
                }
              }}
              activeOpacity={0.4}
              underlayColor={"rgba(255,255,255,0.2)"}
            >
              <Text style={styles.subscribeText}>
                {subscribed ? "Subscribed" : "Subscribe"}
              </Text>
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
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    {crawlcontext[0][index].bars[specials.index].name}
                  </Text>
                  <View style={styles.modalSpecials}>
                    {crawlcontext[0][index].bars[specials.index].specials.map(
                      (special, index) => {
                        return (
                          <View key={index} style={{ alignItems: "center" }}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <View style={{ width: 30, alignItems: "center" }}>
                                <Ionicons
                                  name={
                                    special.type === "wine"
                                      ? "ios-wine"
                                      : special.type === "beer"
                                      ? "ios-beer"
                                      : special.type === "cocktail"
                                      ? "md-wine"
                                      : "md-pint"
                                  }
                                  size={30}
                                ></Ionicons>
                              </View>
                              <Text style={{ fontSize: 30 }}>
                                {special.price} {special.info}
                              </Text>
                            </View>
                            {index <
                              crawlcontext[0][index].bars[specials.index]
                                .specials.length -
                                1 && <Ionicons name="md-git-commit"></Ionicons>}
                          </View>
                        );
                      }
                    )}
                  </View>

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
                    <Ionicons name="ios-arrow-down" size={26} color="white" />
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </GestureRecognizer>
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
  modalSpecials: {
    fontSize: 22,
  },
});
