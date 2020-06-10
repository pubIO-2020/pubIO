import React, { useState, useContext, useRef } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Card from "./Cards";
import Carousel from "react-native-snap-carousel";

import { CrawlContext } from "./Context";

function renderItem({ item, index }) {
  return (
    // Reuse card component
    <Card
      title={item.title}
      date={item.date}
      info={item.info}
      imageURL={item.imageURL}
      crawlIndex={index}
    />
  );
}

export default function CarouselCards() {
  const carouselRef = useRef(null);
  const crawlcontext = useContext(CrawlContext);
  const [carousel, setCarousel] = useState({
    activeIndex: 0,
  });
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Carousel
          layout={"default"}
          ref={carouselRef}
          data={crawlcontext[0]}
          sliderWidth={375}
          itemWidth={375}
          renderItem={renderItem}
          // on snapping of item get current coordinates from object
          onSnapToItem={(index) =>
            setCarousel({ ...carousel, activeIndex: index })
          }
        />
      </View>
    </SafeAreaView>
  );
}
