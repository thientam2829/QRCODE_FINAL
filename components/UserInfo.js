import React, {useState} from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity} from "react-native";
import {addDoc, collection} from "firebase/firestore";
import {firestore} from "../firebaseConfig";
const UserInfoScreen = ({route, navigation}) => {
    const {name, email, phone} = route.params;
    const [friendsList, setFriendsList] = useState([]);

    const handleAddFriend = async () => {
        try {
            const newFriend = {name, email, phone};

            // Add the friend to the 'friends' collection
            const docRef = await addDoc(collection(firestore, "friends"), newFriend);

            // Cập nhật danh sách bạn bè trong state
            setFriendsList([...friendsList, {...newFriend, id: docRef.id}]);

            // Chuyển đến trang FriendList và truyền danh sách bạn bè
            navigation.navigate("FriendList", {friendsList});
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.headerText}>Thông tin </Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.label}>Họ tên: {name}</Text>
                    {/* <Text style={styles.value}>{name}</Text> */}
                    <Text style={styles.label}>Email: {email}</Text>
                    {/* <Text style={styles.value}>{email}</Text> */}
                    <Text style={styles.label}>Số điện thoại: {phone}</Text>
                    {/* <Button title="Kết Bạn" onPress={handleAddFriend} /> */}
                </View>
                <TouchableOpacity onPress={this.handleViewFriendList} style={styles.viewFriendListButton}>
                    <Button title="Kết Bạn" onPress={handleAddFriend} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
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
    infoContainer: {
        backgroundColor: "white",
        padding: 40,
        borderRadius: 6,
    },
    profileInfoContainer: {paddingBottom: 20},
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },

    viewFriendListButton: {
        backgroundColor: "#C7EEE0",
        display: "flex",
        alignItems: "center",
        borderRadius: 6,
    },
});

export default UserInfoScreen;
