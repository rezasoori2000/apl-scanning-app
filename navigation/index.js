import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "../screens/MainScreen";
import Login from "../screens/account/Login";
import Logout from "../screens/account/Logout";
import Settings from "../screens/Settings/Settings";
import Scanning from "../screens/scanning/Scanning";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="main"
      headerStyle={{
        color: "#fff",
        backgroundColor: Colors.primary,
      }}
      options={{}}
      screenOptions={{
        headerTitle: () => (
          <Image style={{}} source={require("../assets/apl.png")} />
        ),

        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        // headerRight: () => (
        //   <Image style={{}} source={require("../assets/apl.png")} />
        // ),
      }}
    >
      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="scanning" component={Scanning} />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerTitle: "LOGIN",
          title: "Login",
        }}
      />
      <Stack.Screen
        name="logout"
        component={Logout}
        options={{
          headerTitle: "LOGOUT",
          title: "Logout",
        }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          headerTitle: "SETTINGS",
          title: "Settings",
        }}
      />
    </Stack.Navigator>
  );
}
function MyTabs() {
  const setUser = (val) => {
    console.log(val + "  " + "Reza");
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="main"
        headerStyle={{
          color: "#fff",
          backgroundColor: Colors.primary,
        }}
        screenOptions={{
          tabBarActiveTintColor: Colors.accentColor,
          headerShown: false,
          headerLeft: () => (
            <Image
              style={{
                marginLeft: "45%",
              }}
              source={require("../assets/apl.png")}
            />
          ),
          headerTintColor: "white",
        }}
      >
        <Tab.Screen
          name="apl"
          component={MyStack}
          options={{
            headerTitle: "",

            headerStyle: { backgroundColor: "#242845" },
            tabBarLabel: "Main",

            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="login"
          component={Login}
          initialParams={{}}
          options={{
            headerStyle: { backgroundColor: "#242845" },

            headerTitle: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "#242845" },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
