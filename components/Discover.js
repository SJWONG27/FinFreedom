import React, { useState } from 'react';
import { View, Text, ImageBackground, FlatList, Pressable, Modal, TextInput, StyleSheet } from 'react-native';
import StaticBar from './smallComponents/StaticBar';
import { ScrollView } from 'react-native-gesture-handler';

const dataHome = [
    { id: '1', title: 'Buying House', info: '1300', amountSaved: '1000',remainingAmount:'300', imageUrl: require('../assets/image5.png') },
    { id: '2', title: 'Buying Phone', info: '3600', amountSaved: '1800',remainingAmount:'1800',imageUrl: require('../assets/image6.png') },
    // { id: '3', title: 'Travel to Korea', info: '1500', amountSaved: '0', imageUrl: require('../assets/image7.png') }
];

const Item = ({ id, title, info, amountSaved, imageUrl, onDelete, onUpdateAmountSaved }) => {
    const totalAmount = parseInt(info);
    const amountSavedInt = parseInt(amountSaved);
    const remainingAmount = totalAmount - amountSavedInt;
    const percentage = (amountSavedInt / totalAmount) * 100;

    return (
        <View>
            <ImageBackground
               
                style={discoverStyle.item}
             
            >
                <View style={discoverStyle.content}>
                    <Text style={discoverStyle.message3}>Goal {id} - {title}</Text>
                    <Text style={discoverStyle.message4}>Total Amount: RM {info}</Text>
                    <Text style={discoverStyle.message4}>Amount Saved: RM {amountSaved}</Text>
                    <Text style={discoverStyle.message4}>Remaining Amount: RM {remainingAmount}</Text>
                    <TextInput
                        style={discoverStyle.input}
                        placeholder="Amount Saved"
                        placeholderTextColor="#CCCCCC"
                        value={amountSaved}
                        onChangeText={(text) => onUpdateAmountSaved(id, text)}
                        keyboardType="number-pad"
                    />
                    <Text style={discoverStyle.message4}>Percentage: {percentage.toFixed(2)}%</Text>
                    <StaticBar percentage={percentage.toFixed(2)}/>
                    <Pressable onPress={() => onDelete(id)} style={discoverStyle.deleteButton}>
                        <Text style={discoverStyle.deleteButtonText}>Delete</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
};

const Discover = () => {
    const [goals, setGoals] = useState(dataHome);
    const [modalVisible, setModalVisible] = useState(false);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [newGoalInfo, setNewGoalInfo] = useState('');
    const [newAmountSaved, setNewAmountSaved] = useState('');

    const calculateRemainingAmount = (totalAmount, amountSaved) => {
        return parseInt(totalAmount) - parseInt(amountSaved);
    };

    const handleAddNewGoal = () => {
        if (newGoalTitle && newGoalInfo && newAmountSaved) {
            const remainingAmount = calculateRemainingAmount(newGoalInfo, newAmountSaved);
            console.log("Remaining amount needed:", remainingAmount);

            const newGoal = { id: String(goals.length + 1), title: newGoalTitle, info: newGoalInfo, amountSaved: newAmountSaved,remainingAmount:remainingAmount, imageUrl: require('../assets/image6.png') };
            setGoals([...goals, newGoal]);
            setModalVisible(false);
            setNewGoalTitle('');
            setNewGoalInfo('');
            setNewAmountSaved('');
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
        setNewGoalTitle('');
        setNewGoalInfo('');
        setNewAmountSaved('');
    };

    const handleDeleteGoal = (id) => {
        const updatedGoals = goals.filter(goal => goal.id !== id);
        setGoals(updatedGoals);
    };

    const handleUpdateAmountSaved = (id, amountSaved) => {
        const updatedGoals = goals.map(goal => {
            if (goal.id === id) {
                const remainingAmount = '400';
                return { ...goal, amountSaved, remainingAmount };
            }
            return goal;
        });
        setGoals(updatedGoals);
    };

    const addGoal = () => {
        if (goals.length < 3) {
            setModalVisible(true);
        }
    };

    return (
        <ScrollView>
        <ImageBackground
            
            style={discoverStyle.container}
        >
                <View style={{marginTop:25,}}>
                    {/* Introduction */}
                    <View style={discoverStyle.introContainer}>
                        <Text style={discoverStyle.introTitle}>Financial Goals</Text>
                        {/* <Text style={discoverStyle.introText}>
                            Start planning for your financial future by setting SMART goals.
                            Whether it's saving for a house, a car, or a dream vacation,
                            we're here to help you achieve your aspirations.
                        </Text> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={discoverStyle.hintTotalSaved}>Total Saved</Text>
                        <Text style={discoverStyle.hintThisMonth}>This Month</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={discoverStyle.TotalSaved}>RM 23,293.00</Text>
                        <Text style={discoverStyle.ThisMonth}>RM 398.00</Text>
                        </View>
                        
                    </View>
                    </View>
                    {goals.map(item => (
    <View key={item.id} style={discoverStyle.containerGoal}>
        <View style={discoverStyle.textContainer}>
            <Text style={discoverStyle.messageGoal}>{item.title}</Text>
            <Text style={discoverStyle.messageReach}>RM {item.amountSaved}</Text>
            <Text style={discoverStyle.messageTarget}>Left RM {item.remainingAmount}</Text>
        </View>
        <StaticBar percentage={(parseFloat(item.amountSaved) / parseFloat(item.info)) * 100} />
        {/* Replace the "Edit" button with a "Delete" button */}
        <Pressable onPress={() => handleDeleteGoal(item.id)} style={discoverStyle.deleteButton}>
            <Text>Delete</Text>
        </Pressable>
    </View>
))}

            <ScrollView>
                <View style={{marginTop:0,backgroundColor:'white'}}>
                    <Text style={discoverStyle.reminder}>Maximum 3 goals could be added</Text>
                    {goals.length < 5 && (
                        <Pressable onPress={addGoal} style={discoverStyle.addGoalButton}>
                            <Text style={discoverStyle.addGoalButtonText}>Add Goal</Text>
                        </Pressable>
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={discoverStyle.modalContainer}>
                            <View style={discoverStyle.modalContent}>
                                <Text style={discoverStyle.modalTitle}>Add New Goal</Text>
                                <TextInput
                                    style={discoverStyle.input}
                                    placeholder="Enter Your Goal"
                                    placeholderTextColor="#CCCCCC"
                                    value={newGoalTitle}
                                    onChangeText={text => setNewGoalTitle(text)}
                                    maxLength={50}
                                />
                                <TextInput
                                    style={discoverStyle.input}
                                    placeholder="Money Amount"
                                    placeholderTextColor="#CCCCCC"
                                    value={newGoalInfo}
                                    onChangeText={text => setNewGoalInfo(text)}
                                    keyboardType='number-pad'
                                />
                                <TextInput
                                    style={discoverStyle.input}
                                    placeholder="Amount Saved"
                                    placeholderTextColor="#CCCCCC"
                                    value={newAmountSaved}
                                    onChangeText={text => setNewAmountSaved(text)}
                                    keyboardType='number-pad'
                                />
                                <View style={discoverStyle.buttonContainer}>
                                    <Pressable onPress={handleCancel} style={discoverStyle.addButton}>
                                        <Text style={discoverStyle.cancelButtonText}>Cancel</Text>
                                    </Pressable>
                                    <Pressable onPress={handleAddNewGoal} style={discoverStyle.addButton}>
                                        <Text style={discoverStyle.addButtonText}>Add</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
            {/* Goal Setting Tips */}
             <View style={discoverStyle.tipsContainer}>
                        <Text style={discoverStyle.tipsTitle}>Goal Setting Tips</Text>
                        <Text style={discoverStyle.tip}>
                            1. Be Specific: Clearly define your financial goals, including the amount you want to save and the timeframe.
                        </Text>
                        <Text style={discoverStyle.tip}>
                            2. Make Them Measurable: Set measurable milestones to track your progress along the way.
                        </Text>
                        <Text style={discoverStyle.tip}>
                            3. Ensure They're Achievable: Set goals that are realistic and attainable based on your current financial situation.
                        </Text>
                        <Text style={discoverStyle.tip}>
                            4. Keep Them Relevant: Align your goals with your long-term financial objectives and personal aspirations.
                        </Text>
                        <Text style={discoverStyle.tip}>
                            5. Set a Time Frame: Establish deadlines for achieving each goal to create a sense of urgency and motivation.
                        </Text>
                    </View>
        </ImageBackground>
        </ScrollView>
    );
};

const discoverStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    container2:{
        alignItems:'left',
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop:30,
        padding:20,
        marginBottom:20,
    },
    item: {
        width: 250,
        height: 380,
        borderRadius: 10,
        marginRight: 10,
        overflow: 'hidden',
        backgroundColor:'white'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 15,
    },
    reminder: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 12,
        fontStyle: 'italic',
    },
    message3: {
        marginTop: 30,
        color: '#000',
        fontSize: 16,
    },
    message4: {
        color:'#000',
        marginTop: 10,
        fontSize: 16,
    },
    addGoalButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 10,
    },
    addGoalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        height: '40%'
    },
    modalTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        color: 'black',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#FFF',
    },
    addButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: '#8B0000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    introContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    introTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign:'center',
    },
    introText: {
        color: '#000000',
        fontSize: 16,
    },

    // Goal setting tips styles
    tipsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop:20,
    },
    tipsTitle: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tip: {
        color: '#000000',
        fontSize: 16,
        marginBottom: 5,
    },
    hintTotalSaved: {
        fontSize: 14,
        marginTop:'2%',
        marginLeft:'15%',
        color: 'rgba(0, 0, 0, 0.5)', // Adjust the color to your preference
      },
      hintThisMonth: {
        fontSize: 14,
        marginTop:'2%',
        marginRight:'15%',
        color: 'rgba(0, 0, 0, 0.5)', // Adjust the color to your preference
      },
      TotalSaved: {
        fontSize: 20,
        marginTop:'2%',
        marginLeft:'7%',
      },
     ThisMonth: {
        fontSize: 20,
        marginTop:'2%',
        marginRight:'10.5%',
      },
      messageGoal: {
        color: '#000000',
        fontSize: 18,
        marginBottom:20,
        fontWeight:'bold',
        
    },
    messageReach:{
      fontSize: 18,
      marginBottom:20,
      fontWeight:'bold',
      color: 'green',
      marginLeft:120,
    },
    messageTarget:{
      marginTop:11,
      marginLeft:-79,
      color: '#001800',
      opacity: 0.5,
      fontStyle: 'italic',
      fontSize: 12,
      
  },
  containerGoal: {
    marginTop:10,
    padding:13,
      alignItems: 'left',
      margin: 5,

      textAlign:'center',
      marginHorizontal:28,
       backgroundColor: '#ffffff',
       borderRadius: 10,
       shadowOffset: {
         width: 0,
         height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     elevation: 10,
    
  },
  containerFollowGoal: {
    marginTop:30,
    padding:13,
      alignItems: 'left',
      margin: 5,
      textAlign:'center',
      marginHorizontal:28,
       backgroundColor: '#ffffff',
       borderRadius: 10,
       shadowOffset: {
         width: 0,
         height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     elevation: 10,
    
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default Discover;
