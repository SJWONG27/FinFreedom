import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, Image, TextInput, Modal } from 'react-native';
import { firebaseAuth } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const defaultProfileImage = require('../assets/profileimg.jpg');

function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleEditProfile = () => {
    setModalVisible('editProfile');
  }

  const handleChangePassword = () => {
    setModalVisible('changePassword');
  }

  const handleAbout = () => {
    setModalVisible('about');
  }

  const handleUpdateProfilePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePhoto(result.uri);
    }
  }

  const handleSaveChanges = () => {
    setModalVisible(null);
  }

  const handleChangePasswordSave = () => {
    setModalVisible(null);
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={profileStyle.container}
    >
      <View style={profileStyle.container2}>
        <View style={profileStyle.profileContainer}>
          <Image
            source={profilePhoto ? { uri: profilePhoto } : (user?.photoURL ? { uri: user.photoURL } : defaultProfileImage)}
            style={profileStyle.profileImage}
          />
          <Text style={profileStyle.username}>{user?.displayName || "Sample User"}</Text>
          {user?.email && <Text style={profileStyle.email}>{user.email}</Text>}
        </View>
        <View style={profileStyle.buttonContainer}>
          <Pressable style={profileStyle.button} onPress={handleUpdateProfilePhoto}>
            <Text style={profileStyle.buttonText}>Update Profile Photo</Text>
          </Pressable>
          <Pressable style={profileStyle.button} onPress={handleEditProfile}>
            <Text style={profileStyle.buttonText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={profileStyle.button} onPress={handleChangePassword}>
            <Text style={profileStyle.buttonText}>Change Password</Text>
          </Pressable>
          <Pressable style={profileStyle.button} onPress={handleAbout}>
            <Text style={profileStyle.buttonText}>About</Text>
          </Pressable>
        </View>
        <Pressable
          style={profileStyle.button}
          onPress={handleSignOut}
        >
          <Text style={profileStyle.buttonText}>Log Out</Text>
        </Pressable>
        <Text style={profileStyle.motto}>Empower Yourself Financially</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible === 'editProfile'}
        onRequestClose={() => {
          setModalVisible(null);
        }}
      >
        <Pressable
          style={profileStyle.modalBackground}
          onPress={() => setModalVisible(null)}
        >
          <View style={profileStyle.modalContainer}>
            <View style={profileStyle.modalContent}>
              <Text style={profileStyle.modalTitle}>Edit Profile</Text>
              <TextInput
                style={profileStyle.input}
                placeholder="Enter Display Name"
                value={displayName}
                onChangeText={text => setDisplayName(text)}
              />
              <TextInput
                style={profileStyle.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <Pressable style={profileStyle.buttonEP} onPress={handleSaveChanges}>
                <Text style={profileStyle.buttonTextEP}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible === 'changePassword'}
        onRequestClose={() => {
          setModalVisible(null);
        }}
      >
        <Pressable
          style={profileStyle.modalBackground}
          onPress={() => setModalVisible(null)}
        >
          <View style={profileStyle.modalContainer}>
            <View style={profileStyle.modalContent}>
              <Text style={profileStyle.modalTitle}>Change Password</Text>
              <TextInput
                style={profileStyle.input}
                placeholder="Current Password"
                secureTextEntry={true}
                value={currentPassword}
                onChangeText={text => setCurrentPassword(text)}
              />
              <TextInput
                style={profileStyle.input}
                placeholder="New Password"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
              />
              <TextInput
                style={profileStyle.input}
                placeholder="Confirm New Password"
                secureTextEntry={true}
                value={confirmNewPassword}
                onChangeText={text => setConfirmNewPassword(text)}
              />
              <Pressable style={profileStyle.buttonEP} onPress={handleChangePasswordSave}>
                <Text style={profileStyle.buttonTextEP}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible === 'about'}
        onRequestClose={() => {
          setModalVisible(null);
        }}
      >
        <Pressable
          style={profileStyle.modalBackground}
          onPress={() => setModalVisible(null)}
        >
          <View style={profileStyle.modalContainer}>
            <View style={profileStyle.modalContent}>
              <Text style={profileStyle.modalTitle}>About</Text>
              {/* Add about content here */}
              <Text>Our financial education app empowers young individuals with budget planning tools, investment insights, and expense management features to help them achieve financial stability and make informed financial decisions.</Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </ImageBackground>
  );
}

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },
  email: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    marginVertical: 20, 
  },
  button: {
    height: 40,
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    textAlign:'center',
    alignItems: 'center',
  },
  buttonEP: {
    height: 40,
    width:'100%',
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    marginTop:10,
    marginBottom: 10,
    textAlign:'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonText: {
    padding: 10,
    color: '#000000',
    textAlign: 'center',
  },
  buttonTextEP:{
    alignItems: 'center',
    fontSize:15,
    padding:10,
    borderRadius:15,
    textAlign:'center',
    width:'100%',
    fontWeight:'bold',
  },
  motto: {
    color: 'lightgreen', 
    fontSize: 20,
    marginTop: 150, 
    marginBottom: 10, 
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'transparent',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width:'100%',
  },
});

export default Profile;