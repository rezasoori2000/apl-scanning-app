import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import DetailList from "./DetailList";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const DetailsModal = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.detailsModalVisible}
      onRequestClose={() => {
        setDetailsModalVisible(!detailsModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {props.detail.map((d, i) => (
            <View
              keyExtractor={(item, index) => {
                return index;
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.modalText}>{d.Code}</Text>

                <TouchableOpacity
                  color={Colors.accentColor}
                  onPress={() => {
                    props.setDetailsModalVisible(!props.detailsModalVisible);
                  }}
                  style={styles.closeBtn}
                >
                  <View style={styles.smallCloseContainer}>
                    <Text style={{ color: "white" }}></Text>
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={24}
                      color={Colors.accentColor}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
              <Text>{d.Items.length} Item(s) </Text>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              />
              <DetailList listData={d.Items} />
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    borderRadius: 5,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginBottom: 50,
    paddingBottom: 0,
    backgroundColor: "white",
    borderRadius: 20,
    width: "99%",
    paddingTop: 10,
    alignItems: "center",
  },
  smallCloseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
});
export default DetailsModal;
