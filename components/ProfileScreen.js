import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {getNameFromFirestore} from "../firebaseConfig"; 
import {auth} from "../firebaseConfig";
import {getPhoneFromFirestore} from "../firebaseConfig";

class ProfileScreen extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        qrData: "",
    };

    async componentDidMount() {
        const user = auth.currentUser;
        if (user) {
            const {email, phone} = user;

            try {
                const phone = await getPhoneFromFirestore(email);
                const name = await getNameFromFirestore(email);
                if (name) {
                    this.setState({name});
                }
                if (email) {
                    this.setState({email});
                }
                if (phone) {
                    this.setState({phone});
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }
    }
    handleViewFriendList = () => {
        this.props.navigation.navigate("FriendList");
    };
    render() {
        const {name, email, phone} = this.state;
        const qrData = ` ${name}, ${email}, ${phone}`;
        return (
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <Text style={styles.headerText}>Thông tin cá nhân</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.profileInfoContainer}>
                        <Text style={styles.label}>Họ tên: {name}</Text>
                        {/* <Text style={styles.value}>{name}</Text> */}
                        <Text style={styles.label}>Email: {email}</Text>
                        {/* <Text style={styles.value}>{email}</Text> */}
                        <Text style={styles.label}>Số điện thoại: {phone}</Text>
                        {/* <Text style={styles.value}>{phone}</Text> */}
                    </View>
                    <TouchableOpacity onPress={this.handleViewFriendList} style={styles.viewFriendListButton}>
                        <Text style={styles.viewFriendListButtonText}>Danh sách bạn bè</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.qrCodeContainer}>
                    <QRCode value={qrData} size={200} backgroundColor="#F1F2F6" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F2F6",
        padding: 40,
    },
    profileHeader: {
        backgroundColor: "#C7EEE0",
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
        borderRadius: 6,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    editProfileContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: "#1877f2",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    viewProfileContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    // value: {
    //     fontSize: 16,
    //     marginBottom: 10,
    // },
    editButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    editButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    viewFriendsButton: {
        backgroundColor: "#4caf50",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    viewFriendsButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    qrCodeContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    viewFriendListButtonText: {
        color: "black",
        fontSize: 19,
        fontWeight: "bold",
        padding: 10,
    },

    viewFriendListButton: {
        backgroundColor: "#C7EEE0",
        display: "flex",
        alignItems: "center",
        borderRadius: 6,
    },
    infoContainer: {
        backgroundColor: "white",
        padding: 40,
        borderRadius: 6,
    },

    profileInfoContainer: {paddingBottom: 20},
});

export default ProfileScreen;
