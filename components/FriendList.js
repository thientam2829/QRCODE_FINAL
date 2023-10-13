import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFirestore, collection, onSnapshot,deleteDoc,doc } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native';
const FriendListScreen = () => {
  const [friendsList, setFriendsList] = useState([]);
  const db = getFirestore(); 

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'friends'), (snapshot) => {
      const updatedFriendsList = snapshot.docs.map((doc) => doc.data());
      setFriendsList(updatedFriendsList);
    });

    return () => unsubscribe();
  }, [db]);
  const handleDeleteFriend = async (email) => {
    try {
      const friendDocRef = doc(db, 'friends', email);
      await deleteDoc(friendDocRef);
      setFriendsList((prevFriends) => prevFriends.filter((friend) => friend.email !== email));
    } catch (error) {
      console.error('Lỗi khi xoá bạn bè:', error);
    }
  };
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Danh sách bạn bè:</Text>
      <FlatList
        data={friendsList}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Phone: {item.phone}</Text>
            <TouchableOpacity onPress={() => handleDeleteFriend(item.email)}>
        <Text style={{ color: 'red' }}>Xoá</Text>
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
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
};

export default FriendListScreen;