import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import Header from "../Header";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CrawlContext } from "../Context";

export default function Adminview() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [validity, setValidity] = useState(false);
  const crawlcontext = useContext(CrawlContext);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [crawlcontext[8]]);

  const handleBarCodeScanned = ({ type, data }) => {
    crawlcontext[0].forEach((crawl, index) => {
      if (crawl.title === data) {
        setValidity(true);
      }
    });
    setScanned(true);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setScanned(false);
      setValidity(false);
    }, 5000);
  };

  if (hasPermission === null) {
    return <ActivityIndicator style={{ flex: 1}}/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header adminroute="admin" permission={setHasPermission}/>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          zIndex: 999,
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Ionicons
                  name={
                    validity
                      ? "ios-checkmark-circle-outline"
                      : "ios-close-circle-outline"
                  }
                  size={100}
                  color={validity ? "green" : "red"}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 180,
    height: 180,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
