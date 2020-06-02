import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Card from "./Cards";
import Carousel from "react-native-snap-carousel";

export default class CarouselCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 3,
      carouselItems: [
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
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
