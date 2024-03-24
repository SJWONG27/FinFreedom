import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FinancialQuestionsPopup = ({ onClose, onRight, onWrong }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [questions] = useState([
        {
            question: "What is the importance of creating a budget?",
            correctAnswer: "B",
            options: [
                { label: "A. It restricts your spending", value: "A" },
                { label: "B. It helps you track your income and expenses", value: "B" },
                { label: "C. It increases your credit score", value: "C" },
                { label: "D. It eliminates the need for savings", value: "D" },
            ],
        },
        {
            question: "What is compound interest?",
            correctAnswer: "C",
            options: [
                { label: "A. Interest paid only once", value: "A" },
                { label: "B. Interest paid monthly", value: "B" },
                { label: "C. Interest calculated on the initial principal and also on the accumulated interest from previous periods", value: "C" },
                { label: "D. Interest paid annually", value: "D" },
            ],
        },
        {
            question: "Why is it important to start investing early?",
            correctAnswer: "D",
            options: [
                { label: "A. There are no risks involved", value: "A" },
                { label: "B. It is not important to start investing early", value: "B" },
                { label: "C. Investing is only for older people", value: "C" },
                { label: "D. To benefit from the power of compounding and maximize returns", value: "D" },
            ],
        },
        {
            question: "What is the difference between stocks and bonds?",
            correctAnswer: "A",
            options: [
                { label: "A. Stocks represent ownership in a company, while bonds are loans to a company or government", value: "A" },
                { label: "B. Stocks are only purchased by companies, while bonds are only purchased by individuals", value: "B" },
                { label: "C. Stocks have fixed returns, while bonds have variable returns", value: "C" },
                { label: "D. There is no difference between stocks and bonds", value: "D" },
            ],
        },
        {
            question: "What is the purpose of a credit score?",
            correctAnswer: "C",
            options: [
                { label: "A. To determine your social status", value: "A" },
                { label: "B. To make you eligible for government benefits", value: "B" },
                { label: "C. To assess your creditworthiness and likelihood of repaying debt", value: "C" },
                { label: "D. To determine your salary", value: "D" },
            ],
        },
        {
            question: "What are the benefits of saving for retirement at a young age?",
            correctAnswer: "B",
            options: [
                { label: "A. There are no benefits", value: "A" },
                { label: "B. To take advantage of compounding and ensure a comfortable retirement", value: "B" },
                { label: "C. Retirement savings are only necessary for older people", value: "C" },
                { label: "D. Retirement savings are irrelevant", value: "D" },
            ],
        },
        {
            question: "What is the difference between a debit card and a credit card?",
            correctAnswer: "A",
            options: [
                { label: "A. Debit cards deduct money directly from your bank account, while credit cards allow you to borrow money up to a certain limit", value: "A" },
                { label: "B. Debit cards are used for online purchases, while credit cards are used for in-store purchases", value: "B" },
                { label: "C. Debit cards have higher interest rates than credit cards", value: "C" },
                { label: "D. There is no difference between debit and credit cards", value: "D" },
            ],
        },
        {
            question: "What is the concept of 'emergency fund'?",
            correctAnswer: "B",
            options: [
                { label: "A. A fund used for vacation expenses", value: "A" },
                { label: "B. Money set aside to cover unexpected expenses or financial emergencies", value: "B" },
                { label: "C. A fund for purchasing luxury items", value: "C" },
                { label: "D. A fund for investing in risky assets", value: "D" },
            ],
        },
        {
            question: "Why is it important to diversify your investment portfolio?",
            correctAnswer: "C",
            options: [
                { label: "A. To focus on one specific investment and maximize returns", value: "A" },
                { label: "B. Diversification is not important", value: "B" },
                { label: "C. To reduce risk by spreading investments across different asset classes and sectors", value: "C" },
                { label: "D. To minimize taxes on investment gains", value: "D" },
            ],
        },
        {
            question: "What is the difference between saving and investing?",
            correctAnswer: "D",
            options: [
                { label: "A. There is no difference", value: "A" },
                { label: "B. Saving involves putting money aside for short-term goals, while investing involves putting money into assets with the expectation of earning a profit", value: "B" },
                { label: "C. Saving and investing are the same thing", value: "C" },
                { label: "D. Saving is preserving money, while investing is growing money over time by purchasing assets that generate income or appreciate in value", value: "D" },
            ],
        },
    ]);
    

    // Function to randomly select a question
    const selectRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestionIndex(randomIndex);
        setSelectedAnswer(null); // Reset selected answer when a new question is selected
    };

    // Function to handle user's answer selection
    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    // Function to handle confirmation of the answer
    const handleConfirm = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            console.log('Confirmed answer:', selectedAnswer);
            onRight(); // Pass the correct answer callback to the parent component
        } else {
            console.log('Confirmed answer:', selectedAnswer);
            onWrong(); // Pass the wrong answer callback to the parent component
        }
        onClose(); // Close the financial questions popup
    };

    // Function to handle closing the popup without confirmation
    const handleExit = () => {
        onClose(); // Close the financial questions popup without confirmation
    };

    // Select a random question when the component mounts
    useEffect(() => {
        selectRandomQuestion();
    }, []);

    // Render answer options for the current question
    const renderAnswerOptions = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return currentQuestion.options.map((option) => (
            <TouchableOpacity
                key={option.value}
                onPress={() => handleAnswer(option.value)}
                style={[styles.answerOption, selectedAnswer === option.value && styles.selected]}
            >
                <Text style={styles.answer}>{option.label}</Text>
            </TouchableOpacity>
        ));
    };

    // Render current question and answer options
    const renderQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return (
            <>
                <Text style={styles.title}>Financial Question</Text>
                <Text style={styles.question}>{currentQuestion.question}</Text>
                <View style={styles.answerOptions}>
                    {renderAnswerOptions()}
                </View>
            </>
        );
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                {currentQuestionIndex !== null && renderQuestion()}
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleExit}>
                        <Text style={styles.cancel}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent grey
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    container: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5, // Add elevation for shadow (Android)
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    question: {
        fontSize: 16,
        marginBottom: 10,
    },
    answerOptions: {
        marginBottom: 10,
    },
    answerOption: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selected: {
        backgroundColor: '#cce5ff', // Light blue background for selected answer
        borderColor: '#007bff', // Blue border for selected answer
        
    },
    answer: {
        fontSize: 16,
        
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    confirmButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancel: {
        fontSize: 16,
        color: 'black',
    },
});

export default FinancialQuestionsPopup;
