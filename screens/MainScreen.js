import React, { useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "../constants/Colors";

const MainScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
    });
  });
  return (
    <View style={styles.mainIcons}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("scanning")}
        style={styles.roundButton2}
      >
        <Image
          source={require("../assets/scan2.png")}
          style={styles.ImageIconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainIcons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  roundButton2: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#dbeaf3",
    borderColor: Colors.accentColor,
    borderWidth: 2,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    elevation: 10,
    overflow: "hidden",
  },
  ImageIconStyle: {
    overflow: "hidden",
    // borderRadius: 100,
    width: 100,
    height: 130,
  },
});

export default MainScreen;
