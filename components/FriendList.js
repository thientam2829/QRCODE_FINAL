import React, {useEffect, useState} from "react";
import {View, Text, FlatList} from "react-native";
import {getFirestore, collection, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import {TouchableOpacity} from "react-native";
const FriendListScreen = () => {
    const [friendsList, setFriendsList] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "friends"), (snapshot) => {
            const updatedFriendsList = snapshot.docs.map((doc) => doc.data());
            setFriendsList(updatedFriendsList);
        });

        return () => unsubscribe();
    }, [db]);
    const handleDeleteFriend = async (email) => {
        try {
            const friendDocRef = doc(db, "friends", email);
            await deleteDoc(friendDocRef);
            setFriendsList((prevFriends) => prevFriends.filter((friend) => friend.email !== email));
        } catch (error) {
            console.error("Lỗi khi xoá bạn bè:", error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Danh sách bạn bè:</Text>
            </View>
            <FlatList
                data={friendsList}
                keyExtractor={(item) => item.email}
                renderItem={({item}) => (
                    <View style={styles.friendItem}>
                        <Text style={styles.friendName}>Họ tên : {item.name}</Text>
                        <Text>Email : {item.email}</Text>
                        <Text>Số điện thoại : {item.phone}</Text>
                        <TouchableOpacity onPress={() => handleDeleteFriend(item.email)}>
                            <Text style={{color: "red"}}>Xoá</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = {
    friendItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        with: "100%",
        marginLeft: "7%",
        marginRight: "7%",
    },
    friendName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    header: {
        backgroundColor: "#C7EEE0",
        padding: 10,
        marginBottom: 40,
        marginTop: 40,
        alignItems: "center",
        borderRadius: 6,
        marginLeft: "10%",
        marginRight: "10%",
    },

    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },

    container: {
        backgroundColor: "#F1F2F6",
        flex: 1,
    },
};

export default FriendListScreen;
