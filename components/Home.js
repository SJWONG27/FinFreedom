import React,  { useState } from 'react';
import {View, Text, StyleSheet, ImageBackground, Image, ScrollView, Pressable, TouchableOpacity, Linking} from 'react-native';
import PointsCircle from '../components/smallComponents/PointsCircle';
import StaticBar from '../components/smallComponents/StaticBar';
import NewsItem from '../components/smallComponents/NewsItem';

function Home(){

    return(
        <ImageBackground
            source={require('../assets/background.png')}
            style={homeStyle.container}
        >
            <ScrollView>
            <View style={homeStyle.container2}>
                <View style={homeStyle.container3}>
                    <Image
                        source={require('../assets/profileimg.jpg')}
                        style={homeStyle.profileImage}
                    />
                    <View style={homeStyle.container4}>
                        <Text style={homeStyle.message2}>Good Day</Text>
                        <Text style={homeStyle.message1}>Zhang LinHe</Text>
                    </View>
                    <Pressable style={{marginLeft:50}}>
                        <PointsCircle text="7000 points" />
                    </Pressable>
                </View>
                <View style={homeStyle.container6}>
                    <Text style={homeStyle.message5}>Income:</Text>
                    <Text style={homeStyle.message5}>Expenses:</Text>
                    <Text style={homeStyle.message5}>Balance:</Text>
                </View>
                <View style={homeStyle.container7}>
                    <Text style={homeStyle.message5}>Goal 1: Buying house</Text>
                    <StaticBar percentage={70}/>
                    <Text style={homeStyle.message5}>Goal 2: Buying Car</Text>
                    <StaticBar percentage={50}/>
                    <Text style={homeStyle.message5}>Goal 3: None</Text>
                    <StaticBar percentage={20}/>
                </View>
                <View style={{margin:10}}>
                    <NewsItem incomeRange={8000}/>
                </View>
            </View>
            </ScrollView>
        </ImageBackground>
    );
}


const homeStyle = StyleSheet.create({
    container:{
        flex:1,
    },
    container2:{
        flex:1,
        marginTop:20,
    },
    container3:{
        flex:0.25,
        flexDirection:'row',
        margin:20,
        marginTop:40,
        alignItems:'center',
    },
    container4:{
        marginLeft:25,
    },
    container5:{
        flexDirection:'row',
        marginTop: 10,
        alignItems:'center',
    },
    container6:{
        alignItems:'left',
        height: 140,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        margin:15,
        padding:20,
    },
    container7:{
        alignItems:'left',
        margin:15,
    },
    message1:{
        color:'#FFFFFF',
        fontSize: 16,
        fontWeight:'bold',
    },
    message2:{
        color:'#FFFFFF',
        fontSize: 14,
    },
    message3:{
        marginTop:30,
        color:'#FFFFFF',
        fontSize: 16,
    },
    message4:{
        color:'#FFFFFF',
        marginTop:60,
        fontSize: 22,
        fontWeight:'bold',
    },
    message5:{
        color:'#FFFFFF',
        fontSize: 16,
        marginTop: 10,
    },
    profileImage: {
        width: 100, 
        height: 100,
        borderRadius: 50, 
    },
})
export default Home;