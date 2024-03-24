import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, Pressable, TouchableOpacity, Linking, Modal } from 'react-native';
import PointsCircle from '../components/smallComponents/PointsCircle';
import NewsItem from '../components/smallComponents/NewsItem';
import { useNavigation } from '@react-navigation/native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import Points from './Points'
import StaticBar from '../components/smallComponents/StaticBar';

import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
import FinancialQuestionsPopup from './smallComponents/FinancialQuestionsPopUp';
import { usePremiumStatus } from '../components/Premium';


function Home({ isLoggedIn }) {
  // Assuming income and expenses are retrieved from some source
  const income = 5000;
  const expenses = 2340.40;

  // State to manage visibility of the financial questions popup
  const [showFinancialQuestions, setShowFinancialQuestions] = useState(true);
  const [answerResult, setAnswerResult] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [budgetSuggestions, setBudgetSuggestions] = useState([]);
  const { isPremiumUser } = usePremiumStatus();

  // Effect to show the financial questions popup when the user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      setShowFinancialQuestions(true);
    }
  }, [isLoggedIn]);

  // Function to handle the user's answer to financial questions
  const handleAnswer = (answer) => {
    // Handle the user's answer here
    // You can update points or perform any other action based on the answer
    console.log('User selected answer:', answer);
    setAnswered(true);
    // Close the financial questions popup
    setShowFinancialQuestions(false);

  };

  // Function to handle exiting the financial questions popup
  const handleExit = () => {
    // Close the financial questions popup without confirmation
    setShowFinancialQuestions(false);
  };

  const handleConfirm = (selectedAnswer) => {
    // Handle confirmation here, you can do something with selectedAnswer
    // For example, send it to the server
    console.log('Confirmed answer:', selectedAnswer);
    // Close the financial questions popup
    setShowFinancialQuestions(false);
  };

  const handleRightAnswer = () => {
    setAnswerResult('Correct');
    setAnswered(true);
    setShowFinancialQuestions(false);
  };

  // Function to handle a wrong answer
  const handleWrongAnswer = () => {
    setAnswered(true);
    setAnswerResult('Wrong');
  };

  const handleAcknowledgeResult = () => {
    setAnswerResult(null);
  };

  const handlePress = () => {
    // Set setfinancialquestionspopup to true when the Pressable is pressed
    setShowFinancialQuestions(true);
  };

  const enabledButtonStyle = {
    marginLeft: 20,
  };
  const disabledButtonStyle = {
    marginLeft: 20,
    opacity: 0.5, // Reduce opacity to indicate the disabled state
    // You can also change the background color or any other style properties to visually indicate the disabled state
  };
  // Calculate balance
  const balance = income - expenses;

  const handleAIBudgetSuggestion = () => {
    // Calculate remaining balance after deducting expenses
    const remainingBalance = balance;

    // Define an array to store budget suggestions
    let budgetSuggestions = [];

    // Check the remaining balance and provide personalized suggestions
    if (remainingBalance > 0) {
      if (remainingBalance >= 200) {
        budgetSuggestions.push({
          category: 'Emergency Fund',
          suggestion: `It's important to have an emergency fund regardless of your income level. Allocate some of your remaining balance to start building this fund. Even setting aside RM 50 per month can provide a safety net for unexpected expenses.`
        });
      }
      if (remainingBalance >= 1000 && remainingBalance <= 2999) {
        budgetSuggestions.push({
          category: 'Car Fund',
          suggestion: `Given your current balance, you might want to start saving for a car. Setting aside RM 200-300 per month can help you reach a down payment goal within a few years.`
        });
      }
      if (remainingBalance >= 3000 && remainingBalance <= 4999) {
        budgetSuggestions.push({
          category: 'House Fund',
          suggestion: `With your current balance, you could start saving for a down payment on a house. Aim to set aside RM 500-800 per month to reach your goal within 5-10 years.`
        });
      }
      if (remainingBalance >= 5000 && remainingBalance <= 9999) {
        budgetSuggestions.push({
          category: 'Investment Fund',
          suggestion: `Given your balance, it might be wise to consider investing for the future. Explore options such as low-cost index funds or retirement accounts to help grow your wealth over time.`
        });
      }
      if (remainingBalance >= 10000) {
        budgetSuggestions.push({
          category: 'Financial Freedom',
          suggestion: `Wow! With your current balance, you have some exciting opportunities ahead. Think about how you can use this money to work for you, whether it's through investments, starting a business, or other ventures.`
        });
      }
    } else {
      // If remaining balance is negative, suggest reducing spending by 20%
      budgetSuggestions.push({
        category: 'Spending',
        suggestion: 'It looks like your expenses have exceeded your income for the month. Consider reviewing your expenses and finding ways to cut back on non-essential purchases to avoid accumulating more debt.'
      });
    }

    // Set the budget suggestions
    setBudgetSuggestions(budgetSuggestions);

  // Show the modal with budget suggestions
  setIsModalVisible(true);
};



  const navigation = useNavigation();

    return (
        <ImageBackground
          //  source={require('../assets/background.png')}
            style={homeStyle.container}
        >
         {showFinancialQuestions && (
                <FinancialQuestionsPopup
                    onConfirm={handleConfirm}
                    onExit={handleExit}
                    onClose={handleExit}
                    onRight={handleRightAnswer} // Pass the callback for correct answer
                    onWrong={handleWrongAnswer} 
                />
            )}
            {answerResult && (
                <View style={homeStyle.overlay}>
                    <View style={homeStyle.answerContainer}>
                        <Text style={homeStyle.resultText}>{answerResult === 'Correct' ? 'Correct answer! You gained 10 points.' : 'Incorrect answer. Try again tomorrow!'}</Text>
                        <TouchableOpacity onPress={handleAcknowledgeResult} style={homeStyle.okButton}>
                            <Text style={homeStyle.okButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <ScrollView>
                <View style={homeStyle.container2}>
                    <View style={homeStyle.container3}>
                        <Image
                            source={require('../assets/profileimg.jpg')}
                            style={homeStyle.profileImage}
                        />
                        <View style={homeStyle.container4}>
                            <Text style={homeStyle.message2}>Good Day</Text>
                            <Text style={homeStyle.message1}>Zhang</Text>
                        </View>
                        <Pressable style={{ marginLeft: 50 ,backgroundColor:'#FFFFFF'}} onPress={() => navigation.navigate('Points')}>
                          <PointsCircle text="7000 points" />
                        </Pressable>
                        <Pressable style={answered ? disabledButtonStyle : enabledButtonStyle} onPress={handlePress} disabled={answered}>
                          <PointsCircle text="Q&A" />
                      </Pressable>
                    </View>
                    <View style={homeStyle.chart1}>
                    <Svg style={{marginTop:-15,marginBottom:-15,marginLeft:10}}
    xmlns="http://www.w3.org/2000/svg"
    width={316}
    height={353}
    fill="none"
    // {...props}
  >
    <G clipPath="url(#a)">
      <Rect  width={315} height={353} x={1} fill="transparent" rx={12} />
      <Path
        fill="#000000"
        d="M36.405 285.743c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852ZM19.494 210.068v-.744l2.892-3.12c.408-.448.7-.856.876-1.224.184-.368.276-.744.276-1.128 0-.984-.572-1.476-1.716-1.476-.856 0-1.612.32-2.268.96l-.372-.768a3.39 3.39 0 0 1 1.188-.768c.488-.2 1-.3 1.536-.3.848 0 1.496.2 1.944.6.456.392.684.952.684 1.68 0 .504-.124 1-.372 1.488-.248.48-.628.992-1.14 1.536l-2.268 2.424h4.128v.84h-5.388Zm9.895.108a4.63 4.63 0 0 1-1.56-.264 3.58 3.58 0 0 1-1.26-.744l.372-.78c.744.608 1.556.912 2.436.912.584 0 1.044-.164 1.38-.492.336-.328.504-.76.504-1.296 0-.552-.16-1.004-.48-1.356-.32-.352-.76-.528-1.32-.528-.808 0-1.444.336-1.908 1.008h-.72v-5.028h4.908v.84h-3.936v3.024c.464-.464 1.076-.696 1.836-.696.528 0 .988.112 1.38.336.392.224.692.54.9.948.216.4.324.868.324 1.404 0 .528-.116.996-.348 1.404a2.452 2.452 0 0 1-.996.96c-.424.232-.928.348-1.512.348Zm7.016 0c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852ZM22.194 134.608a4.63 4.63 0 0 1-1.56-.264 3.58 3.58 0 0 1-1.26-.744l.372-.78c.744.608 1.556.912 2.436.912.584 0 1.044-.164 1.38-.492.336-.328.504-.76.504-1.296 0-.552-.16-1.004-.48-1.356-.32-.352-.76-.528-1.32-.528-.808 0-1.444.336-1.908 1.008h-.72v-5.028h4.908v.84H20.61v3.024c.464-.464 1.076-.696 1.836-.696.528 0 .988.112 1.38.336.392.224.692.54.9.948.216.4.324.868.324 1.404 0 .528-.116.996-.348 1.404a2.452 2.452 0 0 1-.996.96c-.424.232-.928.348-1.512.348Zm7.015 0c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852Zm7.196.852c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852ZM287.089 311.608a6.004 6.004 0 0 1-1.8-.252 4.17 4.17 0 0 1-1.392-.756l.348-.792a4.48 4.48 0 0 0 1.284.696c.448.152.968.228 1.56.228.72 0 1.252-.132 1.596-.396.352-.272.528-.628.528-1.068 0-.352-.128-.632-.384-.84-.248-.208-.668-.372-1.26-.492l-1.248-.252c-.752-.16-1.316-.42-1.692-.78-.368-.368-.552-.856-.552-1.464 0-.504.128-.944.384-1.32a2.596 2.596 0 0 1 1.092-.876c.464-.208 1-.312 1.608-.312.568 0 1.096.092 1.584.276.488.176.9.432 1.236.768l-.348.768a3.413 3.413 0 0 0-1.14-.708 3.76 3.76 0 0 0-1.344-.228c-.632 0-1.136.148-1.512.444a1.378 1.378 0 0 0-.564 1.152c0 .384.116.688.348.912.24.224.628.388 1.164.492l1.248.264c.808.168 1.404.424 1.788.768.392.336.588.796.588 1.38 0 .472-.128.888-.384 1.248-.248.36-.608.64-1.08.84-.464.2-1.016.3-1.656.3ZM248.089 311.608a6.004 6.004 0 0 1-1.8-.252 4.17 4.17 0 0 1-1.392-.756l.348-.792a4.48 4.48 0 0 0 1.284.696c.448.152.968.228 1.56.228.72 0 1.252-.132 1.596-.396.352-.272.528-.628.528-1.068 0-.352-.128-.632-.384-.84-.248-.208-.668-.372-1.26-.492l-1.248-.252c-.752-.16-1.316-.42-1.692-.78-.368-.368-.552-.856-.552-1.464 0-.504.128-.944.384-1.32a2.596 2.596 0 0 1 1.092-.876c.464-.208 1-.312 1.608-.312.568 0 1.096.092 1.584.276.488.176.9.432 1.236.768l-.348.768a3.413 3.413 0 0 0-1.14-.708 3.76 3.76 0 0 0-1.344-.228c-.632 0-1.136.148-1.512.444a1.378 1.378 0 0 0-.564 1.152c0 .384.116.688.348.912.24.224.628.388 1.164.492l1.248.264c.808.168 1.404.424 1.788.768.392.336.588.796.588 1.38 0 .472-.128.888-.384 1.248-.248.36-.608.64-1.08.84-.464.2-1.016.3-1.656.3ZM206.757 311.5v-8.46h5.232v.828h-4.248v2.952h4.008v.828h-4.008v3.852h-.984ZM169.511 311.5v-7.608h-3.072v-.852h7.14v.852h-3.072v7.608h-.996ZM129.22 311.5l-2.964-8.46h1.032l2.388 7.02 2.448-7.02h.792l2.424 7.08 2.436-7.08h.984l-2.964 8.46h-.876l-2.412-6.96-2.436 6.96h-.852ZM94.51 311.5v-7.608H91.44v-.852h7.14v.852h-3.072v7.608h-.996ZM51.935 311.5v-8.46h.828l3.252 6.108 3.228-6.108h.828v8.46h-.912v-6.612l-2.82 5.304h-.648l-2.856-5.292v6.6h-.9Z"
      />
      <Path
        fill="url(#b)"
        fillRule="evenodd"
        d="M45 182.623s21.305 20.609 42.257 20.609c20.952 0 20.952-55.616 41.904-55.616s20.952 25.931 41.904 25.931c20.175 0 20.175 84.276 41.127 84.276s20.952-33.062 41.904-33.062 41.904 37.6 41.904 37.6v23.986H45.353L45 182.623Z"
        clipRule="evenodd"
        opacity={0.4}
       
      />
      <Path
        fill="#000000"
        fillRule="evenodd"
        d="M129.161 147.114c4.973 0 9.052 1.413 12.737 4.15 2.465 1.831 4.22 3.651 7.357 7.471l2.18 2.68c3.279 4.013 5.027 5.85 7.486 7.676 3.396 2.522 7.123 3.86 11.655 3.949l.489.005c4.785 0 8.633 4.307 12.089 12.588l.422 1.034c2.197 5.488 3.899 11.349 6.689 22.559l2.527 10.284c3.095 12.506 4.901 18.753 7.313 24.657l.121.295c3.515 8.515 7.368 12.858 11.966 12.858 4.73 0 8.585-1.703 12.098-5.029l.378-.364c2.427-2.372 4.242-4.906 7.779-10.471l1.351-2.12c3.24-5.046 5.01-7.403 7.515-9.775 3.69-3.494 7.785-5.303 12.783-5.303 9.358 0 19.283 7.125 29.192 18.979 3.451 4.13 6.655 8.552 9.529 12.974a134.798 134.798 0 0 1 2.376 3.784l.452.756.791 1.364-.872.491-.237-.416c-.197-.342-.43-.739-.697-1.186l-.596-.987a131.64 131.64 0 0 0-2.054-3.256c-2.854-4.391-6.034-8.781-9.458-12.877-9.733-11.645-19.451-18.621-28.426-18.621-4.729 0-8.585 1.704-12.097 5.03l-.564.546c-2.212 2.199-3.955 4.599-7.063 9.456l-1.881 2.953c-3.241 5.045-5.01 7.403-7.516 9.775-3.689 3.493-7.784 5.302-12.783 5.302-5.044 0-9.092-4.464-12.7-13.023l-.433-1.051c-2.336-5.774-4.12-11.934-7.081-23.865l-2.53-10.298c-2.919-11.769-4.644-17.72-6.916-23.336l-.118-.29c-3.303-8.082-6.888-12.261-11.118-12.408l-.231-.004c-4.974 0-9.052-1.414-12.738-4.15l-.454-.344c-2.31-1.78-4.076-3.668-7.201-7.491l-1.882-2.316c-3.279-4.013-5.027-5.851-7.486-7.677-3.517-2.611-7.389-3.953-12.143-3.953-4.559 0-8.328 2.726-11.783 8.086l-.235.37c-2.703 4.305-4.551 8.633-8.467 19.027l-1.008 2.661c-3.208 8.412-4.971 12.396-7.401 16.312l-.147.235c-3.684 5.867-7.797 8.924-12.863 8.924-13.928 0-27.945-6.748-42.047-20.214l-.557-.535.694-.724c14.117 13.656 28.085 20.468 41.91 20.468 4.662 0 8.499-2.852 12.017-8.456l.428-.693c2.152-3.552 3.833-7.339 6.662-14.709l2.764-7.274c3.034-7.904 4.761-11.723 7.17-15.559 3.683-5.867 7.797-8.924 12.863-8.924Z"
        clipRule="evenodd"
        
      />
      <Path
        fill="#00005F"
        fillRule="evenodd"
        d="M131 151a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        clipRule="evenodd"
        
      />
      <Path
        fill="#000"
        fillOpacity={0.65}
        d="M63.132 73v-1.12h2.576v-8.576l-2.032 1.28-.56-.976 2.96-1.888h.944v10.16h2.416V73h-6.304Zm12.41.144c-1.27 0-2.256-.272-2.96-.816-.704-.555-1.056-1.328-1.056-2.32 0-.693.187-1.285.56-1.776.384-.49.89-.827 1.52-1.008a2.724 2.724 0 0 1-1.328-1.024 2.8 2.8 0 0 1-.48-1.616c0-.95.336-1.685 1.008-2.208.683-.533 1.595-.8 2.736-.8 1.141 0 2.053.267 2.736.8.683.523 1.024 1.259 1.024 2.208 0 .608-.165 1.152-.496 1.632a2.64 2.64 0 0 1-1.312 1.008c.63.181 1.13.517 1.504 1.008.373.49.56 1.083.56 1.776 0 .992-.352 1.765-1.056 2.32-.704.544-1.69.816-2.96.816Zm0-6.4c.779 0 1.387-.181 1.824-.544.448-.373.672-.875.672-1.504 0-.64-.224-1.136-.672-1.488-.437-.363-1.045-.544-1.824-.544-.779 0-1.386.181-1.824.544-.437.352-.656.848-.656 1.488 0 .63.219 1.13.656 1.504.438.363 1.045.544 1.824.544Zm0 5.312c1.835 0 2.752-.71 2.752-2.128 0-1.397-.917-2.096-2.752-2.096-1.835 0-2.752.699-2.752 2.096 0 1.419.917 2.128 2.752 2.128ZM85.87 73V61.72h1.104l4.336 8.144 4.304-8.144h1.104V73h-1.216v-8.816l-3.76 7.072h-.864L87.07 64.2V73h-1.2Zm15.928.144a3.31 3.31 0 0 1-1.44-.304 2.607 2.607 0 0 1-.992-.864 2.122 2.122 0 0 1-.368-1.216c0-.565.144-1.013.432-1.344.299-.33.784-.565 1.456-.704.682-.15 1.61-.224 2.784-.224h.512v-.496c0-.661-.139-1.136-.416-1.424-.267-.299-.699-.448-1.296-.448-.47 0-.923.07-1.36.208a5.097 5.097 0 0 0-1.344.64l-.448-.944c.405-.288.896-.517 1.472-.688a6.005 6.005 0 0 1 1.68-.256c1.002 0 1.744.245 2.224.736.49.49.736 1.253.736 2.288V73h-1.216v-1.344a2.406 2.406 0 0 1-.944 1.088c-.416.267-.907.4-1.472.4Zm.208-.976c.64 0 1.162-.219 1.568-.656.405-.448.608-1.013.608-1.696v-.48h-.496c-.864 0-1.547.043-2.048.128-.491.075-.838.213-1.04.416-.192.192-.288.459-.288.8 0 .437.149.795.448 1.072.309.277.725.416 1.248.416Zm5.828.832v-7.776h1.264v1.392c.416-.939 1.27-1.456 2.56-1.552l.464-.048.096 1.12-.816.096c-.736.064-1.296.299-1.68.704-.384.395-.576.939-.576 1.632V73h-1.312Zm8.937.144c-.779 0-1.451-.165-2.016-.496a3.45 3.45 0 0 1-1.312-1.424c-.299-.619-.448-1.339-.448-2.16 0-1.237.336-2.208 1.008-2.912.672-.715 1.594-1.072 2.768-1.072.48 0 .954.085 1.424.256.469.17.858.41 1.168.72l-.448.944a2.952 2.952 0 0 0-1.024-.656 2.914 2.914 0 0 0-1.04-.208c-.811 0-1.435.256-1.872.768-.438.501-.656 1.227-.656 2.176 0 .928.218 1.664.656 2.208.437.533 1.061.8 1.872.8.33 0 .677-.07 1.04-.208a2.854 2.854 0 0 0 1.024-.672l.448.944c-.31.31-.704.555-1.184.736a4.1 4.1 0 0 1-1.408.256Zm4.11-.144V61.72h1.296v4.784c.256-.47.613-.821 1.072-1.056a3.332 3.332 0 0 1 1.568-.368c1.845 0 2.768 1.024 2.768 3.072V73h-1.296v-4.768c0-.725-.144-1.253-.432-1.584-.277-.341-.725-.512-1.344-.512-.715 0-1.285.224-1.712.672-.416.437-.624 1.024-.624 1.76V73h-1.296Zm13.139-3.728V68.2h4.48v1.072h-4.48ZM145.198 73v-.992l3.856-4.16c.544-.597.933-1.141 1.168-1.632.245-.49.368-.992.368-1.504 0-1.312-.763-1.968-2.288-1.968-1.142 0-2.15.427-3.024 1.28L144.782 63c.416-.427.944-.768 1.584-1.024.65-.267 1.333-.4 2.048-.4 1.13 0 1.994.267 2.592.8.608.523.912 1.27.912 2.24 0 .672-.166 1.333-.496 1.984-.331.64-.838 1.323-1.52 2.048l-3.024 3.232h5.504V73h-7.184Zm14.186 0v-2.416h-5.2v-.992l5.424-7.872h1.104v7.744h1.68v1.12h-1.68V73h-1.328Zm0-3.536V63.88l-3.84 5.584h3.84ZM168.479 73V61.72h1.104l4.336 8.144 4.304-8.144h1.104V73h-1.216v-8.816l-3.76 7.072h-.864l-3.808-7.056V73h-1.2Zm15.927.144a3.317 3.317 0 0 1-1.44-.304 2.613 2.613 0 0 1-.992-.864 2.124 2.124 0 0 1-.368-1.216c0-.565.144-1.013.432-1.344.299-.33.784-.565 1.456-.704.683-.15 1.611-.224 2.784-.224h.512v-.496c0-.661-.138-1.136-.416-1.424-.266-.299-.698-.448-1.296-.448-.469 0-.922.07-1.36.208a5.122 5.122 0 0 0-1.344.64l-.448-.944a4.96 4.96 0 0 1 1.472-.688 6.016 6.016 0 0 1 1.68-.256c1.003 0 1.744.245 2.224.736.491.49.736 1.253.736 2.288V73h-1.216v-1.344a2.394 2.394 0 0 1-.944 1.088c-.416.267-.906.4-1.472.4Zm.208-.976c.64 0 1.163-.219 1.568-.656.406-.448.608-1.013.608-1.696v-.48h-.496c-.864 0-1.546.043-2.048.128-.49.075-.837.213-1.04.416-.192.192-.288.459-.288.8 0 .437.15.795.448 1.072.31.277.726.416 1.248.416Zm5.829.832v-7.776h1.264v1.392c.416-.939 1.269-1.456 2.56-1.552l.464-.048.096 1.12-.816.096c-.736.064-1.296.299-1.68.704-.384.395-.576.939-.576 1.632V73h-1.312Zm8.936.144c-.778 0-1.45-.165-2.016-.496a3.462 3.462 0 0 1-1.312-1.424c-.298-.619-.448-1.339-.448-2.16 0-1.237.336-2.208 1.008-2.912.672-.715 1.595-1.072 2.768-1.072.48 0 .955.085 1.424.256.47.17.859.41 1.168.72l-.448.944a2.934 2.934 0 0 0-1.024-.656 2.906 2.906 0 0 0-1.04-.208c-.81 0-1.434.256-1.872.768-.437.501-.656 1.227-.656 2.176 0 .928.219 1.664.656 2.208.438.533 1.062.8 1.872.8.331 0 .678-.07 1.04-.208a2.837 2.837 0 0 0 1.024-.672l.448.944c-.309.31-.704.555-1.184.736-.469.17-.938.256-1.408.256Zm4.11-.144V61.72h1.296v4.784c.256-.47.614-.821 1.072-1.056.47-.245.992-.368 1.568-.368 1.846 0 2.768 1.024 2.768 3.072V73h-1.296v-4.768c0-.725-.144-1.253-.432-1.584-.277-.341-.725-.512-1.344-.512-.714 0-1.285.224-1.712.672-.416.437-.624 1.024-.624 1.76V73h-1.296Zm13.428 0v-.992l3.856-4.16c.544-.597.933-1.141 1.168-1.632.245-.49.368-.992.368-1.504 0-1.312-.763-1.968-2.288-1.968-1.142 0-2.15.427-3.024 1.28L216.501 63c.416-.427.944-.768 1.584-1.024.65-.267 1.333-.4 2.048-.4 1.13 0 1.994.267 2.592.8.608.523.912 1.27.912 2.24 0 .672-.166 1.333-.496 1.984-.331.64-.838 1.323-1.52 2.048l-3.024 3.232h5.504V73h-7.184Zm12.953.144c-1.29 0-2.272-.496-2.944-1.488-.672-.992-1.008-2.427-1.008-4.304 0-1.888.336-3.323 1.008-4.304.672-.981 1.654-1.472 2.944-1.472 1.302 0 2.283.49 2.944 1.472.672.97 1.008 2.4 1.008 4.288 0 1.888-.341 3.328-1.024 4.32-.672.992-1.648 1.488-2.928 1.488Zm0-1.136c.896 0 1.558-.379 1.984-1.136.438-.757.656-1.936.656-3.536s-.213-2.768-.64-3.504c-.426-.747-1.093-1.12-2-1.12-.896 0-1.562.373-2 1.12-.426.747-.64 1.915-.64 3.504 0 1.6.214 2.779.64 3.536.438.757 1.104 1.136 2 1.136Zm6.234.992v-.992l3.856-4.16c.544-.597.933-1.141 1.168-1.632.245-.49.368-.992.368-1.504 0-1.312-.763-1.968-2.288-1.968-1.141 0-2.149.427-3.024 1.28L235.688 63c.416-.427.944-.768 1.584-1.024a5.348 5.348 0 0 1 2.048-.4c1.131 0 1.995.267 2.592.8.608.523.912 1.27.912 2.24 0 .672-.165 1.333-.496 1.984-.331.64-.837 1.323-1.52 2.048l-3.024 3.232h5.504V73h-7.184Zm14.186 0v-2.416h-5.2v-.992l5.424-7.872h1.104v7.744h1.68v1.12h-1.68V73h-1.328Zm0-3.536V63.88l-3.84 5.584h3.84Z"
      
      />
      <Path
        fill="#000"
        d="M110.929 44V28.49h10.318v2.244h-7.612v4.268h7.128v2.244h-7.128v4.51h7.612V44h-10.318Zm11.367 0 4.51-5.566-4.224-5.192h3.212l2.596 3.322 2.596-3.322h3.212l-4.246 5.214L134.484 44h-3.234l-2.882-3.63-2.86 3.63h-3.212Zm13.506 3.96V33.242h2.684v1.716c.308-.587.77-1.056 1.386-1.408.631-.352 1.342-.528 2.134-.528.939 0 1.76.227 2.464.682.719.455 1.276 1.1 1.672 1.936.396.821.594 1.811.594 2.97 0 1.144-.198 2.141-.594 2.992-.396.836-.946 1.481-1.65 1.936-.704.455-1.533.682-2.486.682-.763 0-1.452-.161-2.068-.484a3.595 3.595 0 0 1-1.386-1.342v5.566h-2.75Zm5.434-5.83c.821 0 1.481-.293 1.98-.88.499-.601.748-1.481.748-2.64 0-1.173-.249-2.046-.748-2.618-.499-.587-1.159-.88-1.98-.88s-1.481.293-1.98.88c-.499.572-.748 1.445-.748 2.618 0 1.159.249 2.039.748 2.64.499.587 1.159.88 1.98.88Zm13.059 2.09c-1.217 0-2.266-.227-3.146-.682a4.919 4.919 0 0 1-2.046-1.936c-.469-.836-.704-1.826-.704-2.97 0-1.115.228-2.09.682-2.926a5.125 5.125 0 0 1 1.914-1.958c.822-.484 1.753-.726 2.794-.726 1.526 0 2.728.484 3.608 1.452.895.968 1.342 2.288 1.342 3.96v.814h-7.7c.206 1.921 1.306 2.882 3.3 2.882a6.39 6.39 0 0 0 1.804-.264 5.11 5.11 0 0 0 1.65-.88l.77 1.848c-.513.425-1.158.763-1.936 1.012a7.594 7.594 0 0 1-2.332.374Zm-.396-9.328c-.806 0-1.459.25-1.958.748-.498.499-.799 1.173-.902 2.024h5.412c-.058-.895-.308-1.577-.748-2.046-.425-.484-1.026-.726-1.804-.726ZM160.917 44V33.242h2.684v1.672a3.678 3.678 0 0 1 1.474-1.408c.631-.323 1.335-.484 2.112-.484 2.538 0 3.806 1.474 3.806 4.422V44h-2.75v-6.424c0-.836-.161-1.445-.484-1.826-.308-.381-.792-.572-1.452-.572-.806 0-1.452.257-1.936.77-.469.499-.704 1.166-.704 2.002V44h-2.75Zm16.807.22c-.909 0-1.76-.11-2.552-.33-.792-.22-1.452-.535-1.98-.946l.704-1.804a6.76 6.76 0 0 0 1.826.858c.675.19 1.35.286 2.024.286.704 0 1.225-.117 1.562-.352.352-.25.528-.572.528-.968 0-.616-.454-1.012-1.364-1.188l-2.2-.418c-1.862-.352-2.794-1.32-2.794-2.904 0-.704.191-1.313.572-1.826.396-.513.939-.91 1.628-1.188.69-.279 1.482-.418 2.376-.418.763 0 1.496.11 2.2.33.704.205 1.306.52 1.804.946l-.748 1.804a4.83 4.83 0 0 0-1.54-.836 5.116 5.116 0 0 0-1.694-.308c-.718 0-1.254.125-1.606.374-.337.25-.506.58-.506.99 0 .645.418 1.041 1.254 1.188l2.2.418c.954.176 1.672.499 2.156.968.499.47.748 1.1.748 1.892 0 1.07-.418 1.914-1.254 2.53-.836.601-1.95.902-3.344.902Zm12.107 0c-1.218 0-2.266-.227-3.146-.682a4.919 4.919 0 0 1-2.046-1.936c-.47-.836-.704-1.826-.704-2.97 0-1.115.227-2.09.682-2.926a5.111 5.111 0 0 1 1.914-1.958c.821-.484 1.752-.726 2.794-.726 1.525 0 2.728.484 3.608 1.452.894.968 1.342 2.288 1.342 3.96v.814h-7.7c.205 1.921 1.305 2.882 3.3 2.882a6.4 6.4 0 0 0 1.804-.264 5.13 5.13 0 0 0 1.65-.88l.77 1.848c-.514.425-1.159.763-1.936 1.012a7.603 7.603 0 0 1-2.332.374Zm-.396-9.328c-.807 0-1.46.25-1.958.748-.499.499-.8 1.173-.902 2.024h5.412c-.059-.895-.308-1.577-.748-2.046-.426-.484-1.027-.726-1.804-.726Zm10.955 9.328c-.909 0-1.76-.11-2.552-.33-.792-.22-1.452-.535-1.98-.946l.704-1.804a6.76 6.76 0 0 0 1.826.858c.675.19 1.35.286 2.024.286.704 0 1.225-.117 1.562-.352.352-.25.528-.572.528-.968 0-.616-.454-1.012-1.364-1.188l-2.2-.418c-1.862-.352-2.794-1.32-2.794-2.904 0-.704.191-1.313.572-1.826.396-.513.939-.91 1.628-1.188.69-.279 1.482-.418 2.376-.418.763 0 1.496.11 2.2.33.704.205 1.306.52 1.804.946l-.748 1.804a4.83 4.83 0 0 0-1.54-.836 5.116 5.116 0 0 0-1.694-.308c-.718 0-1.254.125-1.606.374-.337.25-.506.58-.506.99 0 .645.418 1.041 1.254 1.188l2.2.418c.954.176 1.672.499 2.156.968.499.47.748 1.1.748 1.892 0 1.07-.418 1.914-1.254 2.53-.836.601-1.95.902-3.344.902Z"
      />
      <Path
        fill="url(#c)"
        d="M110.929 44V28.49h10.318v2.244h-7.612v4.268h7.128v2.244h-7.128v4.51h7.612V44h-10.318Zm11.367 0 4.51-5.566-4.224-5.192h3.212l2.596 3.322 2.596-3.322h3.212l-4.246 5.214L134.484 44h-3.234l-2.882-3.63-2.86 3.63h-3.212Zm13.506 3.96V33.242h2.684v1.716c.308-.587.77-1.056 1.386-1.408.631-.352 1.342-.528 2.134-.528.939 0 1.76.227 2.464.682.719.455 1.276 1.1 1.672 1.936.396.821.594 1.811.594 2.97 0 1.144-.198 2.141-.594 2.992-.396.836-.946 1.481-1.65 1.936-.704.455-1.533.682-2.486.682-.763 0-1.452-.161-2.068-.484a3.595 3.595 0 0 1-1.386-1.342v5.566h-2.75Zm5.434-5.83c.821 0 1.481-.293 1.98-.88.499-.601.748-1.481.748-2.64 0-1.173-.249-2.046-.748-2.618-.499-.587-1.159-.88-1.98-.88s-1.481.293-1.98.88c-.499.572-.748 1.445-.748 2.618 0 1.159.249 2.039.748 2.64.499.587 1.159.88 1.98.88Zm13.059 2.09c-1.217 0-2.266-.227-3.146-.682a4.919 4.919 0 0 1-2.046-1.936c-.469-.836-.704-1.826-.704-2.97 0-1.115.228-2.09.682-2.926a5.125 5.125 0 0 1 1.914-1.958c.822-.484 1.753-.726 2.794-.726 1.526 0 2.728.484 3.608 1.452.895.968 1.342 2.288 1.342 3.96v.814h-7.7c.206 1.921 1.306 2.882 3.3 2.882a6.39 6.39 0 0 0 1.804-.264 5.11 5.11 0 0 0 1.65-.88l.77 1.848c-.513.425-1.158.763-1.936 1.012a7.594 7.594 0 0 1-2.332.374Zm-.396-9.328c-.806 0-1.459.25-1.958.748-.498.499-.799 1.173-.902 2.024h5.412c-.058-.895-.308-1.577-.748-2.046-.425-.484-1.026-.726-1.804-.726ZM160.917 44V33.242h2.684v1.672a3.678 3.678 0 0 1 1.474-1.408c.631-.323 1.335-.484 2.112-.484 2.538 0 3.806 1.474 3.806 4.422V44h-2.75v-6.424c0-.836-.161-1.445-.484-1.826-.308-.381-.792-.572-1.452-.572-.806 0-1.452.257-1.936.77-.469.499-.704 1.166-.704 2.002V44h-2.75Zm16.807.22c-.909 0-1.76-.11-2.552-.33-.792-.22-1.452-.535-1.98-.946l.704-1.804a6.76 6.76 0 0 0 1.826.858c.675.19 1.35.286 2.024.286.704 0 1.225-.117 1.562-.352.352-.25.528-.572.528-.968 0-.616-.454-1.012-1.364-1.188l-2.2-.418c-1.862-.352-2.794-1.32-2.794-2.904 0-.704.191-1.313.572-1.826.396-.513.939-.91 1.628-1.188.69-.279 1.482-.418 2.376-.418.763 0 1.496.11 2.2.33.704.205 1.306.52 1.804.946l-.748 1.804a4.83 4.83 0 0 0-1.54-.836 5.116 5.116 0 0 0-1.694-.308c-.718 0-1.254.125-1.606.374-.337.25-.506.58-.506.99 0 .645.418 1.041 1.254 1.188l2.2.418c.954.176 1.672.499 2.156.968.499.47.748 1.1.748 1.892 0 1.07-.418 1.914-1.254 2.53-.836.601-1.95.902-3.344.902Zm12.107 0c-1.218 0-2.266-.227-3.146-.682a4.919 4.919 0 0 1-2.046-1.936c-.47-.836-.704-1.826-.704-2.97 0-1.115.227-2.09.682-2.926a5.111 5.111 0 0 1 1.914-1.958c.821-.484 1.752-.726 2.794-.726 1.525 0 2.728.484 3.608 1.452.894.968 1.342 2.288 1.342 3.96v.814h-7.7c.205 1.921 1.305 2.882 3.3 2.882a6.4 6.4 0 0 0 1.804-.264 5.13 5.13 0 0 0 1.65-.88l.77 1.848c-.514.425-1.159.763-1.936 1.012a7.603 7.603 0 0 1-2.332.374Zm-.396-9.328c-.807 0-1.46.25-1.958.748-.499.499-.8 1.173-.902 2.024h5.412c-.059-.895-.308-1.577-.748-2.046-.426-.484-1.027-.726-1.804-.726Zm10.955 9.328c-.909 0-1.76-.11-2.552-.33-.792-.22-1.452-.535-1.98-.946l.704-1.804a6.76 6.76 0 0 0 1.826.858c.675.19 1.35.286 2.024.286.704 0 1.225-.117 1.562-.352.352-.25.528-.572.528-.968 0-.616-.454-1.012-1.364-1.188l-2.2-.418c-1.862-.352-2.794-1.32-2.794-2.904 0-.704.191-1.313.572-1.826.396-.513.939-.91 1.628-1.188.69-.279 1.482-.418 2.376-.418.763 0 1.496.11 2.2.33.704.205 1.306.52 1.804.946l-.748 1.804a4.83 4.83 0 0 0-1.54-.836 5.116 5.116 0 0 0-1.694-.308c-.718 0-1.254.125-1.606.374-.337.25-.506.58-.506.99 0 .645.418 1.041 1.254 1.188l2.2.418c.954.176 1.672.499 2.156.968.499.47.748 1.1.748 1.892 0 1.07-.418 1.914-1.254 2.53-.836.601-1.95.902-3.344.902Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={42.438}
        x2={42.438}
        y1={156.083}
        y2={297.646}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#000" stopOpacity={0.522} />
        <Stop offset={1} stopColor="#000" stopOpacity={0.01} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={157.5}
        x2={157.5}
        y1={22}
        y2={52}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#000" />
        <Stop offset={1} stopColor="#000" stopOpacity={0} />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#000" d="M0 0h316v353H0z" />
      </ClipPath>
    </Defs>
  </Svg>
  </View>
                    <View style={homeStyle.container6}>
                      <Text style={{fontWeight:'bold', color:'black', textAlign:'center',  fontSize:24,}}>March 2024</Text>
                      <View style={homeStyle.budgetLeft}>
                      <Text style={{textAlign: 'center', fontSize: 20,margin:4}}>Balance</Text>
  <Text style={{textAlign: 'center',fontSize:30,color:'green',marginBottom:10,}}>{balance >= 0 ? 'RM ' + balance.toFixed(2) : 'Negative Balance'}</Text>
</View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={homeStyle.income}>
  <Text style={{textAlign: 'center', fontSize: 18,margin:4}}>Income</Text>
  <Text style={{textAlign: 'center',fontSize:20,color:'green'}}>RM {income.toFixed(2)}</Text>
                      </View>
                      <View style={homeStyle.expenses}>
                      <Text style={{textAlign: 'center', fontSize: 18,margin:4}}>Expenses</Text>
                      <Text style={{textAlign: 'center',fontSize:20,color:'red'}}>RM {expenses.toFixed(2)}</Text>
                      </View>
</View>
                        <Pressable
                style={[homeStyle.button]}
                onPress={handleAIBudgetSuggestion}
            >
              <View style={homeStyle.buttonContent}>
                <View style={homeStyle.lockIconContainer}>
                  <Image
                    source={require('../assets/crown_icon.png')} // Adjust the path to your crown icon
                    style={homeStyle.lockIcon}
                  />
                </View>
                <Text style={homeStyle.buttonText}>
                  <Text style={{ fontWeight: 'bold' }}>AI Budget Suggestion</Text>
                  {!isPremiumUser && (
                    <>
                      {'\n'}
                      <Text style={homeStyle.hintText}>Unlock Premium to Use This Feature</Text>
                    </>
                  )}
                </Text>
              </View>
            </Pressable>


            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
            >
              <View style={homeStyle.modalContainer}>
                <View style={homeStyle.modalContent}>
                  <Text style={homeStyle.modalTitle}>Budget Suggestions</Text>
                  {/* Render budget suggestions here */}
                  {budgetSuggestions.map((item, index) => (
                    <Text key={index} style={homeStyle.suggestionText}>
                      <Text style={{ fontWeight: 'bold' }}>{item.category}</Text>: {item.suggestion}
                    </Text>
                  ))}

                  <Pressable onPress={() => setIsModalVisible(false)}>
                    <Text style={homeStyle.closeButton}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Text style={{marginLeft:20,marginTop:15,fontSize:25,fontWeight:'bold'}}>Goals</Text>
                    </View>
                   
                    <View style={homeStyle.containerGoal}>
                    <View style={homeStyle.textContainer}>   
                    <Text style={homeStyle.messageGoal}>Buying House</Text>
                    <Text style={homeStyle.messageReach}>RM 1000</Text>
                    <Text style={homeStyle.messageTarget}>out of RM 1300</Text></View>
                     <StaticBar percentage={70} />
                    </View>
                    <View style={homeStyle.containerFollowGoal}>
                    <View style={homeStyle.textContainer}>   
                    <Text style={homeStyle.messageGoal}>Buying Phone</Text>
                    <Text style={homeStyle.messageReach}>RM 1800</Text>
                    <Text style={homeStyle.messageTarget}>out of RM 3600</Text></View>
                     <StaticBar percentage={50} />
                    </View>
                    <View style={homeStyle.containerFollowGoal}>
                    <View style={homeStyle.textContainer}>   
                    <Text style={homeStyle.messageGoal}>Buying Laptop</Text>
                    <Text style={homeStyle.messageReach}>RM 900</Text>
                    <Text style={homeStyle.messageTarget}>out of RM 4000</Text></View>
                     <StaticBar percentage={20} />
                    </View>
                    
                <Text style={{marginLeft:35,marginTop:30,fontSize:25,fontWeight:'bold'}}>News</Text>
                  
                    <View style={{ marginTop: 10 }}>
                        <NewsItem incomeRange={3000} />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Greyed out background
    justifyContent: 'center',
    alignItems: 'center',
  },
    container2: {
        flex: 1,
        backgroundColor:'#FFFFFF',
    },
    container3: {
        flex: 0.25,
        flexDirection: 'row',
        marginTop:60,
        marginLeft:10,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width:'100%'
        
    },
    container4: {
        marginLeft: 25,
       
    },
    container5: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        
    },
    container6: {
        alignItems: 'left',
        height: 215,
        marginTop:10,
      marginBottom:20,
        padding: 15,
        borderRadius:10,

    },
    containerGoal: {
      marginTop:120,
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
    message1: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        
    },
    message2: {
        color: '#000000',
        fontSize: 14,
    },
    message3: {
        marginTop: 30,
        color: '#000000',
        fontSize: 16,
    },
    message4: {
        color: '#FFFFFF',
        marginTop: 60,
        fontSize: 22,
        fontWeight: 'bold',
    },
    message5: {
        color: '#000000',
        fontSize: 16,
        marginTop: 10,
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
    messageTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      marginTop: 10,
  },
    boldText: {
        fontWeight: 'bold',
       
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50, 
        marginLeft:20,
      
    
    
    },
    

    chart1: {
      marginTop:30,
      alignContent:'center',
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
    elevation: 15,
    opacity:0.8,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:1,
      backgroundColor:'rgba(0, 0, 0, 0.5)',
    },

    answerContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      zIndex:1,
      
  },
  resultText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
},
buttonText: {
    fontSize: 16,
    color:'white',
    fontWeight: 'bold',
    textAlign: 'center',
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
},
suggestionText: {
  fontSize: 16,
  marginBottom: 5,
},
budgetLeft: {
  marginTop:15,
  fontSize: 16,
  marginBottom: 15,
  backgroundColor: '#ffffff',
  borderRadius: 10,
textAlign: 'center',
 borderTopWidth: 1,
 borderBottomWidth: 1,
  borderRightColor: 'gray', 
},
income: {
  width:175,
  fontSize: 16,
  marginBottom: 5,
//   backgroundColor: '#ffffff',
//   borderRadius: 10,
//   shadowOffset: {
//     width: 0,
//     height: 2,
// },
// shadowOpacity: 0.25,
// shadowRadius: 3.84,
// elevation: 15,
// opacity:0.8,
textAlign: 'center',

},
expenses: {
  width:175,
  fontSize: 16,
  marginBottom: 5,
//   backgroundColor: '#ffffff',
//   borderRadius: 10,
//   shadowOffset: {
//     width: 0,
//     height: 2,
// },
// shadowOpacity: 0.25,
// shadowRadius: 3.84,
// elevation: 15,
// opacity:0.8,
textAlign: 'center',

},
disabledButton: {
  backgroundColor: 'grey',
  textAlign: 'center',
},
buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  textAlign: 'center',
  marginLeft: 45,
},
lockIconContainer: {
  marginRight: 10,
},
lockIcon: {
  width: 40,
  height: 40,
  // Add any other styles you need for the lock icon
},
buttonText: {
  color: 'white',
  fontSize: 16,
  textAlign: 'center',
},

hintText: {
  fontSize: 12,
  color: 'rgba(255, 255, 255, 0.5)', // Adjust the color to your preference
},
  });

export default Home;
