import React from 'react';
import {View, Text, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import PickerYearMonth from '../components/smallComponents/PickerYearMonth';

function Budget(){

    return(
        <ImageBackground
            source={require('../assets/background.png')}
            style={DSRStyle.container}
        >
            <View style={DSRStyle.container}>

                <View style={DSRStyle.container2}>
                    <Text style={DSRStyle.title}>Budget Planner</Text>
                    <PickerYearMonth/>
                    <View style={DSRStyle.container3}>
                        <Text style={DSRStyle.message1}>Income: </Text>
                        <Text style={DSRStyle.message1}>Expenses:</Text>
                    </View>
                </View>

                <ScrollView style={DSRStyle.container3}>
                    <View style={DSRStyle.container5}>
                        <View style={DSRStyle.container4}>
                            <Text style={DSRStyle.message2}>Date </Text>
                            <Text style={DSRStyle.message2}>Expenses </Text>
                            <Text style={DSRStyle.message2}>Incomes </Text>
                        </View>
                        <View>
                            <Text style={DSRStyle.message1}>Category shows here</Text>
                        </View>
                    </View>
                    
            </ScrollView>
            </View>
        </ImageBackground>
    );
}

const DSRStyle = StyleSheet.create({
    container:{
        flex:1,
    },
    container2:{
        flex:0.5,
        marginTop: 30,
        flexDirection: 'column',
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        alignContent: 'center',
    },
    container3:{
        flex: 0.6,
        margin: 10,
    },
    container4:{
        flexDirection:'row',
        borderColor:'#FFFFFF'
    },
    container5:{
        borderBottomWidth: 0.3,
        borderColor:'#FFFFFF'
    },
    logo:{
        height:316,
        width:316,
        marginTop: 150,
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color:'#6A6AFF',
        marginBottom:10,
        textAlign:'center',
        marginTop:10,
    },
    message1:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#FFFFFF',
        marginBottom:10,
    },
    message2:{
        fontSize: 12,
        fontWeight: 'bold',
        color:'#FFFFFF',
        marginBottom:10,
    },
    message1:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#FFFFFF',
        marginBottom:10,
    },
})

export default Budget;