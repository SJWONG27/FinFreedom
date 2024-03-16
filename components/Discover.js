import React, { useState } from 'react';
import { View, Text, ImageBackground, FlatList, Pressable, Modal, TextInput, StyleSheet } from 'react-native';
import StaticBar from './smallComponents/StaticBar';
import { ScrollView } from 'react-native-gesture-handler';

const dataHome = [
    { id: '1', title: 'Buy House', info: '250000', amountSaved: '0', imageUrl: require('../assets/image5.png') },
    { id: '2', title: 'Buy Car', info: '300000', amountSaved: '0', imageUrl: require('../assets/image6.png') },
    // { id: '3', title: 'Travel to Korea', info: '1500', amountSaved: '0', imageUrl: require('../assets/image7.png') }
];

const Item = ({ id, title, info, amountSaved, imageUrl, onDelete, onUpdateAmountSaved }) => {
    const amountToBeSaved = parseInt(info);
    const amountSavedInt = parseInt(amountSaved);
    const percentage = (amountSavedInt / amountToBeSaved) * 100;

    return (
        <View>
            <ImageBackground
                source={imageUrl}
                style={discoverStyle.item}
                imageStyle={discoverStyle.imageBackground}
            >
                <View style={discoverStyle.content}>
                    <Text style={discoverStyle.message3}>Goal {id} - {title}</Text>
                    <Text style={discoverStyle.message4}>RM {info}</Text>
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

    const addGoal = () => {
        if (goals.length < 3) {
            setModalVisible(true);
        }
    };

    const handleAddNewGoal = () => {
        if (newGoalTitle && newGoalInfo && newAmountSaved) {
            const newGoal = { id: String(goals.length + 1), title: newGoalTitle, info: newGoalInfo, amountSaved: newAmountSaved, imageUrl: require('../assets/image6.png') };
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
                return { ...goal, amountSaved };
            }
            return goal;
        });
        setGoals(updatedGoals);
    };

    return (
        <ImageBackground
            source={require('../assets/background.png')}
            style={discoverStyle.container}
        >
            <ScrollView>
            <View style={discoverStyle.container2}>
                <Text style={discoverStyle.modalTitle}>Income:</Text>
                <Text style={discoverStyle.modalTitle}>Budget:</Text>
                <Text style={discoverStyle.modalTitle}>Expenses:</Text>
                <Text style={discoverStyle.modalTitle}>Balance:</Text>
            </View>
            <View>
                <FlatList
                    style={{ margin: 10, marginTop: 30 }}
                    data={goals}
                    horizontal
                    renderItem={({ item }) => (
                        <Item
                            id={item.id}
                            title={item.title}
                            info={item.info}
                            amountSaved={item.amountSaved}
                            imageUrl={item.imageUrl}
                            onDelete={handleDeleteGoal}
                            onUpdateAmountSaved={handleUpdateAmountSaved}
                        />
                    )}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={139}
                    decelerationRate="fast"
                    indicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                />
                <Text style={discoverStyle.reminder}>Maximum 3 goals could be added</Text>
                {goals.length < 3 && (
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
        </ImageBackground>
    );
};

const discoverStyle = StyleSheet.create({
    container: {
        flex: 1,
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
        height: 250,
        borderRadius: 10,
        marginRight: 10,
        overflow: 'hidden',
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
        color: '#FFFFFF',
        fontSize: 16,
    },
    message4: {
        color: '#FFFFFF',
        marginTop: 10,
        fontSize: 16,
    },
    addGoalButton: {
        backgroundColor: '#1A43BF',
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
        backgroundColor: '#000000',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        height: '40%'
    },
    modalTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        color: 'white',
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
        backgroundColor: '#000000',
    },
    addButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#1A43BF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: '#8B0000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#8B0000',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Discover;
