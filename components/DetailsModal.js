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
import Grid from "./Grid";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const DetailsModal = (props) => {
  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={props.detailsModalVisible}
    //   onRequestClose={() => {
    //     setDetailsModalVisible(!detailsModalVisible);
    //   }}
    // >
      <View>
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
              <DetailList listData={d.Items} key={1}/>
              <View style={{justifyContent: "flex-start",flexDirection: "column",height:40,paddingTop:10}}>
              <TouchableOpacity
              color={Colors.accentColor}
              backgroundColor={Colors.accentColor}
              
              onPress={() => {
                props.callReceived();
              }}
              style={[
                styles.submit,
                 styles.enabledButton,
              ]}
            >
              <View style={styles.receivedContainer}>
                <Text style={{ color: 'white' }}>Received</Text>
                <MaterialCommunityIcons
                  name="send-circle-outline"
                  size={24}
                  color={Colors.accentColor}
                />
              </View>
            </TouchableOpacity>
            </View>
            </View>
          ))}
        </View>
      </View>
    // </Modal>
  );
};

const styles = StyleSheet.create({

  submit: {
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignItems: "center",
    marginEnd: 30,
    marginStart: 30,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
    marginTop: -10,
  },
  receivedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 8,
    paddingTop: 8,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },

  modalView: {
    marginBottom: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
});
export default DetailsModal;
