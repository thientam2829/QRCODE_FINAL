import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../firebaseConfig";
import { getNameFromFirestore } from "../firebaseConfig"; 
class HomeScreen extends Component {
  state = {
    name: "",
  };

  async componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      const name = await getNameFromFirestore(user.email);
      if (name) {
        this.setState({ name });
      }
    }
  }
  handleHomeButton = () => {
    this.props.navigation.navigate("Home");
  };

  handleProfileButton = () => {
    this.props.navigation.navigate("Profile");
  };

  handleLogoutButton = () => {
    this.props.navigation.navigate("Login");
  };
  handleScannerButton = () => {
    this.props.navigation.navigate("QRCodeScanner");
  };

  render() {
    const { name } = this.state;
    return (
      <View style={styles.container}>
        <Text>Xin chào {name}</Text>
        <Text style={styles.title}>Trang chủ</Text>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={this.handleHomeButton}
          >
            <FontAwesome name="home" size={24} color="black" />
            <Text style={styles.bottomButtonText}>Trang Chủ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={this.handleProfileButton}
          >
            <FontAwesome name="user" size={24} color="black" />
            <Text style={styles.bottomButtonText}>Thông Tin Cá Nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={this.handleScannerButton}
          >
            <FontAwesome name="camera" size={24} color="black" />
            <Text style={styles.bottomButtonText}>Quét QR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={this.handleLogoutButton}
          >
            <FontAwesome name="sign-out" size={24} color="black" />
            <Text style={styles.bottomButtonText}>Đăng Xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  bottomButton: {
    alignItems: "center",
  },
  bottomButtonText: {
    marginTop: 5,
  },
});

export default HomeScreen;
