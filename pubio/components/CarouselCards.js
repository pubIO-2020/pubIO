import React, { useState, useContext, useRef } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Card from "./Cards";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { CrawlContext } from "./Context";
import Colors from './Colors'

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
      <View style={{ flex: 1, alignItems: "center"}}>
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
        <Pagination
              dotsLength={crawlcontext[0].length}
              activeDotIndex={carousel.activeIndex}
              containerStyle={{ backgroundColor: 'transparent' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: Colors.colors.primary
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
      </View>
    </SafeAreaView>
  );
}
