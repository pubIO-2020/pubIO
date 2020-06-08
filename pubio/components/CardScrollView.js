import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import Card from './Cards';
import Colors from './Colors';

import { CrawlContext } from './Context';


export default function CardScrollView(props) {
  const crawlcontext = useContext(CrawlContext);

  if (props.routename === 'Userview') {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.colors.offWhite,
        }}
      >
        {crawlcontext[2].subscription.map((user, index) => {
          // console.log(user.QRDATA);
          // console.log(crawlcontext[2].subscription);
          let crawlObject;
          let crawlIndex;
          crawlcontext[0].some((crawl, id) => {
            if(crawl.title.match(user.QRDATA)) {
              crawlObject = crawl;
              crawlIndex = id
              return true;
            };
            
          })
          

          return (<Card 
            key={index} 
            title={crawlObject.title}
            date={crawlObject.date}
            info={crawlObject.info}
            imageURL={crawlObject.imageURL}
            crawlIndex={crawlIndex}
            routename={props.routename}
            setqrcode={props.setqrcode}
            qrcode={props.qrcode}/>);

        })}
      
        <View
          style={{ height: props.routename === 'Userview' ? 220 : 290 }}
        ></View>
      </ScrollView>
    );
  } else {
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
          style={{ height: props.routename === 'Userview' ? 220 : 290 }}
        ></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
