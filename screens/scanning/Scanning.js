import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { BarCodeScanner } from "expo-barcode-scanner";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ApiGet from "../../api/ApiGet";
import GettHttp from "../../api/GetHttp";
import DetailsModal from "../../components/DetailsModal";
import { getUser } from "../../helper/db";
import Grid from "../../components/Grid";

const Scanning = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState("");
  const [enable, setEnable] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [detailsModalVisible, setDetailsContainerVisible] = useState(false);
  const [detail, setDetails] = useState([]);
  const [user, setUser] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const askForPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  const getDetailsApi = async () => {
    try {
      if (user === "") {
        alert("Please enter company & user name in setting tab");
        setText("");
        return false;
      }
      if (text.length > 1) {
        var barcode = "";
        setIsLoading(true);
        setDetails([]);
        barcode = text.replace(/\s/g, "");
        let prefix = barcode.substring(0, 3).toLowerCase();

        if (prefix === "eah" || prefix === "agp") {
          barcode = barcode.replace(/\D/g, "");
          console.log('barcode:', barcode);
          console.log('var isNotRecevied = await callIsNotReceived(barcode);');

          var isNotRecevied = await callIsNotReceived(barcode);
          console.log("Is not Received: ",isNotRecevied);
          if (isNotRecevied) {
            var result = JSON.parse(
              await ApiGet("ESP_HS_GetDespatchInfo", barcode)
            );
    
            console.log(result);
            setDetails(result);
            setDetailsContainerVisible(true);
          } else {
            alert("The order is already received");
          }
        } else {
          alert("The barcode is NOT exist within the system!");
          setText("");
        }
      }
      setIsLoading(false);
    } catch (ex) {
      setIsLoading(false);
      setDetails([]);
      console.log(ex);
    }
  };
  const callReceived = async () => {
    setDetailsContainerVisible(true);

    var barcode = text.replace(/\D/g, "");
    var result = await callReceivedApi(barcode, `${company}-${user}`);
    setIsLoading(false);
    setScanned(false);
    setText("");
    setDetailsContainerVisible(false);
  };
  const callReceivedApi = async (barcode, name) => {
    try {
      objMsg ={};
      var result = await ApiGet("ESP_HS_ReceiveDelivery", `${barcode},${name}`);
      var message = await JSON.stringify(result);
      alert("Successfully received");
      return true;


    } catch (ex) {
      alert("Error in submitting data" + ex);
    }
  };
  const callIsNotReceived = async (barcode) => {
    var methodname = "ESP_HS_IsDespatchReceived";
    var isReceived = JSON.parse(await ApiGet(methodname, barcode));
    var message = await JSON.stringify(isReceived);
    var objMsg = JSON.parse(message);
    console.log("msg is Received:" + message);

    return message === "false";
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    const getData = async () => {
      const dbUser = await getUser();
      if (dbUser.rows._array.length > 0) {
        setUser(dbUser.rows._array[0].user);
        setCompany(dbUser.rows._array[0].company);
        console.log(
          dbUser.rows._array[0].company + " " + dbUser.rows._array[0].user
        );
      }
    };
    getData();
    askForPermission();
    props.navigation.setOptions({
      headerShown: false,
    });
    if (scanned) {
      getDetailsApi();
    setEnable(false);

    }
  }, [isFocused, scanned]);
  const handleBarCodeScanned = ({ type, data }) => {
    setText(data);
    setEnable(true);
  };
  const handleScan= ()=> {
    setScanned(true);
    setEnable(false);


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
      </View>
    );
  return (
    <View style={styles.top}>
      {!scanned && (
        <View style={styles.barCodeBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ marginLeft: 0, paddingLeft: 0 }}
            BarCodeBounds="original"
             width={400}
            height={330}
          />
                     <TouchableOpacity
                     enable={enable}
                     
              color={Colors.accentColor}
              onPress={() => {
                handleScan();
              }}
              //style={[styles.submit, styles.againStyle]}
            >
              <View style={{ width:70, height: 30 ,backgroundColor:Colors.accentColor,alignContent:"center",alignItems:'center',marginTop:10,paddingTop:5,borderRadius:10,elevation:5}}>
                <Text>Scan it</Text>
              </View>
            </TouchableOpacity>
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
          {/* <Text>User:</Text> */}
          <MaterialCommunityIcons
            name="account"
            size={24}
            color={Colors.accentColor}
          />
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {company} - {user}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              width: "60%",
              marginLeft: 80,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter manually"
              keyboardType="default"
              onChangeText={setText}
              onEndEditing={() => {
                getDetailsApi();
                setScanned(true);
              }}
              value={text}
            />
          </View>
          <View style={{ justifyContent: "flex-start", width: "25%" }}>
            <TouchableOpacity
              color={Colors.accentColor}
              onPress={() => {
                setScanned(false);
                setText(null);
                setDetailsContainerVisible(false);
              }}
              style={[styles.submit, styles.againStyle]}
            >
              <View style={{ width: 30, height: 40 }}>
                <MaterialCommunityIcons
                  name="refresh-circle"
                  size={24}
                  color={Colors.accentColor}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.detailContainer}>
        {isLoading && (
          <Image
            source={require("../../assets/loading.gif")}
            style={{ width: 300, height: 300 }}
          />
        )}
        {
          detailsModalVisible && (
            <DetailsModal
              detailsModalVisible={detailsModalVisible}
              setDetailsModalVisible={setDetailsContainerVisible}
              detail={detail}
              callReceived={callReceived}
              key={1}
            ></DetailsModal>
          )

          // <Grid listData={detail} callReceived={callReceived} detailsModalVisible={detailsModalVisible}/>
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
          ></View>
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
    backgroundColor: "#e6eaf5",
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
    height: "77%",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    backgroundColor: "#e9e9e9",
    // borderBottomColor: "black",
    // borderBottomWidth: 2,
    // marginTop: 5,
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
    width: "99%",
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
