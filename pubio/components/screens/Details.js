import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
  Modal,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { LinearGradient } from "expo-linear-gradient";
import StarRating from "react-native-star-rating";
import Header from "../Header";
import Colors from "../Colors";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { CrawlContext } from "../Context";
import {
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_GOOGLE_PLACES_KEY,
} from "react-native-dotenv";
import firebase from "../../Firebase";

export default function Details({ navigation, route }) {
  const crawlcontext = useContext(CrawlContext);

  const [distance, setDistance] = useState("");
  const [specials, setSpecials] = useState({ visible: false, index: 0 });
  const [subscribed, setSubscribed] = useState(false);
  const [rating, setRating] = useState({ rating: 0, placesURL: "" });
  const downAction = () => {
    setSpecials({ ...specials, visible: false });
  };
  const db = firebase.firestore();
  const userRef = db.collection("usersTest").doc(crawlcontext[2].username);
  const crawlRef = db.collection("crawls").doc("crawls");

  const { index } = route.params;

  const subRef = db.collection("subscribed").doc(crawlcontext[0][index].title);

  function getBarRating(apiKey, barName) {
    let detailQueryURL;
    let idQueryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${barName}&inputtype=textquery&locationbias=point:30.267,-97.738`;
    return fetch(idQueryURL)
      .then((response) => response.json())
      .then((json) => {
        let placeID = json.candidates[0].place_id;
        detailQueryURL = `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${placeID}`;
      })
      .then(() => {
        fetch(detailQueryURL)
          .then((response) => response.json())
          .then((json) => {
            setRating({
              rating: json.result.rating,
              placesURL: json.result.url,
            });
          });
      });
  }

  function userSubscriptions(subscribed) {
    let newUserData = crawlcontext[2];
    let newCrawlData = crawlcontext[6];

    //  if param is true push bar crawl title to subscriptions array
    if (subscribed) {
      // concatanate new subscription to new currentuser object
      newUserData.subscription = newUserData.subscription.concat([
        { QRDATA: crawlcontext[0][index].title },
      ]);
      // update current user in database and state
      userRef.set(newUserData);
      crawlcontext[3](newUserData);

      newCrawlData[crawlcontext[0][index].title].subs.unshift({
        username: crawlcontext[2].username,
        profile: crawlcontext[2].profile,
      });

      crawlcontext[7](newCrawlData);
      subRef.update({
        subs: firebase.firestore.FieldValue.arrayUnion({
          username: crawlcontext[2].username,
          profile: crawlcontext[2].profile,
        }),
      });

      // if param is false filter through new user array and find the current user
    } else {
      newUserData.subscription.filter((crawl, key) => {
        // filer through the current user's subscriptions then find the current bar crawl and remove it
        if (crawl.QRDATA === crawlcontext[0][index].title) {
          newUserData.subscription.splice(key, 1);
        }
      });
      // update new user data in firebase and in state
      userRef.set(newUserData);
      crawlcontext[3](newUserData);

      newCrawlData[crawlcontext[0][index].title].subs.filter((user, key) => {
        if (user.username === crawlcontext[2].username) {
          newCrawlData[crawlcontext[0][index].title].subs.splice(key, 1);
        }
      });

      crawlcontext[7](newCrawlData);

      subRef.update({
        subs: firebase.firestore.FieldValue.arrayRemove({
          username: crawlcontext[2].username,
          profile: crawlcontext[2].profile,
        }),
      });
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
          <View style={styles.containerInside}>
            <Text style={styles.title}>{crawlcontext[0][index].title}</Text>
            <Text style={styles.distance}>{distance}</Text>
            {crawlcontext[0][index].bars.map((name, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    setSpecials({ ...specials, visible: true, index: key });
                    getBarRating(
                      REACT_APP_GOOGLE_PLACES_KEY,
                      crawlcontext[0][index].bars[key].name
                    );
                    console.log("------");
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
          </View>
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
                  <View
                    style={[
                      styles.modalImg,
                      {
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowColor: "black",
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 8,
                      },
                    ]}
                  >
                    <Image
                      source={{
                        uri:
                          crawlcontext[0][index].bars[specials.index].imageURL,
                      }}
                      style={styles.modalImg}
                    />
                  </View>

                  <View style={styles.modalViewText}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={styles.modalText}
                        onPress={() => Linking.openURL(rating.placesURL)}
                      >
                        {crawlcontext[0][index].bars[specials.index].name}
                      </Text>
                      <Ionicons
                        name="ios-link"
                        size={18}
                        style={{ paddingBottom: 6, paddingLeft: 3 }}
                      />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <StarRating
                        disabled={true}
                        rating={rating.rating}
                        maxStars={5}
                        starSize={20}
                        fullStarColor={Colors.colors.primary}
                      />
                      <Text> {rating.rating}</Text>
                    </View>
                    <View style={styles.modalSpecials}>
                      {crawlcontext[0][index].bars[specials.index].specials.map(
                        (special, id) => {
                          return (
                            <View key={id} style={{ alignItems: "center" }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <View
                                  style={{ width: 30, alignItems: "center" }}
                                >
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
                                <Text style={{ fontSize: 26 }}>
                                  {special.price} {special.info}
                                </Text>
                              </View>
                              {id <
                                crawlcontext[0][index].bars[specials.index]
                                  .specials.length -
                                  1 && <Ionicons name="md-git-commit" />}
                            </View>
                          );
                        }
                      )}
                    </View>
                  </View>

                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      backgroundColor: Colors.colors.primary,
                      position: "absolute",
                      right: 10,
                      top: -15,
                      elevation: 9,
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
  bar: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    position: "absolute",
    bottom: 215,
    alignSelf: "center",
    height: 282,
    width: "100%",
    opacity: 0.95,
  },
  containerInside: {
    justifyContent: "flex-start",
    alignSelf: "center",
    height: "90%",
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
  distance: {
    color: Colors.colors.distance,
    marginBottom: 3,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  subscribe: {
    position: "absolute",
    bottom: 0,
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
    padding: 0,
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
  modalViewText: {
    marginTop: 20,
    alignItems: "center",
  },
  modalImg: {
    height: 190,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginBottom: 10,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
  modalSpecials: {
    fontSize: 22,
    marginTop: 8,
  },
});
