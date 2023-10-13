import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebaseConfig";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("ProfileScreen");
        } catch (error) {
            console.error("Đăng nhập thất bại: ", error);
            alert("Đăng nhập thất bại: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../images/logo.png")} />
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry onChangeText={(text) => setPassword(text)} />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "80%",
                    paddingTop: 20,
                }}>
                <TouchableOpacity style={[styles.button, {flex: 0.4}]} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {flex: 0.4}]} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: "80%",
        padding: 10,
        marginBottom: 10,
        borderWidth: "none",
        outline: "none",
        backgroundColor: "white",
    },
    button: {
        backgroundColor: "#3394FE",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },

    logo: {
        width: 90,
        height: 90,
        marginBottom: 10,
    },
});

export default LoginScreen;
