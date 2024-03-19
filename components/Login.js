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
                    <Text style={loginStyle.text1}>Welcome Back</Text>
                </View>
            </View>
            <View style={loginStyle.inputContainer}>
                <View>
                    <Text style={loginStyle.inputEmail}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={loginStyle.input}
                        placeholder="Enter Email"
                        keyboardType="email-address"
                />
                </View>
                <View>
                <Text style={loginStyle.inputPassword}>Password</Text>
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
                    <Text style={loginStyle.buttonTextForgotPassword}>Forgot Password?</Text>
                </Pressable>
                <Pressable
                        style={loginStyle.button}
                        onPress={handleSignIn}
                        // onPress={()=>navigation.navigate('MainApp')}
                    >
                        <Text style={loginStyle.buttonText}>Sign In</Text>
                </Pressable>
                
                <Text style={loginStyle.textAccount}>Don't have an account?</Text>
                <Pressable
                    style={loginStyle.button2}
                    onPress={()=>navigation.navigate('Register')}
                >
                    <Text style={loginStyle.buttonTextCreateAccount}>Register</Text>
                </Pressable>
            </View>
        </View>
    );
}

const loginStyle = StyleSheet.create({
    container1:{
        flex: 0.4,
        padding: 24,
      //  marginTop: 25,
        backgroundColor:'#000000',
        flexDirection:'row',
        alignItems:'center',
    },
    container2:{
        left: '50%', 
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        flexDirection:'column',
        alignItems:'center',
        marginLeft: -27, 
        marginTop: 160,
    },
    // container3:{
    //     flex: 0.75,
    //    marginTop: 50,
    //     backgroundColor:'#FFFFFF',
    //     flexDirection:'column',
    //     alignItems:'center'
    // },
    logo:{
        position: 'absolute',
        height:200,
        width:200,
        left: '50%', 
        marginLeft: -77, 
        top: 80,
    },
    textHeader:{
        color:'#FFFFFF',
        fontSize: 36,
        fontWeight:'bold',
    },
    text1:{
        color:'#FFFFFF',
        fontSize: 13,
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
    inputContainer: {
        position: 'absolute',
        top: '35%',
        maxWidth: 300, 
        width: '80%',  
        alignSelf: 'center',       
        flex: 0.7,
        borderRadius: 10,
        padding: 8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'center',
    },
    inputEmail:{
        marginTop:12,
        marginBottom:5,
    },
    inputPassword:{
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
       

    },
    buttonText:{
        padding: 10,
        color: '#FFFFFF',
        textAlign:'center'
    },
    buttonTextForgotPassword:{
        marginLeft: -18,
     marginTop: -28,
        color: '#001800',
        opacity: 0.5,
        fontStyle: 'italic',
        fontSize: 13,
        
    },
    buttonTextCreateAccount:{
        color: '#000000',
        marginLeft:140,
        marginTop: -19,
        fontWeight: 'bold',
    },
    textAccount:{
        marginLeft:-70,
        marginTop: 5,
        opacity: 0.5,
    }
    
})

export default Login;