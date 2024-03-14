import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import { firebaseAuth, firebaseFirestore} from '../firebase';

function Profile({navigation}){
    const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(''); // No user is signed in, clear the email state
      }
    });

    // Clean up function
    return () => unsubscribe();
  }, []); // Only run this effect on component mount and unmount

    const handleSignOut=()=>{
        firebaseAuth
            .signOut()
            .then(() =>{
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }
    return(
        <ImageBackground
            source={require('../assets/background.png')}
            style={profileStyle.container}
        >
            <View style={profileStyle.container2}>
                <Text style={profileStyle.message}>Email: {email}</Text>
                <Pressable
                    style={profileStyle.button}
                    onPress={handleSignOut}
                >
                    <Text style={profileStyle.buttonText}>Log Out</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const profileStyle = StyleSheet.create({
    container:{
        flex:1,
    },
    container2:{
        flex:1,
        marginTop: 40,
        alignItems:'center',
    },
    message:{
        marginTop: 0,
        color:'#FFFFFF',
        fontStyle: 'italic',
    },
    button:{
        height:40,
        width: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    buttonText:{
        padding: 10,
        color: '#000000',
        textAlign:'center'
    },
})

export default Profile;