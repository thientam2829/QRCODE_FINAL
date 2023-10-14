import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Image} from "react-native";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebaseConfig";

const RegisterScreen = ({navigation}) => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, newUsername, newPassword);
            navigation.navigate("Login");
        } catch (error) {
            console.error("Đăng ký thất bại: ", error);
        }
    };

    const handleBack = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../images/logo.png")} />
            <Text style={styles.title}>Đăng Ký</Text>
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setNewUsername(text)} />
            <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry={true} onChangeText={(text) => setNewPassword(text)} />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
            <Button title="Trở về" onPress={handleBack} />
        </View>
    );
};

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
    input: {
        width: "80%",
        padding: 10,
        marginBottom: 10,
        //borderWidth: "none",
        outline: "none",
        backgroundColor: "white",
    },
    button: {
        width: "80%",
        backgroundColor: "#3394FE",
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    },
    logo: {
        width: 90,
        height: 90,
        marginBottom: 10,
    },
});

export default RegisterScreen;
