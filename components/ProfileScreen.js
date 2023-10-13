import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { getNameFromFirestore } from '../firebaseConfig'; // Import the function
import { auth } from '../firebaseConfig'; // Import Firebase authentication
import { getPhoneFromFirestore } from '../firebaseConfig';

class ProfileScreen extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    qrData: '',
  };

  async componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      const { email,phone } = user;

      try {
       const phone=await getPhoneFromFirestore(email);
        const name = await getNameFromFirestore(email);
        if (name) {
          this.setState({ name });
        }
        if(email){this.setState({email})};
        if(phone){this.setState({phone})};
    
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
      
    }
    
  }
  handleViewFriendList = () => {
    // Navigate to FriendList screen
    // You should have a navigation object from react-navigation or similar to navigate
    this.props.navigation.navigate('FriendList');
  };
  render() {
    const { name, email, phone} = this.state;
    const qrData = ` ${name}, ${email}, ${phone}`;
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.headerText}>Thông tin cá nhân</Text>
        </View>
        <View style={styles.profileInfoContainer}>
          <Text style={styles.label}>Họ và Tên:</Text>
          <Text style={styles.value}>{name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>{phone}</Text>

        </View>
        <TouchableOpacity onPress={this.handleViewFriendList} style={styles.viewFriendListButton}>
          <Text style={styles.viewFriendListButtonText}>Xem danh sách bạn bè</Text>
        </TouchableOpacity>
          <View style={styles.qrCodeContainer}>
          <QRCode value={qrData} size={200} />
        </View> 
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 20,
  },
  profileHeader: {
    backgroundColor: "blue",
    padding: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
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
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
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
});

export default ProfileScreen;
