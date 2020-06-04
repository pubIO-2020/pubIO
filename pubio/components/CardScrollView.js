import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Card from "./Cards";
import Userview from "./screens/Userview";

export default function CardScrollView(props) {
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
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {crawlCard.map((crawl, index) => {
        return (
          <Card
            title={crawl.title}
            date={crawl.date}
            info={crawl.info}
            imageURL={crawl.imageURL}
            key={index}
            crawlIndex={index}
            routename = {props.routename}
            setqrcode = {props.setqrcode}
            qrcode = {props.qrcode}
          />
        );
      })}

      <View style={{ height: props.routename === "Userview" ? 220: 290 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
