import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ApiGet from "../../api/ApiGet";
import DetailsModal from "../../components/DetailsModal";
import SelectUser from "../../components/SelectUser";

const Scanning = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [detail, setDetails] = useState([]);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  const getListOfUsers = async () => {
    console.log("get list of users");
    var result = JSON.parse(await ApiGet("GetUserList"));
    setUsers(result);
    return true;
  };

  const askForPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  const getDetailsApi = async (action, value) => {
    try {
      var result = JSON.parse(await ApiGet(action, value));
      setDetails(result);
      setDetailsModalVisible(true);
    } catch (ex) {
      console.log(ex);
    }
  };
  const callReceived = async (name) => {
    console.log(`in call receive with:  ${name}`);
    setUser(name);
    setUserModalVisible(false);
    console.log(`Modal is false`);

    var result = await callReceivedApi(text, name);

    alert(result ? "Received successfully" : "");
  };
  const callReceivedApi = async (barcode, name) => {
    try {
      if (user === "") {
        if (users.length < 1) {
          getListOfUsers();
        }
        setUserModalVisible(true);
      } else {
        var result = JSON.parse(
          await ApiGet(
            "ReceiveDelivery",
            `despatchNumber=${barcode}&receiverName=${name}`
          )
        );
        console.log(result);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    askForPermission();
  });
  const handleBarCodeScanned = ({ type, data }) => {
    setText(data);
    setScanned(true);
    console.log(`type: ${type} \n data: ${data}`);
  };

  if (hasPermission === null)
    return (
      <View style={styles.center}>
        <Text>Request for camera permission</Text>
      </View>
    );
  if (hasPermission === false)
    return (
      <View style={styles.center}>
        <Text>No Access to Camer.</Text>
        <TouchableOpacity onPress={() => askForPermission()}>
          Allow use Camera
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            console.log("call get call");
            SoapCall("", "");
          }}
        >
          <Text> Get Call</Text>
        </TouchableOpacity> */}
      </View>
    );
  return (
    <View style={styles.top}>
      <DetailsModal
        detailsModalVisible={detailsModalVisible}
        setDetailsModalVisible={setDetailsModalVisible}
        detail={detail}
      ></DetailsModal>
      {userModalVisible && (
        <SelectUser
          userModalVisible={userModalVisible}
          setUserModalVisible={setUserModalVisible}
          callReceived={callReceived}
          users={users}
        ></SelectUser>
      )}
      {!scanned && (
        <View style={styles.barCodeBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ marginLeft: 0, paddingLeft: 0 }}
            BarCodeBounds="original"
            width={"90%"}
            height={350}
          />
          {/* <TouchableOpacity
            onPress={() => {
              console.log("call get call");
              SoapCall("", "");
            }}
          >
            <Text> Get Call</Text>
          </TouchableOpacity> */}
        </View>
      )}
      {scanned && (
        <View style={styles.scanContainer}>
          <Text style={styles.mainText}>Scanned</Text>
          <Text
            style={{
              borderColor: "black",
              textDecorationLine: "underline",
              paddingTop: 10,
            }}
          >
            {text}
          </Text>

          <TouchableOpacity
            color={Colors.accentColor}
            onPress={() => {
              setScanned(false);
              setText(null);
            }}
            style={styles.submit}
          >
            <View style={styles.receivedContainer}>
              <Text style={{ color: "white" }}>Again</Text>
              <MaterialCommunityIcons
                name="refresh-circle"
                size={24}
                color={Colors.accentColor}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        {scanned && (
          <View style={styles.scanContainer}>
            <Text style={{ fontWeight: "bold" }}>
              Sacn is wrong? Enter manually
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Sacn is wrong? Enter manually"
              keyboardType="numeric"
              onChangeText={setText}
              onEndEditing={() => setScanned(true)}
              value={text}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        {scanned && (
          <View
            style={{
              flex: 1,

              flexDirection: "row",
              justifyContent: "space-around",
              height: "100%",
              // marginRight: 40,
              alignItems: "flex-end",
              backgroundColor: "#e9e9e9",
              borderRadius: 5,
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity
              color={Colors.accentColor}
              onPress={() => {
                callReceivedApi(text, user);
              }}
              style={styles.submit}
            >
              <View style={styles.receivedContainer}>
                <Text style={{ color: "white" }}>Received</Text>
                <MaterialCommunityIcons
                  name="send-circle-outline"
                  size={24}
                  color={Colors.accentColor}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              title="Submit"
              color={Colors.accentColor}
              onPress={() => {
                getDetailsApi("GetDispatchInfo", `orderDispatchNumber=${text}`);
              }}
              style={styles.submit}
            >
              <View style={styles.receivedContainer}>
                <Text style={{ color: "white" }}>Details</Text>
                <MaterialCommunityIcons
                  name="beaker-outline"
                  size={24}
                  color={Colors.accentColor}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
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
    marginTop: 20,
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    justifyContent: "flex-start",
  },
  scanContainer: {
    flexDirection: "column",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#e9e9e9",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginTop: 30,
  },
  top: {
    flex: 1,
    margin: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  barcode: { height: "100%", width: 80 },
  barCodeBox: {
    paddingLeft: 0,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: "70%",
    overflow: "hidden",
    borderRadius: 30,
    // backgroundColor: Colors.accentColor,
  },
  mainText: {
    fontSize: 12,
    fontWeight: "bold",
    margin: 10,
  },
});

export default Scanning;
