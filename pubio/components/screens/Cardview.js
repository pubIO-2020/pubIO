import React, { useState } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import Header from '../Header';
import CardScrollView from '../CardScrollView'

export default function Cardview({ navigation }) {
	const [crawlCard, setCrawlCard] = useState([
		{
			title: 'Dirty Sixth',
			date: '5/31/20',
			info: 'blahbalhbalhbalhbal',
			imageURL: 'https://cdn.totalfratmove.com/wp-content/uploads/2013/12/edb80833973f58ba28a343975c42326e760734339.png',
		},
		{
			title: 'East Austin',
			date: '5/31/20',
			info: 'blahbalhbalhbalhbal',
			imageURL: 'https://static01.nyt.com/images/2014/02/02/travel/02HEADS4/02HEADS4-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
		},
		{
			title: 'South Congress',
			date: '5/31/20',
			info: 'blahbalhbalhbalhbal',
			imageURL: 'https://i.pinimg.com/originals/e9/23/67/e923672711849b9df8f49f16be405fff.jpg',
		},
		{
			title: 'Rock Rose',
			date: '5/31/20',
			info: 'blahbalhbalhbalhbal',
			imageURL: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_362,q_75,w_545/https://assets.simpleviewinc.com/simpleview/image/upload/crm/austin/Dogwood.-Credit-Carmack-Concepts-858cabb8f774c1e_858cac7e-ec0b-30f6-8b81c18a6e1bc62a.jpg',
		},
		{
			title: 'West Sixth',
			date: '5/31/20',
			info: 'blahbalhbalhbalhbal',
			imageURL: 'https://6street.com/listify/wp-content/uploads/2018/10/west-6th-02-star-bar.jpg',
		},
	]);
	return (
		<View>
			<Header />
			<View >
				<View style = {styles.viewstyles} >
				<Button
					onPress={function () {
						navigation.navigate('Cardview');
					}}
					title='Card View'
				/>
				<Button
					onPress={function () {
						navigation.navigate('Mapview');
					}}
					title='Map View'
				/>
				</View>
				<CardScrollView />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewstyles: {
		flexDirection: "row",
		backgroundColor: "rgba(43, 158, 179, 0.7)",
		justifyContent: "center",
		shadowOffset: {
			width: 0,
			height: 4,
		  },
		  shadowColor: "black",
		  shadowOpacity: 0.25,
		  shadowRadius: 3.84,
		  elevation: 8,
	}

});
