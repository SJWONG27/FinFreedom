import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import PickerYearMonth from '../components/smallComponents/PickerYearMonth';

function Budget(){
    return(
        <ImageBackground
            source={require('../assets/background.png')}
            style={DSRStyle.container}
        >
            <View>
                <PickerYearMonth/>
            </View>
        </ImageBackground>
    );
}

const DSRStyle = StyleSheet.create({
    container:{
        flex:1,
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

export default Budget;