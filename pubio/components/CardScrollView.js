import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

import Card from "./Cards";
import Colors from "./Colors";

import { CrawlContext } from "./Context";

import firebase from "../Firebase";

export default function CardScrollView(props) {
  const crawlcontext = useContext(CrawlContext);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.colors.offWhite,
      }}
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

const styles = StyleSheet.create({});
