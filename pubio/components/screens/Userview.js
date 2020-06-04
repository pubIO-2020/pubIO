import React, {useState} from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Header from "../Header";
import CardScrollView from "../CardScrollView";
import { Modal, Portal, Button, Provider } from 'react-native-paper';

export default function Userview({ route }) {
  const [qrcode, setQrcode] = useState({visible:false})
  return (
    <View>
      <Header routeuser={route.name} />
      <View>
        <CardScrollView setqrcode={setQrcode} qrcode={qrcode} routename={route.name} />
        <Provider>
         <Portal>
           <Modal onDismiss={()=>{setQrcode({...qrcode, visible:false})}}visible={qrcode.visible}>
             <View style={styles.modalview}><Image source={require("../../assets/qr-code-black.png")}/></View>
           </Modal>
         </Portal>
      </Provider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    modalview:{
      backgroundColor:"white",
      height:400,
      width:"85%",
      alignSelf: "center",
      justifyContent:"center",
      alignItems:"center",
      // zIndex:100,
      position:"absolute",
      bottom: -50,
      borderRadius:10,
    },
})