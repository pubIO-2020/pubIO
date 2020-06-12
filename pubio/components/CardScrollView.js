import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  RefreshControl,
} from "react-native";

import Card from "./Cards";
import Colors from "./Colors";

import { CrawlContext } from "./Context";

import firebase from "../Firebase";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// update data in context from firebase
function updateData(crawlcontext, subcontext) {
  const db = firebase.firestore();
  const crawlRef = db.collection("crawls").doc("crawls");
  const subRef = db.collection("subscribed");

  crawlRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        crawlArray = [];

        for (let crawl in doc.data()) {
          crawlArray.push(doc.data()[crawl]);
        }
        crawlcontext(crawlArray);
      } else {
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

  var subObj = {};
  var subContextObj = {};
  subRef
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        subObj[doc.id] = doc.data();
      });
    })
    .then(() => {
      for (let crawl in subObj) {
        subContextObj[crawl] = { subs: subObj[crawl].subs.reverse() };
      }
      subcontext(subContextObj);
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

export default function CardScrollView(props) {
  const crawlcontext = useContext(CrawlContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updateData(crawlcontext[1], crawlcontext[7]);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  if (props.routename === "Userview") {
    if (crawlcontext[2].subscription.length === 0) {
      return (
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Text style={{ color: "rgb(150, 150, 150)", fontSize: 18 }}>
            No subscriptions yet!
          </Text>
          <Text style={{ color: "rgb(150, 150, 150)" }}>
            Subscribe to a crawl on the Home page!
          </Text>
          <Image
            source={require("../assets/pubioBeerW.png")}
            resizeMode="center"
            style={{
              marginTop: 100,
              tintColor: "rgb(235, 235, 235)",
              height: 300,
            }}
          />
        </View>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.colors.offWhite,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {crawlcontext[2].subscription.map((user, index) => {
            let crawlObject;
            let crawlIndex;
            crawlcontext[0].some((crawl, id) => {
              if (crawl.title.match(user.QRDATA)) {
                crawlObject = crawl;
                crawlIndex = id;
                return true;
              }
            });
            return (
              <Card
                key={index}
                title={crawlObject.title}
                date={crawlObject.date}
                info={crawlObject.info}
                imageURL={crawlObject.imageURL}
                crawlIndex={crawlIndex}
                routename={props.routename}
                setqrcode={props.setqrcode}
                qrcode={props.qrcode}
              />
            );
          })}
          <View
            style={{ height: props.routename === "Userview" ? 220 : 290 }}
          ></View>
        </ScrollView>
      );
    }
  } else {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.colors.offWhite,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {crawlcontext[0].map((crawl, index) => {
          return (
            <Card
              title={crawl.title}
              date={crawl.date}
              info={crawl.info}
              imageURL={crawl.imageURL}
              key={index}
              crawlIndex={index}
              routename={props.routename}
              setqrcode={props.setqrcode}
              qrcode={props.qrcode}
            />
          );
        })}

        <View
          style={{ height: props.routename === "Userview" ? 220 : 290 }}
        ></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
