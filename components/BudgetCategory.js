import React, { useState } from 'react';
import {View, Text,  StyleSheet, ImageBackground, Pressable, ScrollView, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberPad from './smallComponents/NumberPad';


function BudgetCategory() {

    const [showNumberPad, setShowNumberPad] = useState(false); // State to control the visibility of the modal
    const [selectedCategory, setSelectedCategory] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handlePress = (category) => {
        setSelectedCategory(category);
        setShowNumberPad(true); // Show the number pad modal
    };
    


    const handleConfirm = (amount) => {
        // Convert entered amount to a number
        const parsedAmount = parseFloat(amount);

        if (!isNaN(parsedAmount) && parsedAmount !== 0) {
            // Perform validation or other operations here if needed
            setShowSuccessMessage(true);
            // Clear selected category and entered amount
            setSelectedCategory('');
            setEnteredAmount('');
            setShowNumberPad(false); // Close the number pad modal
        } else {
            // Input cannot be 0 or NaN, display an alert or message to the user
            alert('Please enter a valid amount.');
        }
    };

    const handleCancel = () => {
        setShowNumberPad(false); // Close the number pad modal
    };

    const handleOk = () => {
        setShowSuccessMessage(false); // Close the success message
    };

    const handleDelete = () => {
        // Remove the last character from enteredAmount
        setEnteredAmount(enteredAmount.slice(0, -1));
    };

    return(
        <ImageBackground
        
            style={budgetCategoryStyle.container}
        >
            <ScrollView style={budgetCategoryStyle.container2}>
                <View style={budgetCategoryStyle.container3}>
                    <Text style={budgetCategoryStyle.message}>Expenses</Text>
                    <View style={budgetCategoryStyle.container4}>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Food')}
                            >
                                <Ionicons name={'fast-food-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Food</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Shopping')}
                            >
                                <Ionicons name={'bag-handle-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Shopping</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Daily Use')}
                            >
                                <Ionicons name={'happy-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Daily Use</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Transport')}
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
                                onPress={() => handlePress('Fun')}
                            >
                                <Ionicons name={'balloon-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Fun</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Digital')}
                            >
                                <Ionicons name={'phone-portrait-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Digital</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Parents')}
                            >
                                <Ionicons name={'people-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Parents</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Kids')}
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
                                onPress={() => handlePress('Rent')}
                            >
                                <Ionicons name={'home-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Rent</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Travel')}
                            >
                                <Ionicons name={'airplane-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Travel</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Pet')}
                            >
                                <Ionicons name={'logo-octocat'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Pet</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Others')}
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
                                onPress={() => handlePress('Salary')}
                            >
                                <Ionicons name={'laptop-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Salary</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Part Time')}
                            >
                                <Ionicons name={'time-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Part Time</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Invest')}
                            >
                                <Ionicons name={'analytics-outline'} size={30}/>
                            </Pressable>
                            <Text style={budgetCategoryStyle.labelButton}>Invest</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Pressable
                                style={budgetCategoryStyle.pressButton}
                                onPress={() => handlePress('Others')}
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
                onRequestClose={handleCancel} // Add onRequestClose handler to close the modal
            >
                <View style={budgetCategoryStyle.modalContainer}>
                    <View style={budgetCategoryStyle.modalContent}>
                        <NumberPad
                            onNumberPress={(num) => setEnteredAmount(enteredAmount + num)}
                            onDeletePress={handleDelete}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                        {/* Cancel button */}
                        <Pressable onPress={handleCancel} style={budgetCategoryStyle.closeButton}>
                            <Text style={budgetCategoryStyle.closeButtonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Success message container */}
            {showSuccessMessage && (
                <View style={budgetCategoryStyle.overlay}>
                    <View style={budgetCategoryStyle.successContainer}>
                        <Text style={budgetCategoryStyle.successMessage}>Successfully recorded!</Text>
                        <Text style={budgetCategoryStyle.successMessage}>10P Gained!</Text>
                        <Pressable onPress={handleOk} style={budgetCategoryStyle.okButton}>
                            <Text style={budgetCategoryStyle.okButtonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </ImageBackground>
    );
}

const budgetCategoryStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
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
        padding:5,
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
        color:'#000000',
        fontWeight: 'bold',
    },
    pressButton:{
        backgroundColor: '#FFFFF0',
        borderRadius: 50,
        height:55,
        width: 55,
        alignItems:'center',
        justifyContent:'center',
        elevation:4,
    },
    labelButton:{
        margin:10,
        fontSize:12,
        color:'#000000',
    },

    //modal numberpad
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure the overlay is above other content
    },
    successContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        zIndex: 2, // Ensure the success message is above the overlay
    },
    successMessage: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    okButton: {
        backgroundColor: '#1A43BF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    okButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
})

export default BudgetCategory;