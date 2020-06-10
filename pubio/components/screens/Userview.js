import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Header from "../Header";
import CardScrollView from "../CardScrollView";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import Colors from "../Colors";

export default function Userview({ route }) {
  const [qrcode, setQrcode] = useState({ visible: false, qrdata: "" });
  const navigation = useNavigation();
  return (
    <View>
      <Header routeuser={route.name} />
      <View style={{ height: "100%" }}>
        <CardScrollView
          setqrcode={setQrcode}
          qrcode={qrcode}
          routename={route.name}
        />
        <Provider>
          <Portal>
            <Modal
              onDismiss={() => {
                setQrcode({ ...qrcode, visible: false });
              }}
              visible={qrcode.visible}
            >
              <View style={styles.modalview}>
                <QRCode
                  value={qrcode.qrdata}
                  color={Colors.colors.primary}
                  size={250}
                  enableLinearGradient={true}
                  linearGradient={[Colors.colors.primary, Colors.colors.dark]}
                />
                <Text style={{ fontSize: 15, marginTop: 10 }}>Show to your bartender for a discount!</Text>
              </View>
            </Modal>
          </Portal>
        </Provider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalview: {
    backgroundColor: "white",
    height: 400,
    width: "85%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // zIndex:100,
    position: "absolute",
    bottom: -50,
    borderRadius: 10,
  },
});
