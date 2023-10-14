import React, {useState, useEffect} from "react";
import {View, Text, Button, TextInput, StyleSheet} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {useNavigation} from "@react-navigation/native";
import {auth} from "../firebaseConfig";
import {getFirestore, collection, addDoc, query, where, getDocs} from "firebase/firestore";

const ProfileScreen = () => {
    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [qrData, setQrData] = useState("");
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setEmail(user.email);
                checkUserInfo(user.email);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const generateQRData = () => {
        return `${name}, ${email}, ${phone}`;
    };

    const checkUserInfo = async (email) => {
        try {
            const q = query(collection(db, "USER"), where("email", "==", email));

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                navigation.navigate("Home");
            }
        } catch (error) {
            console.error("Error checking user info: ", error);
        }
    };

    const saveProfile = async () => {
        if (user) {
            try {
                const userCollectionRef = collection(db, "USER");
                await addDoc(userCollectionRef, {
                    name,
                    email,
                    phone,
                });

                console.log("User info saved to Firestore.");
                setQrData(generateQRData());

                navigation.navigate("Home");
            } catch (error) {
                console.error("Error saving user info: ", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={(text) => setPhone(text)} />
            <View style={styles.savebtn}>
                <Button title="Save" color="white" onPress={saveProfile} />
            </View>
            {qrData ? <QRCode value={qrData} size={200} /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F2F6",
        padding: 40,
    },
    input: {
        padding: 20,
        marginBottom: 10,
        borderWidth: 0,
        outline: "none",
        backgroundColor: "white",
    },

    profileHeader: {
        backgroundColor: "#C7EEE0",
        padding: 10,
        marginBottom: 30,
        alignItems: "center",
        borderRadius: 6,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },

    savebtn: {
        backgroundColor: "#3394FE",
        padding: 10,
        borderRadius: 5,
        color: "white",
    },
});

export default ProfileScreen;
