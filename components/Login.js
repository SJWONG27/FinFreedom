import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, StyleSheet, Image, ScrollView, Pressable, ActivityIndicator} from 'react-native';
import { firebaseAuth } from '../firebase';

function Login({}){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigation = useNavigation()

useEffect(() =>{
    const unsubscribe = firebaseAuth.onAuthStateChanged(user =>{
        if(user){
            navigation.navigate('MainApp')
        }
    })

    return unsubscribe
}, [])

const handleSignIn =()=>{
    firebaseAuth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('log in with: ' ,user.email);
            })
            .catch(error => alert(error.message))
}

const handleForgotPassword = () => {
    firebaseAuth
        .sendPasswordResetEmail(email)
        .then(() => {
            console.log('Password reset email sent successfully');
            alert('Password reset email sent successfully');
        })
        .catch(error => {
            alert(error.message);
        });
};

    return(
        <View style={{flex:1}}>
            <View style={loginStyle.container1}>
                <Image
                    style={loginStyle.logo}
                    source={require('../assets/logo.png')}
                    resizeMode="center"
                    accessible={true}
                    accessibilityLabel={'FinFreedom Logo'}
                />
                <View style={loginStyle.container2}>
                    <Text style={loginStyle.textHeader}>Login</Text>
                    <Text style={loginStyle.text1}>Welcome Back</Text>
                </View>
            </View>
            <View style={loginStyle.container3}>
                <View>
                    <Text style={loginStyle.inputLabel}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={loginStyle.input}
                        placeholder="Enter Email"
                        keyboardType="email-address"
                />
                </View>
                <View>
                <Text style={loginStyle.inputLabel}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={loginStyle.input}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                    />
                </View>

                <Pressable
                    style={loginStyle.button2}
                    onPress={handleForgotPassword}
                >
                    <Text style={loginStyle.buttonText2}>forgot password</Text>
                </Pressable>
                <Pressable
                        style={loginStyle.button}
                        // onPress={handleSignIn}
                        onPress={()=>navigation.navigate('MainApp')}
                    >
                        <Text style={loginStyle.buttonText}>sign in</Text>
                </Pressable>
                
                <Text>Don't have an account yet?</Text>
                <Pressable
                    style={loginStyle.button2}
                    onPress={()=>navigation.navigate('Register')}
                >
                    <Text style={loginStyle.buttonText2}>Create account now</Text>
                </Pressable>
            </View>
        </View>
    );
}

const loginStyle = StyleSheet.create({
    container1:{
        flex: 0.25,
        padding: 24,
        marginTop: 25,
        backgroundColor:'#000000',
        flexDirection:'row',
        alignItems:'center',
    },
    container2:{
        marginLeft:45,
        backgroundColor:'#000000',
        flexDirection:'column',
        alignItems:'center',
    },
    container3:{
        flex: 0.75,
        marginTop: 50,
        backgroundColor:'#FFFFFF',
        flexDirection:'column',
        alignItems:'center'
    },
    logo:{
        height:127,
        width:127,
        marginTop: 20,
        marginRight:0,
    },
    textHeader:{
        color:'#FFFFFF',
        fontSize: 36,
        fontWeight:'bold',
    },
    text1:{
        color:'#FFFFFF',
        fontSize: 12,
    },
    input:{
        borderWidth:1,
        borderColor:'#000000',
        borderRadius:10,
        height: 48,
        width: 241,
        marginBottom: 30,
        paddingHorizontal:10,
    },
    inputLabel:{
        marginBottom:5,
    },
    button:{
        height:44,
        width: 200,
        backgroundColor: '#000000',
        borderRadius: 10,
        marginTop:20,
        marginBottom:50,
    },
    button2:{
        height:20,
        width: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop:10,

    },
    buttonText:{
        padding: 10,
        color: '#FFFFFF',
        textAlign:'center'
    },
    buttonText2:{
        color: '#0018EF',
        textAlign:'center',
        textDecorationLine:'underline'
    },
})

export default Login;