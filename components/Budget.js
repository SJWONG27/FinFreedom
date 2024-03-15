import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import PickerYearMonth from '../components/smallComponents/PickerYearMonth';

function Budget(){
    return(
        <ImageBackground
            source={require('../assets/background.png')}
            style={DSRStyle.container}
        >
            <View style={DSRStyle.container2}>
                <PickerYearMonth/>
                <View style={DSRStyle.container3}>
                    <Text style={DSRStyle.title}>Income: </Text>
                    <Text style={DSRStyle.title}>Expenses:</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const DSRStyle = StyleSheet.create({
    container:{
        flex:1,
    },
    container2:{
        flex:0.30,
        marginTop: 30,
        flexDirection: 'column',
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        alignContent: 'center',
    },
    container3:{
        flex: 0.2,
        marginTop: 10,
        marginLeft: 20,
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
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#FFFFFF',
        marginBottom:10,
    }
})

export default Budget;