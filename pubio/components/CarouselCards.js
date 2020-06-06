import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Card from "./Cards";
import Carousel from "react-native-snap-carousel";

export default class CarouselCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
      title: "Dirty Sixth",
      date: "5/31/20",
      info: "Enjoy back to back bars and live music in the epicenter of Austin nightlife.",
      imageURL:
        "https://cdn.totalfratmove.com/wp-content/uploads/2013/12/edb80833973f58ba28a343975c42326e760734339.png",
      coords: { latitude: 30.26588, longitude: -97.735678 },
      bars: [
        { name: "Easy Tiger" },
        { name: "MooseKnuckle Pub" },
        { name: "The Dizzy Rooster" },
        { name: "BD Riley's Irish Pub" },
      ],
    },
    {
      title: "East Austin",
      date: "5/31/20",
      info: "See the ever changing and growing East 6th street with local favorite dive bars, venues, and breweries.",
      imageURL:
        "https://static01.nyt.com/images/2014/02/02/travel/02HEADS4/02HEADS4-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
      coords: { lat: 30.262135, lon: -97.724546 },
      bars: [
        { name: "Lazarus Brewing" },
        { name: "Zilker Brewing" },
        { name: "The Liberty" },
        { name: "The White Horse" }
      ],
    },
    {
      title: "South Lamar",
      date: "5/31/20",
      info: "Keep South Austin Weirder. Take a stroll on South Lamar for a variety of venues with music, food, and style.",
      imageURL:
        "https://static1.squarespace.com/static/54d14cdee4b00762783815a8/56a1bded69492e98c1ca4b0f/5994d725f5e23118b93e8de5/1502927038228/ABGB-Events-8-1200x800.0.0.jpg?format=800w",
      coords: { lat: 30.250506, lon: -97.749077 },
      bars: [
        { name: "The Highball" },
        { name: "Saxon Pub" },
        { name: "Corner Bar" },
        { name: "ABGB" },
      ],
    },
    {
      title: "Rock Rose",
      date: "5/31/20",
      info: "Austin's newest hot spot and entertainment district that houses a deluge of restaurants and bars within an upscale outdoor mall.",
      imageURL:
        "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_362,q_75,w_545/https://assets.simpleviewinc.com/simpleview/image/upload/crm/austin/Dogwood.-Credit-Carmack-Concepts-858cabb8f774c1e_858cac7e-ec0b-30f6-8b81c18a6e1bc62a.jpg",
      coords: { lat: 30.400988, lon: -97.72301 },
      bars: [
        { name: "Wonder Bar" },
        { name: "Kung Fu Saloon" },
        { name: "Lavaca Street Bar" },
        { name: "Punch Bowl Social" },
      ],
    },
    {
      title: "West Sixth",
      date: "5/31/20",
      info: "The upscale side of the historic sixth street and entertainment district stacked with bars, decadent eateries, and music venues. ",
      imageURL:
        "https://6street.com/listify/wp-content/uploads/2018/10/west-6th-02-star-bar.jpg",
      coords: { lat: 30.269952, lon: -97.748538 },
      bars: [
        { name: "Little Woodrow's" },
        { name: "Star Bar" },
        { name: "Whiskey Tango Foxtrot Icehouse" },
        { name: "Green Light Social" },
      ],
    }
      ],
    };
  }

  _renderItem({ item, index }) {
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={375}
            itemWidth={375}
            renderItem={this._renderItem}
            // on snapping of item get current coordinates from object
            onSnapToItem={(index) => {
              this.setState({ activeIndex: index });
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
