import React, { useState } from 'react';
import {View, Text,  StyleSheet, ImageBackground, Pressable, ScrollView, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberPad from './smallComponents/NumberPad';

function BudgetCategory() {

    const [showNumberPad, setShowNumberPad] = useState(false); // State to control the visibility of the modal

    const handlePress = () => {
        setShowNumberPad(!showNumberPad); // Toggle the visibility of the modal
    };


    return(
        <ImageBackground
            source={require('../assets/background.png')}
            style={budgetCategoryStyle.container}
        >
            <ScrollView style={budgetCategoryStyle.container2}>
                <View style={budgetCategoryStyle.container3}>
                    <Text style={budgetCategoryStyle.message}>Expenses</Text>
                    <View style={budgetCategoryStyle.container4}>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'fast-food-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Food</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'bag-handle-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Shopping</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'happy-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Daily Use</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'car-sport-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Transport</Text>
                        </View>
                    </View>

                    <View style={budgetCategoryStyle.container4}>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'balloon-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Fun</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'phone-portrait-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Digital</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'people-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Parents</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                            >
                                <Ionicons name={'accessibility-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Kids</Text>
                        </View>
                    </View>
                    <View style={budgetCategoryStyle.container4}>
                    <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'home-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Rent</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'airplane-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Travel</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'logo-octocat'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Pet</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'cash-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Others</Text>
                        </View>
                    </View>
                </View>

                <View style={budgetCategoryStyle.container3}>
                    <Text style={budgetCategoryStyle.message}>Incomes</Text>
                    <View style={budgetCategoryStyle.container4}>
                    <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'laptop-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Salary</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'time-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Part Time</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'analytics-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Invest</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={handlePress}
                            >
                                <Ionicons name={'download-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Others</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showNumberPad} // Control the visibility of the modal
                onRequestClose={handlePress} // Add onRequestClose handler to close the modal
            >
                <View style={budgetCategoryStyle.modalContainer}>
                    <View style={budgetCategoryStyle.modalContent}>
                        <NumberPad />
                        <Pressable onPress={handlePress} style={budgetCategoryStyle.closeButton}>
                            <Text style={budgetCategoryStyle.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </ImageBackground>
    );
}

const budgetCategoryStyle = StyleSheet.create({
    container:{
        flex:1,
    },
    container2:{
        flex: 1,
        marginTop:40,
        paddingHorizontal:10,

    },
    container3:{
        flex:1,
        marginBottom:70,
    },
    container4:{
        marginTop:20,
        padding:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo:{
        height:316,
        width:316,
        marginTop: 150,
    },
    message:{
        fontSize:20,
        color:'#FFFFFF',
        fontWeight: 'bold',
    },
    pressButton:{
        backgroundColor: '#d3d3d3',
        borderRadius: 50,
        height:55,
        width: 55,
        alignItems:'center',
        justifyContent:'center',
    },
    labelButton:{
        fontSize:12,
        color:'#FFFFFF',
    },

    //modal numberpad
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        minHeight: '50%', 
        width: '100%',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#8B0000',
    },
})

export default BudgetCategory;