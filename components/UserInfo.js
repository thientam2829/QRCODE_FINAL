import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../firebaseConfig'; 
const UserInfoScreen = ({ route, navigation }) => {
  const { name, email, phone } = route.params;
  const [friendsList, setFriendsList] = useState([]);

  const handleAddFriend = async () => {
    try {
      const newFriend = { name, email, phone };
      
      // Add the friend to the 'friends' collection
      const docRef = await addDoc(collection(firestore, 'friends'), newFriend);
  
      // Cập nhật danh sách bạn bè trong state
      setFriendsList([...friendsList, { ...newFriend, id: docRef.id }]);
  
      // Chuyển đến trang FriendList và truyền danh sách bạn bè
      navigation.navigate('FriendList', { friendsList });
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone: {phone}</Text>
      <Button title="Kết Bạn" onPress={handleAddFriend} />
    </View>
  );
  }

export default UserInfoScreen;
