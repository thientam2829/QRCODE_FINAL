import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import icons từ Expo

import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import LogoutScreen from "./LogoutScreen";
import QRCodeScannerScreen from "./QRCodeScannerScreen";
import QRCodeScanner from "react-native-qrcode-scanner";
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Trang Chủ",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="home" size={24} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Thông Tin Cá Nhân",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="person" size={24} color={tintColor} />
        ),
      },
    },
    Logout: {
      screen: LogoutScreen,
      navigationOptions: {
        tabBarLabel: "Đăng Xuất",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="log-out" size={24} color={tintColor} />
        ),
      },
    },
    QRScanner: {
      screen: QRCodeScannerScreen,
      navigationOptions: {
        tabBarLabel: "Quét QR",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="camera" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    activeColor: "#007BFF",
    inactiveColor: "#ccc",
    barStyle: { backgroundColor: "#fff" },
  }
);

export default TabNavigator;
