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
import { getUser } from "../../helper/db";

const Scanning = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [detail, setDetails] = useState([]);
  const [user, setUser] = useState("");


  const askForPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  const getDetailsApi = async () => {
    try {
      var barcode = text.replace(/\D/g, "");
      
      var result = JSON.parse(await ApiGet("ESP_HS_GetDespatchInfo", barcode));
      setDetails(result);
      setDetailsModalVisible(true);
    } catch (ex) {
      console.log(ex);
    }
  };
  const callReceived = async () => {
    var barcode = text.replace(/\D/g, "");
    var result = await callReceivedApi(barcode, user);
  };
  const callReceivedApi = async (barcode, name) => {
    try {
      var methodname = "ESP_HS_IsDespatchReceived";

      var isReceived = JSON.parse(await ApiGet(methodname, barcode));
      if (isReceived) {
        console.log("in received false");
        alert("The order is received");
        return false;
      }
      console.log("Not received");

      var result = JSON.parse(
        await ApiGet(
          "ESP_HS_ReceiveDelivery",
          `despatchNumber=${barcode}&receiverName=${name}`
        )
      );
      if (result) alert("Successfully submitted");
      else alert("Error in submitting order");

      console.log(result);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const dbUser = await getUser();
      if (dbUser.rows._array.length > 0) {
        setUser(dbUser.rows._array[0].user);
      }
    };
    getData();

    askForPermission();
    props.navigation.setOptions({
      headerShown: false,
    });
  },[]);
  const handleBarCodeScanned = ({ type, data }) => {
    setText(data);
    setScanned(true);
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

      {/* {userModalVisible && (
        <SelectUser
          userModalVisible={userModalVisible}
          setUserModalVisible={setUserModalVisible}
          callReceived={callReceived}
          users={users}
        ></SelectUser>
      )} */}
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
      <View style={styles.scanContainer}>
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            marginBottom: -20,
            flexDirection: "row",
          }}
        >
          <Text>User:</Text>
          <Text style={{ fontWeight: "bold" }}> {user}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row",justifyContent:'flex-start',alignItems:'flex-start' }}>
          <View style={{justifyContent:'flex-start',width:'50%'}}>
          <TextInput
            style={styles.input}
            placeholder="Enter manually"
            keyboardType="numeric"
            onChangeText={setText}
            onEndEditing={() => setScanned(true)}
            value={text}
          />
          </View>
          <View style={{justifyContent:'flex-start',width:'15%'}}>
          <TouchableOpacity
            color={Colors.accentColor}
            onPress={() => {
              setScanned(false);
              setText(null);
            }}
            style={[styles.submit, styles.againStyle]}
          >
            <View style={{ width: 30, height: 40 }}>
              {/* <Text style={{ color: "white" }}></Text> */}
              <MaterialCommunityIcons
                name="refresh-circle"
                size={24}
                color={Colors.accentColor}
              />
            </View>
          </TouchableOpacity>
          </View>
          <View style={{justifyContent:'flex-start',width:'40%',marginTop:-10}}>
          <TouchableOpacity
              title="Submit"
              disabled={user === "" || text === ""}
              color={Colors.accentColor}
              onPress={getDetailsApi}
              style={[
                styles.submit,
                user === "" || text === ""
                  ? styles.disabledButton
                  : styles.enabledButton,
              ]}
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
        </View>
      </View>
      <View style={styles.detailContainer}>
      {detailsModalVisible&&
      <DetailsModal
        detailsModalVisible={detailsModalVisible}
        setDetailsModalVisible={setDetailsModalVisible}
        detail={detail}
        callReceived={callReceived}
        key={1}
      ></DetailsModal>
      
      }
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
           

          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  receivedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 8,
    paddingTop: 8,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  enabledButton: {
    backgroundColor: Colors.primary,
  },
  againStyle: {
    height: 20,
    marginTop: 20,
    marginEnd: -20,
    marginStart: 10,
    width: 10,
  },
  submit: {
    borderRadius: 5,

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
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#e9e9e9",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginTop: 5,
  },
  detailContainer: {
    flexDirection: "column",
    height:490,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#e9e9e9",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginTop: 5,
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
