import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Landing() {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Login');
        }, 2000); 


        return () => clearTimeout(timer);
    }, []); 

    return(
        <View style={landingStyle.container}>
            <Image
                style={landingStyle.logo}
                source={require('../assets/logo.png')}
                resizeMode="center"
                accessible={true}
                accessibilityLabel={'FinFreedom Logo'}
            />
            <Text style={landingStyle.message}>
                Your Debt and Finance Consultant
            </Text>
        </View>
    );
}

const landingStyle = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor: '#000000'
    },
    logo:{
        height:316,
        width:316,
        marginTop: 150,
    },
    message:{
        marginTop: 0,
        color:'#FFFFFF',
        fontStyle: 'italic',
    },
})

export default Landing;
