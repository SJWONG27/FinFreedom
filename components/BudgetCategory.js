import React from "react";
import {View, Text,  StyleSheet, ImageBackground} from 'react-native';

function BudgetCategory() {
    return(
        <ImageBackground
            source={require('../assets/background.png')}
            style={budgetCategoryStyle.container}
        >
            <Text style={budgetCategoryStyle.message}>Budget Category</Text>
        </ImageBackground>
    );
}

const budgetCategoryStyle = StyleSheet.create({
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

export default BudgetCategory;