import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Colors from "../../constants/Colors";

const Scanning = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState("Not Scan Yet");
  const [scanned, setScanned] = useState(false);

  const askForPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };
  useEffect(() => {
    askForPermission();
    //   props.navigation.setOptions({
    //     headerShown: false,
    //   });
  }, []);
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

        <Button
          onPress={() => askForPermission()}
          title="Allow use Camer"
        ></Button>
      </View>
    );
  return (
    <View style={styles.center}>
      <View style={styles.barCoeBox}>
        {!scanned && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        )}
      </View>
      <Text style={styles.mainText}>{text}</Text>
      {scanned && (
        <View>
          <Button
            title="Scan Again?"
            onPress={() => setScanned(false)}
          ></Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  barCoeBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: Colors.accentColor,
  },
  mainText: {
    fontSize: 16,
    margin: 50,
  },
});

export default Scanning;
