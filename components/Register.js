import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Image, Pressable} from 'react-native';
import { firebaseAuth } from '../firebase';

function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation()

    const handleRegisterAccount =()=>{
        firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('register with: ' ,user.email);
            })
            .catch(error => alert(error.message))
    }
    
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
                    <Text style={loginStyle.text1}>Nice to see you</Text>
                </View>
            </View>
            <View style={loginStyle.inputContainer}>
                <View>
                    <Text style={loginStyle.inputLabel}>Username</Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        style={loginStyle.input}
                        placeholder="Create Username"
                />
                </View>
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
                <View>
                <Text style={loginStyle.inputLabel}>Confirm Password</Text>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={loginStyle.input}
                        placeholder="Enter Password Again"
                        secureTextEntry={true}
                    />
                </View>


                <Pressable
                    style={loginStyle.button}
                    onPress={handleRegisterAccount}
                >
                    <Text style={loginStyle.buttonText}>Register</Text>
                </Pressable>
                <Text style={loginStyle.textAccount}>Already have an account?</Text>
                <Pressable
                    style={loginStyle.button2}
                    onPress={()=>navigation.navigate('Login')}
                >
                    <Text style={loginStyle.buttonTextSignInAccount}>Sign In</Text>
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
    //     marginTop: 20,
    //     backgroundColor:'#FFFFFF',
    //     flexDirection:'column',
    //     alignItems:'center'
    // },
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
        marginBottom: 10,
        paddingHorizontal:10,
    },
    inputLabel:{
        marginTop: 5,
        marginBottom:5,
    },
    button:{
        height:44,
        width: 200,
        backgroundColor: '#000000',
        borderRadius: 10,
        marginTop:20,
        marginBottom: 25,
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
    buttonText2:{
        color: '#0018EF',
        textAlign:'center',
        textDecorationLine:'underline'
    },
    buttonTextSignInAccount:{
        color: '#000000',
        marginLeft:155,
        marginTop: -19,
        fontWeight: 'bold',
    },
    textAccount:{
        marginLeft:-55,
        marginTop: 5,
        opacity: 0.5,
    }
})

export default Register;