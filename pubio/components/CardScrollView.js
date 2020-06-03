import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Card from "./Cards";

export default function CardScrollView(props) {
  const [crawlCard, setCrawlCard] = useState([
    {
      title: "Dirty Sixth",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://cdn.totalfratmove.com/wp-content/uploads/2013/12/edb80833973f58ba28a343975c42326e760734339.png",
    },
    {
      title: "East Austin",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://static01.nyt.com/images/2014/02/02/travel/02HEADS4/02HEADS4-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    },
    {
      title: "South Congress",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://i.pinimg.com/originals/e9/23/67/e923672711849b9df8f49f16be405fff.jpg",
    },
    {
      title: "Rock Rose",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_362,q_75,w_545/https://assets.simpleviewinc.com/simpleview/image/upload/crm/austin/Dogwood.-Credit-Carmack-Concepts-858cabb8f774c1e_858cac7e-ec0b-30f6-8b81c18a6e1bc62a.jpg",
    },
    {
      title: "West Sixth",
      date: "5/31/20",
      info: "blahbalhbalhbalhbal",
      imageURL:
        "https://6street.com/listify/wp-content/uploads/2018/10/west-6th-02-star-bar.jpg",
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
          />
        );
      })}

      <View style={{ height: 370 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
