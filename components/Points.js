import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, TextInput, Modal, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Svg, {
    Rect,
    Path,
    G,
    Defs,
    LinearGradient,
    Stop,
    ClipPath,
  } from "react-native-svg"
import MutualFundsCalculator from '../components/smallComponents/MutualFundsCalculator';

const Points = () => {
  const navigation = useNavigation();
  const [pointsToUse, setPointsToUse] = useState('');
  const [selectedMutualFund, setSelectedMutualFund] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState(null);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);

  const mutualFunds = [
    { label: 'Public Bank Equity Fund', value: 'Public Bank Equity' },
    { label: 'Maybank Dividend Fund', value: 'Maybank Dividend' },
    { label: 'CIMB-Principal Equity Fund', value: 'CIMB-Principal Equity' },
    { label: 'RHB-OSK Income Fund', value: 'RHB-OSK Income' },
    { label: 'Affin Hwang Select Balanced Fund', value: 'Affin Hwang Select Balanced' },
  ];
  
  const handleConfirmation = () => {
    // Close the confirmation modal
    setConfirmationModalVisible(false);
  
    // Show the success popup
    setSuccessPopupVisible(true);
  
    // Implement logic to process redemption
    // For now, let's just log a message indicating that redemption is in process
    console.log('Your redemption is in process');
  };
  
  
  // In the handleSubmit function, show the confirmation modal
  const handleSubmit = () => {
    // Show the confirmation modal
    setConfirmationModalVisible(true);
  };

  const handleOkButtonPress = () => {
    // Hide the success popup
    setSuccessPopupVisible(false);
  };

  const predefinedPoints = [1000, 2000, 3000, 5000];

  return (
    <ScrollView styles={{flex:1}}>
    <ImageBackground
      source={require('../assets/background.png')}
      style={pointStyle.container}
    >

{successPopupVisible && (
  <View style={pointStyle.overlay}>
    <View style={pointStyle.successPopupContainer}>
      <Text style={pointStyle.successPopupText}>Your redemption is submitted.</Text>
      <Text style={pointStyle.successPopupText}>It may take a few days to process.</Text>
      <Pressable style={pointStyle.okButton} onPress={handleOkButtonPress}>
        <Text style={pointStyle.okButtonText}>OK</Text>
      </Pressable>
    </View>
  </View>
)}
      <View style={pointStyle.header}>
        <Pressable
          style={pointStyle.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={pointStyle.backButtonText}>Back</Text>
        </Pressable>

      </View>
      <Text style={{fontSize: 22,
      fontWeight: 'bold',
      color: '#6A6AFF',
      marginBottom: 10,
      textAlign: 'center',
      marginTop: 10,}}>REDEMPTION</Text>
      <DropDownPicker
          items={predefinedPoints.map((points) => ({
            label: `${points} points`,
            value: points.toString(),
          }))}
          defaultValue={selectedPoints}
          containerStyle={pointStyle.dropdownContainer}
          style={pointStyle.dropdown}
          itemStyle={pointStyle.dropdownItem}
          dropDownStyle={pointStyle.dropdownList}
          placeholder="Public Mutual Funds"
          onChangeItem={(item) => setSelectedPoints(item.value)}
        />

<Svg style={{marginLeft:50, marginTop:20,marginBottom:30, maxHeight: 500 }}
    xmlns="http://www.w3.org/2000/svg"
    width={316}
    height={331}
    fill="none"
    // {...props}
  >
    <Rect width={315} height={331} x={1} fill="#333340" rx={12} />
    <Path
      stroke="#fff"
      strokeLinecap="square"
      strokeOpacity={0.146}
      d="m48.5 269.25 241 .5M48.5 167.917l241 .5M48.5 218.583l241 .5M48.5 117.25l241 .5"
    />
    <Path
      fill="#7C828A"
      d="m266.2 294.084-.072-.828.72-.048c.408-.032.72-.172.936-.42.216-.256.324-.604.324-1.044v-6.204h.984v6.216c0 .696-.18 1.24-.54 1.632-.36.384-.884.6-1.572.648l-.78.048Zm8.319.024c-1.112 0-1.956-.292-2.532-.876-.576-.592-.864-1.452-.864-2.58v-5.112h.984v5.064c0 1.752.804 2.628 2.412 2.628 1.592 0 2.388-.876 2.388-2.628v-5.064h.984v5.112c0 1.128-.288 1.988-.864 2.58-.568.584-1.404.876-2.508.876Zm5.394-.108v-8.46h.768l5.1 6.804v-6.804h.912V294h-.744l-5.112-6.828V294h-.924ZM223.382 294v-8.46h.828l3.252 6.108 3.228-6.108h.828V294h-.912v-6.612l-2.82 5.304h-.648l-2.856-5.292v6.6h-.9Zm9.426 0 3.732-8.46h.84l3.732 8.46h-1.02l-.936-2.16h-4.404l-.924 2.16h-1.02Zm4.14-7.308-1.836 4.32h3.696l-1.836-4.32h-.024Zm6.673 7.308v-4.008l-3.24-4.452h1.152l2.604 3.588 2.592-3.588h1.116l-3.24 4.476V294h-.984ZM180.046 294l3.732-8.46h.84l3.732 8.46h-1.02l-.936-2.16h-4.404l-.924 2.16h-1.02Zm4.14-7.308-1.836 4.32h3.696l-1.836-4.32h-.024Zm5.419 7.308v-8.46h3.348c.912 0 1.608.22 2.088.66.488.44.732 1.068.732 1.884 0 .808-.244 1.436-.732 1.884-.48.44-1.176.66-2.088.66h-2.364V294h-.984Zm.984-4.2h2.244c1.312 0 1.968-.572 1.968-1.716 0-1.152-.656-1.728-1.968-1.728h-2.244v3.444Zm6.609 4.2v-8.46h3.348c.912 0 1.608.212 2.088.636.488.424.732 1.028.732 1.812 0 .624-.172 1.136-.516 1.536-.336.4-.816.66-1.44.78.368.128.684.44.948.936l1.488 2.76h-1.08l-1.464-2.712c-.184-.336-.396-.564-.636-.684-.24-.12-.556-.18-.948-.18h-1.536V294h-.984Zm.984-4.356h2.22c1.328 0 1.992-.552 1.992-1.656 0-1.088-.664-1.632-1.992-1.632h-2.22v3.288ZM137.55 294v-8.46h.828l3.252 6.108 3.228-6.108h.828V294h-.912v-6.612l-2.82 5.304h-.648l-2.856-5.292v6.6h-.9Zm9.426 0 3.732-8.46h.84l3.732 8.46h-1.02l-.936-2.16h-4.404l-.924 2.16h-1.02Zm4.14-7.308-1.836 4.32h3.696l-1.836-4.32h-.024Zm5.418 7.308v-8.46h3.348c.912 0 1.608.212 2.088.636.488.424.732 1.028.732 1.812 0 .624-.172 1.136-.516 1.536-.336.4-.816.66-1.44.78.368.128.684.44.948.936l1.488 2.76h-1.08l-1.464-2.712c-.184-.336-.396-.564-.636-.684-.24-.12-.556-.18-.948-.18h-1.536V294h-.984Zm.984-4.356h2.22c1.328 0 1.992-.552 1.992-1.656 0-1.088-.664-1.632-1.992-1.632h-2.22v3.288ZM98.204 294v-8.46h5.232v.828h-4.248v2.952h4.008v.828h-4.008V294h-.984Zm6.574 0v-8.46h5.34v.828h-4.38v2.928h4.128v.828h-4.128v3.048h4.38V294h-5.34Zm6.996 0v-8.46h3.384c.872 0 1.544.196 2.016.588.48.384.72.924.72 1.62 0 .464-.12.86-.36 1.188-.24.328-.572.568-.996.72.488.128.868.364 1.14.708.28.344.42.78.42 1.308 0 .752-.244 1.328-.732 1.728-.488.4-1.176.6-2.064.6h-3.528Zm.96-4.68h2.28c1.272 0 1.908-.496 1.908-1.488 0-1-.636-1.5-1.908-1.5h-2.28v2.988Zm0 3.888h2.472c1.28 0 1.92-.516 1.92-1.548s-.64-1.548-1.92-1.548h-2.472v3.096ZM55.194 294.084l-.072-.828.72-.048c.408-.032.72-.172.936-.42.216-.256.324-.604.324-1.044v-6.204h.984v6.216c0 .696-.18 1.24-.54 1.632-.36.384-.884.6-1.572.648l-.78.048Zm4.167-.084 3.732-8.46h.84l3.732 8.46h-1.02l-.936-2.16h-4.404L60.38 294h-1.02Zm4.14-7.308-1.836 4.32h3.696l-1.836-4.32H63.5ZM68.919 294v-8.46h.768l5.1 6.804v-6.804h.912V294h-.744l-5.112-6.828V294h-.924ZM32.405 271.448c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852ZM15.494 222v-.744l2.892-3.12c.408-.448.7-.856.876-1.224.184-.368.276-.744.276-1.128 0-.984-.572-1.476-1.716-1.476-.856 0-1.612.32-2.268.96l-.372-.768a3.39 3.39 0 0 1 1.188-.768c.488-.2 1-.3 1.536-.3.848 0 1.496.2 1.944.6.456.392.684.952.684 1.68 0 .504-.124 1-.372 1.488-.248.48-.628.992-1.14 1.536l-2.268 2.424h4.128v.84h-5.388Zm9.895.108a4.63 4.63 0 0 1-1.56-.264 3.58 3.58 0 0 1-1.26-.744l.372-.78c.744.608 1.556.912 2.436.912.584 0 1.044-.164 1.38-.492.336-.328.504-.76.504-1.296 0-.552-.16-1.004-.48-1.356-.32-.352-.76-.528-1.32-.528-.808 0-1.444.336-1.908 1.008h-.72v-5.028h4.908v.84h-3.936v3.024c.464-.464 1.076-.696 1.836-.696.528 0 .988.112 1.38.336.392.224.692.54.9.948.216.4.324.868.324 1.404 0 .528-.116.996-.348 1.404a2.452 2.452 0 0 1-.996.96c-.424.232-.928.348-1.512.348Zm7.016 0c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852ZM18.194 171.108a4.63 4.63 0 0 1-1.56-.264 3.58 3.58 0 0 1-1.26-.744l.372-.78c.744.608 1.556.912 2.436.912.584 0 1.044-.164 1.38-.492.336-.328.504-.76.504-1.296 0-.552-.16-1.004-.48-1.356-.32-.352-.76-.528-1.32-.528-.808 0-1.444.336-1.908 1.008h-.72v-5.028h4.908v.84H16.61v3.024c.464-.464 1.076-.696 1.836-.696.528 0 .988.112 1.38.336.392.224.692.54.9.948.216.4.324.868.324 1.404 0 .528-.116.996-.348 1.404a2.452 2.452 0 0 1-.996.96c-.424.232-.928.348-1.512.348Zm7.015 0c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852Zm7.196.852c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852ZM15.758 119l3.936-7.608h-4.476v-.852h5.592v.744L16.85 119h-1.092Zm9.631.108a4.63 4.63 0 0 1-1.56-.264 3.58 3.58 0 0 1-1.26-.744l.372-.78c.744.608 1.556.912 2.436.912.584 0 1.044-.164 1.38-.492.336-.328.504-.76.504-1.296 0-.552-.16-1.004-.48-1.356-.32-.352-.76-.528-1.32-.528-.808 0-1.444.336-1.908 1.008h-.72v-5.028h4.908v.84h-3.936v3.024c.464-.464 1.076-.696 1.836-.696.528 0 .988.112 1.38.336.392.224.692.54.9.948.216.4.324.868.324 1.404 0 .528-.116.996-.348 1.404a2.452 2.452 0 0 1-.996.96c-.424.232-.928.348-1.512.348Zm7.016 0c-.968 0-1.704-.372-2.208-1.116-.504-.744-.756-1.82-.756-3.228 0-1.416.252-2.492.756-3.228.504-.736 1.24-1.104 2.208-1.104.976 0 1.712.368 2.208 1.104.504.728.756 1.8.756 3.216 0 1.416-.256 2.496-.768 3.24-.504.744-1.236 1.116-2.196 1.116Zm0-.852c.672 0 1.168-.284 1.488-.852.328-.568.492-1.452.492-2.652 0-1.2-.16-2.076-.48-2.628-.32-.56-.82-.84-1.5-.84-.672 0-1.172.28-1.5.84-.32.56-.48 1.436-.48 2.628 0 1.2.16 2.084.48 2.652.328.568.828.852 1.5.852Z"
    />
    <G fill="#EC6666" fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
      <Path d="M75.559 161.75c5.22 0 9.675 6.916 15.828 22.16l.428 1.065c.424 1.063.859 2.171 1.335 3.397l4.244 11.044c3.839 9.903 6.293 15.532 9.093 20.478 3.914 6.914 7.663 10.466 11.491 10.466 6.387 0 9.789-2.93 15.572-11.488l1.217-1.809c2.753-4.065 4.34-6.067 6.518-7.973 3.074-2.69 6.51-4.086 10.698-4.086 6.434 0 9.86-1.016 15.534-3.96l.871-.457c6.188-3.257 9.995-4.468 17.022-4.529l.577-.003c5.736 0 9.143.134 13.772.502l4.783.405c5.218.429 8.913.585 15.449.585 6.701 0 10.295 1.62 16.179 6.214l.769.605c6.21 4.903 9.884 6.604 17.057 6.604.897 0 1.806.11 2.727.324 6.7 1.565 13.771 8.574 20.885 19.29 2.827 4.257 5.465 8.816 7.845 13.375a156.206 156.206 0 0 1 1.969 3.902l.5 1.04.476 1.017.058.126-.912.412-.198-.431a98.718 98.718 0 0 0-.58-1.224l-.496-1.019a155.964 155.964 0 0 0-1.704-3.36c-2.364-4.53-4.986-9.06-7.791-13.285l-.698-1.039c-6.744-9.927-13.421-16.392-19.582-17.83a10.963 10.963 0 0 0-2.499-.298c-7.283 0-11.141-1.715-17.273-6.502l-.768-.605c-5.967-4.711-9.382-6.316-15.964-6.316l-2.165-.007c-5.509-.035-9.022-.214-13.975-.632l-2.935-.253c-5.057-.426-8.445-.587-14.197-.599l-.732-.001c-7.024 0-10.713 1.082-16.647 4.163l-.851.446c-6.112 3.217-9.695 4.34-16.506 4.34-3.936 0-7.141 1.303-10.039 3.838-2.097 1.834-3.647 3.791-6.355 7.791l-1.469 2.183c-2.655 3.922-4.164 5.839-6.212 7.658-2.883 2.561-6.069 3.886-9.93 3.886-4.221 0-8.131-3.628-12.126-10.562l-.235-.412c-3.052-5.391-5.682-11.548-10.086-23.021l-2.894-7.55c-.43-1.113-.823-2.122-1.199-3.076l-.552-1.394c-6.177-15.484-10.636-22.595-15.327-22.595-9.388 0-17.293 8.364-23.671 25.215l-.419 1.124-.938-.344.422-1.134c6.51-17.2 14.698-25.861 24.606-25.861Z" />
      <Path d="M232 205a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </G>
    <Path
      fill="#fff"
      fillOpacity={0.65}
      d="M129.354 73V61.72h1.104l4.336 8.144 4.304-8.144h1.104V73h-1.216v-8.816l-3.76 7.072h-.864l-3.808-7.056V73h-1.2Zm16.711.144c-.757 0-1.413-.165-1.968-.496a3.414 3.414 0 0 1-1.296-1.392c-.298-.608-.448-1.323-.448-2.144 0-.821.15-1.53.448-2.128a3.391 3.391 0 0 1 1.296-1.408c.555-.33 1.211-.496 1.968-.496.747 0 1.398.165 1.952.496.566.33.998.8 1.296 1.408.31.597.464 1.307.464 2.128 0 .821-.154 1.536-.464 2.144a3.262 3.262 0 0 1-1.296 1.392c-.554.33-1.205.496-1.952.496Zm0-1.04c.726 0 1.307-.256 1.744-.768.438-.523.656-1.264.656-2.224 0-.97-.218-1.712-.656-2.224-.437-.512-1.018-.768-1.744-.768-.736 0-1.322.256-1.76.768-.426.512-.64 1.253-.64 2.224 0 .96.214 1.701.64 2.224.438.512 1.024.768 1.76.768Zm5.659.896v-7.776h1.264v1.328c.256-.49.618-.859 1.088-1.104a3.366 3.366 0 0 1 1.584-.368c1.845 0 2.768 1.024 2.768 3.072V73h-1.296v-4.768c0-.725-.144-1.253-.432-1.584-.278-.341-.726-.512-1.344-.512-.715 0-1.286.224-1.712.672-.416.437-.624 1.024-.624 1.76V73h-1.296Zm12.214.144c-.918 0-1.606-.24-2.064-.72-.459-.49-.688-1.195-.688-2.112v-4.08h-1.52v-1.008h1.52V62.84h1.296v2.384h2.464v1.008h-2.464v3.952c0 .608.128 1.072.384 1.392.256.31.672.464 1.248.464.17 0 .341-.021.512-.064a9.35 9.35 0 0 0 .464-.128l.224.992a2.647 2.647 0 0 1-.608.208 3.294 3.294 0 0 1-.768.096Zm2.473-.144V61.72h1.296v4.784c.256-.47.614-.821 1.072-1.056.47-.245.992-.368 1.568-.368 1.846 0 2.768 1.024 2.768 3.072V73h-1.296v-4.768c0-.725-.144-1.253-.432-1.584-.277-.341-.725-.512-1.344-.512-.714 0-1.285.224-1.712.672-.416.437-.624 1.024-.624 1.76V73h-1.296Zm11.478.144c-.789 0-1.387-.23-1.792-.688-.395-.47-.592-1.147-.592-2.032V61.72h1.296v8.608c0 1.141.453 1.712 1.36 1.712a2.5 2.5 0 0 0 .72-.096l-.032 1.088a4.357 4.357 0 0 1-.96.112Zm3.075 2.736 1.328-3.008-3.28-7.648h1.408l2.576 6.304 2.592-6.304h1.36l-4.624 10.656h-1.36Z"
    />
    <Path
      fill="#fff"
      d="M64.093 44V28.49h6.732c1.702 0 3.014.425 3.938 1.276.924.85 1.386 2.039 1.386 3.564s-.462 2.72-1.386 3.586c-.924.85-2.236 1.276-3.938 1.276H66.91V44h-2.816Zm2.816-8.03h3.476c2.024 0 3.036-.88 3.036-2.64 0-1.745-1.012-2.618-3.036-2.618H66.91v5.258ZM78.445 44V28.49h6.776c1.628 0 2.89.36 3.784 1.078.895.704 1.342 1.687 1.342 2.948 0 .836-.213 1.555-.638 2.156-.425.601-1.012 1.041-1.76 1.32.88.25 1.562.69 2.046 1.32.499.616.748 1.4.748 2.354 0 1.379-.47 2.45-1.408 3.212-.924.748-2.215 1.122-3.872 1.122h-7.018Zm2.706-8.932h3.586c1.921 0 2.882-.74 2.882-2.222 0-1.481-.96-2.222-2.882-2.222h-3.586v4.444Zm0 6.798h3.96c1.936 0 2.904-.777 2.904-2.332 0-1.555-.968-2.332-2.904-2.332h-3.96v4.664ZM93.591 44V28.49h6.776c1.628 0 2.89.36 3.784 1.078.895.704 1.342 1.687 1.342 2.948 0 .836-.212 1.555-.638 2.156-.425.601-1.012 1.041-1.76 1.32.88.25 1.562.69 2.046 1.32.499.616.748 1.4.748 2.354 0 1.379-.469 2.45-1.408 3.212-.924.748-2.214 1.122-3.872 1.122h-7.017Zm2.707-8.932h3.585c1.922 0 2.882-.74 2.882-2.222 0-1.481-.96-2.222-2.882-2.222h-3.585v4.444Zm0 6.798h3.959c1.936 0 2.904-.777 2.904-2.332 0-1.555-.968-2.332-2.904-2.332h-3.96v4.664ZM114.712 44V28.49h2.354l5.5 10.142 5.478-10.142h2.31V44h-2.552V33.55l-4.444 8.096h-1.65l-4.444-8.052V44h-2.552Zm22.685.22c-2.64 0-3.96-1.481-3.96-4.444v-6.534h2.75v6.578c0 .763.154 1.327.462 1.694.308.367.8.55 1.474.55.734 0 1.335-.25 1.804-.748.47-.513.704-1.188.704-2.024v-6.05h2.75V44h-2.684v-1.606c-.718 1.217-1.818 1.826-3.3 1.826Zm13.774 0c-2.845 0-4.268-1.408-4.268-4.224V35.31h-2.068v-2.068h2.068V30.03h2.75v3.212h3.256v2.068h-3.256v4.532c0 .704.154 1.232.462 1.584.308.352.807.528 1.496.528.206 0 .418-.022.638-.066.22-.059.448-.117.682-.176l.418 2.024c-.264.147-.601.264-1.012.352a5.36 5.36 0 0 1-1.166.132Zm7.41 0c-2.64 0-3.96-1.481-3.96-4.444v-6.534h2.75v6.578c0 .763.154 1.327.462 1.694.308.367.799.55 1.474.55.733 0 1.335-.25 1.804-.748.469-.513.704-1.188.704-2.024v-6.05h2.75V44h-2.684v-1.606c-.719 1.217-1.819 1.826-3.3 1.826Zm12.388 0c-.777 0-1.474-.147-2.09-.44a3.792 3.792 0 0 1-1.43-1.232 3.097 3.097 0 0 1-.506-1.738c0-.792.205-1.415.616-1.87.411-.47 1.078-.807 2.002-1.012.924-.205 2.163-.308 3.718-.308h.77v-.462c0-.733-.161-1.261-.484-1.584-.323-.323-.865-.484-1.628-.484a6.37 6.37 0 0 0-1.848.286 7.991 7.991 0 0 0-1.914.836l-.792-1.87a6.049 6.049 0 0 1 1.342-.682 8.864 8.864 0 0 1 1.65-.462 8.444 8.444 0 0 1 1.65-.176c1.569 0 2.735.367 3.498 1.1.763.719 1.144 1.84 1.144 3.366V44h-2.574v-1.716a3.061 3.061 0 0 1-1.188 1.43c-.543.337-1.188.506-1.936.506Zm.572-1.892c.719 0 1.313-.25 1.782-.748.484-.499.726-1.13.726-1.892v-.484h-.748c-1.379 0-2.339.11-2.882.33-.528.205-.792.587-.792 1.144 0 .484.169.88.506 1.188.337.308.807.462 1.408.462Zm11.657 1.892c-1.276 0-2.222-.345-2.838-1.034-.601-.704-.902-1.73-.902-3.08V28.49h2.75v11.484c0 1.32.558 1.98 1.672 1.98.162 0 .323-.007.484-.022.162-.015.316-.044.462-.088l-.044 2.178a6.51 6.51 0 0 1-1.584.198Zm9.479-.22V28.49h10.142v2.244h-7.326v4.378h6.864v2.244h-6.864V44h-2.816Zm15.705.22c-2.64 0-3.96-1.481-3.96-4.444v-6.534h2.75v6.578c0 .763.154 1.327.462 1.694.308.367.799.55 1.474.55.733 0 1.334-.25 1.804-.748.469-.513.704-1.188.704-2.024v-6.05h2.75V44h-2.684v-1.606c-.719 1.217-1.819 1.826-3.3 1.826Zm8.846-.22V33.242h2.684v1.672a3.678 3.678 0 0 1 1.474-1.408c.631-.323 1.335-.484 2.112-.484 2.537 0 3.806 1.474 3.806 4.422V44h-2.75v-6.424c0-.836-.161-1.445-.484-1.826-.308-.381-.792-.572-1.452-.572-.807 0-1.452.257-1.936.77-.469.499-.704 1.166-.704 2.002V44h-2.75Zm17.005.22c-.939 0-1.767-.227-2.486-.682-.704-.455-1.254-1.1-1.65-1.936-.396-.85-.594-1.848-.594-2.992 0-1.159.198-2.149.594-2.97.396-.836.946-1.481 1.65-1.936.719-.455 1.547-.682 2.486-.682.763 0 1.452.169 2.068.506.616.337 1.078.785 1.386 1.342v-6.38h2.75V44h-2.684v-1.782c-.293.616-.755 1.107-1.386 1.474-.631.352-1.342.528-2.134.528Zm.77-2.09c.821 0 1.481-.293 1.98-.88.499-.601.748-1.481.748-2.64 0-1.173-.249-2.046-.748-2.618-.499-.587-1.159-.88-1.98-.88s-1.481.293-1.98.88c-.499.572-.748 1.445-.748 2.618 0 1.159.249 2.039.748 2.64.499.587 1.159.88 1.98.88Zm12.223 2.09c-.909 0-1.76-.11-2.552-.33-.792-.22-1.452-.535-1.98-.946l.704-1.804a6.76 6.76 0 0 0 1.826.858c.675.19 1.35.286 2.024.286.704 0 1.225-.117 1.562-.352.352-.25.528-.572.528-.968 0-.616-.454-1.012-1.364-1.188l-2.2-.418c-1.862-.352-2.794-1.32-2.794-2.904 0-.704.191-1.313.572-1.826.396-.513.939-.91 1.628-1.188.69-.279 1.482-.418 2.376-.418.763 0 1.496.11 2.2.33.704.205 1.306.52 1.804.946l-.748 1.804a4.83 4.83 0 0 0-1.54-.836 5.116 5.116 0 0 0-1.694-.308c-.718 0-1.254.125-1.606.374-.337.25-.506.58-.506.99 0 .645.418 1.041 1.254 1.188l2.2.418c.954.176 1.672.499 2.156.968.499.47.748 1.1.748 1.892 0 1.07-.418 1.914-1.254 2.53-.836.601-1.95.902-3.344.902Z"
    />
    <Path
      fill="url(#b)"
      d="M64.093 44V28.49h6.732c1.702 0 3.014.425 3.938 1.276.924.85 1.386 2.039 1.386 3.564s-.462 2.72-1.386 3.586c-.924.85-2.236 1.276-3.938 1.276H66.91V44h-2.816Zm2.816-8.03h3.476c2.024 0 3.036-.88 3.036-2.64 0-1.745-1.012-2.618-3.036-2.618H66.91v5.258ZM78.445 44V28.49h6.776c1.628 0 2.89.36 3.784 1.078.895.704 1.342 1.687 1.342 2.948 0 .836-.213 1.555-.638 2.156-.425.601-1.012 1.041-1.76 1.32.88.25 1.562.69 2.046 1.32.499.616.748 1.4.748 2.354 0 1.379-.47 2.45-1.408 3.212-.924.748-2.215 1.122-3.872 1.122h-7.018Zm2.706-8.932h3.586c1.921 0 2.882-.74 2.882-2.222 0-1.481-.96-2.222-2.882-2.222h-3.586v4.444Zm0 6.798h3.96c1.936 0 2.904-.777 2.904-2.332 0-1.555-.968-2.332-2.904-2.332h-3.96v4.664ZM93.591 44V28.49h6.776c1.628 0 2.89.36 3.784 1.078.895.704 1.342 1.687 1.342 2.948 0 .836-.212 1.555-.638 2.156-.425.601-1.012 1.041-1.76 1.32.88.25 1.562.69 2.046 1.32.499.616.748 1.4.748 2.354 0 1.379-.469 2.45-1.408 3.212-.924.748-2.214 1.122-3.872 1.122h-7.017Zm2.707-8.932h3.585c1.922 0 2.882-.74 2.882-2.222 0-1.481-.96-2.222-2.882-2.222h-3.585v4.444Zm0 6.798h3.959c1.936 0 2.904-.777 2.904-2.332 0-1.555-.968-2.332-2.904-2.332h-3.96v4.664ZM114.712 44V28.49h2.354l5.5 10.142 5.478-10.142h2.31V44h-2.552V33.55l-4.444 8.096h-1.65l-4.444-8.052V44h-2.552Zm22.685.22c-2.64 0-3.96-1.481-3.96-4.444v-6.534h2.75v6.578c0 .763.154 1.327.462 1.694.308.367.8.55 1.474.55.734 0 1.335-.25 1.804-.748.47-.513.704-1.188.704-2.024v-6.05h2.75V44h-2.684v-1.606c-.718 1.217-1.818 1.826-3.3 1.826Zm13.774 0c-2.845 0-4.268-1.408-4.268-4.224V35.31h-2.068v-2.068h2.068V30.03h2.75v3.212h3.256v2.068h-3.256v4.532c0 .704.154 1.232.462 1.584.308.352.807.528 1.496.528.206 0 .418-.022.638-.066.22-.059.448-.117.682-.176l.418 2.024c-.264.147-.601.264-1.012.352a5.36 5.36 0 0 1-1.166.132Zm7.41 0c-2.64 0-3.96-1.481-3.96-4.444v-6.534h2.75v6.578c0 .763.154 1.327.462 1.694.308.367.799.55 1.474.55.733 0 1.335-.25 1.804-.748.469-.513.704-1.188.704-2.024v-6.05h2.75V44h-2.684v-1.606c-.719 1.217-1.819 1.826-3.3 1.826Zm12.388 0c-.777 0-1.474-.147-2.09-.44a3.792 3.792 0 0 1-1.43-1.232 3.097 3.097 0 0 1-.506-1.738c0-.792.205-1.415.616-1.87.411-.47 1.078-.807 2.002-1.012.924-.205 2.163-.308 3.718-.308h.77v-.462c0-.733-.161-1.261-.484-1.584-.323-.323-.865-.484-1.628-.484a6.37 6.37 0 0 0-1.848.286 7.991 7.991 0 0 0-1.914.836l-.792-1.87a6.049 6.049 0 0 1 1.342-.682 8.864 8.864 0 0 1 1.65-.462 8.444 8.444 0 0 1 1.65-.176c1.569 0 2.735.367 3.498 1.1.763.719 1.144 1.84 1.144 3.366V44h-2.574v-1.716a3.061 3.061 0 0 1-1.188 1.43c-.543.337-1.188.506-1.936.506Zm.572-1.892c.719 0 1.313-.25 1.782-.748.484-.499.726-1.13.726-1.892v-.484h-.748c-1.379 0-2.339.11-2.882.33-.528.205-.792.587-.792 1.144 0 .484.169.88.506 1.188.337.308.807.462 1.408.462Zm11.657 1.892c-1.276 0-2.222-.345-2.838-1.034-.601-.704-.902-1.73-.902-3.08V28.49h2.75v11.484c0 1.32.558 1.98 1.672 1.98.162 0 .323-.007.484-.022.162-.015.316-.044.462-.088l-.044 2.178a6.51 6.51 0 0 1-1.584.198Zm9.479-.22V28.49h10.142v2.244h-7.326v4.378h6.864v2.244h-6.864V44h-2.816Zm15.705.22c-2.64 0-3.96-1.481-3.96-4.444v-6.534h2.75v6.578c0 .763.154 1.327.462 1.694.308.367.799.55 1.474.55.733 0 1.334-.25 1.804-.748.469-.513.704-1.188.704-2.024v-6.05h2.75V44h-2.684v-1.606c-.719 1.217-1.819 1.826-3.3 1.826Zm8.846-.22V33.242h2.684v1.672a3.678 3.678 0 0 1 1.474-1.408c.631-.323 1.335-.484 2.112-.484 2.537 0 3.806 1.474 3.806 4.422V44h-2.75v-6.424c0-.836-.161-1.445-.484-1.826-.308-.381-.792-.572-1.452-.572-.807 0-1.452.257-1.936.77-.469.499-.704 1.166-.704 2.002V44h-2.75Zm17.005.22c-.939 0-1.767-.227-2.486-.682-.704-.455-1.254-1.1-1.65-1.936-.396-.85-.594-1.848-.594-2.992 0-1.159.198-2.149.594-2.97.396-.836.946-1.481 1.65-1.936.719-.455 1.547-.682 2.486-.682.763 0 1.452.169 2.068.506.616.337 1.078.785 1.386 1.342v-6.38h2.75V44h-2.684v-1.782c-.293.616-.755 1.107-1.386 1.474-.631.352-1.342.528-2.134.528Zm.77-2.09c.821 0 1.481-.293 1.98-.88.499-.601.748-1.481.748-2.64 0-1.173-.249-2.046-.748-2.618-.499-.587-1.159-.88-1.98-.88s-1.481.293-1.98.88c-.499.572-.748 1.445-.748 2.618 0 1.159.249 2.039.748 2.64.499.587 1.159.88 1.98.88Zm12.223 2.09c-.909 0-1.76-.11-2.552-.33-.792-.22-1.452-.535-1.98-.946l.704-1.804a6.76 6.76 0 0 0 1.826.858c.675.19 1.35.286 2.024.286.704 0 1.225-.117 1.562-.352.352-.25.528-.572.528-.968 0-.616-.454-1.012-1.364-1.188l-2.2-.418c-1.862-.352-2.794-1.32-2.794-2.904 0-.704.191-1.313.572-1.826.396-.513.939-.91 1.628-1.188.69-.279 1.482-.418 2.376-.418.763 0 1.496.11 2.2.33.704.205 1.306.52 1.804.946l-.748 1.804a4.83 4.83 0 0 0-1.54-.836 5.116 5.116 0 0 0-1.694-.308c-.718 0-1.254.125-1.606.374-.337.25-.506.58-.506.99 0 .645.418 1.041 1.254 1.188l2.2.418c.954.176 1.672.499 2.156.968.499.47.748 1.1.748 1.892 0 1.07-.418 1.914-1.254 2.53-.836.601-1.95.902-3.344.902Z"
    />
    <Defs>
      <LinearGradient
        id="b"
        x1={157.5}
        x2={157.5}
        y1={22}
        y2={52}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M51 162.25h237v88H51z" />
      </ClipPath>
    </Defs>
  </Svg>
  <View style={{marginBottom:20,}}>
    <MutualFundsCalculator/>
  </View>
      <View style={pointStyle.content}>
        <Text style={pointStyle.title}>Use Points to Buy Mutual Funds</Text>
        {/* Dropdown for selecting predefined points */}
        <TextInput
          style={pointStyle.input}
          placeholder="Enter points to use"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={pointsToUse}
          onChangeText={(text) => setPointsToUse(text)}
        />
        {/* Render your mutual fund selection interface here */}
        <Pressable
          style={pointStyle.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={pointStyle.buttonText}>
    {selectedMutualFund ? `${selectedMutualFund.toUpperCase()}` : 'Select Mutual Fund'}
  </Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={pointStyle.modalContainer}>
            <View style={pointStyle.modalContent}>
              <Text style={pointStyle.modalTitle}>Select Mutual Fund</Text>
              {mutualFunds.map((fund) => (
                <Pressable
                  key={fund.value}
                  style={pointStyle.mutualFund}
                  onPress={() => {
                    setSelectedMutualFund(fund.value);
                    setModalVisible(false);
                  }}
                >
                  <Text>{fund.label}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              style={pointStyle.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={pointStyle.closeButtonText}>Close Modal</Text>
            </Pressable>
          </View>
        </Modal>
        <Pressable
          style={pointStyle.submitButton}
          onPress={handleSubmit}
        >
          <Text style={pointStyle.submitButtonText}>Submit</Text>
        </Pressable>

        <View style={pointStyle.discountContainer}>
  <Text style={pointStyle.discountText}>1000 = RM 50 discount</Text>
  <Text style={pointStyle.discountText}>2000 = RM 100 discount</Text>
  <Text style={pointStyle.discountText}>3000 = RM 160 discount</Text>
  <Text style={pointStyle.discountText}>5000 = RM 300 discount</Text>
  {/* Add more points and discounts as needed */}
</View>
      </View>
      <Modal
  animationType="slide"
  transparent={true}
  visible={confirmationModalVisible}
  onRequestClose={() => {
    setConfirmationModalVisible(false);
  }}
>
  <View style={pointStyle.modalContainer}>
    <View style={pointStyle.modalContent}>
      <Text style={pointStyle.modalTitle1}>Confirm Redemption</Text>
      <Text style={pointStyle.confirmationText}>Points to use: <Text style={{fontWeight:'bold'}}>{pointsToUse}</Text></Text>
      <Text style={pointStyle.confirmationText}>Selected Mutual Fund: <Text style={{fontWeight:'bold'}}>{selectedMutualFund}</Text></Text>
      <View style={pointStyle.modalButtonsContainer}>
        <Pressable
          style={[pointStyle.modalButton, { backgroundColor: 'green' }]}
          onPress={handleConfirmation}
        >
          <Text style={pointStyle.modalButtonText}>Confirm</Text>
        </Pressable>
        <Pressable
          style={[pointStyle.modalButton, { backgroundColor: 'red' }]}
          onPress={() => setConfirmationModalVisible(false)}
        >
          <Text style={pointStyle.modalButtonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>
<View style={pointStyle.tipsContainer}>
    <Text style={pointStyle.tipsTitle}>Investment Tips for Youngsters</Text>

    {/* Mutual Funds Introduction */}
    <View style={pointStyle.tipContainer}>
        <Text style={pointStyle.tipTitle}>Understanding Mutual Funds: A Brief Introduction</Text>

        <Text style={pointStyle.tip}>
            <Text style={pointStyle.tipSubTitle}>What are Mutual Funds?</Text>{'\n\n'}
            Mutual Funds are investment vehicles that pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities. These funds are managed by professional fund managers who make investment decisions on behalf of the investors.{'\n\n'}
        </Text>

        <Text style={pointStyle.tip}>
            <Text style={pointStyle.tipSubTitle}>How do Mutual Funds work?</Text>{'\n\n'}
            When you invest in a Mutual Fund, you purchase shares or units of the fund. The value of these shares, known as Net Asset Value (NAV), fluctuates based on the performance of the underlying securities held by the fund. Investors earn returns in the form of capital appreciation, dividends, or interest income generated by the securities in the fund's portfolio.{'\n\n'}
        </Text>

        <Text style={pointStyle.tip}>
            <Text style={pointStyle.tipSubTitle}>Types of Mutual Funds:</Text>{'\n\n'}
            - <Text style={pointStyle.tipSubTitle}>Equity Funds:</Text> Invest primarily in stocks or equities, offering the potential for high returns over the long term but with higher volatility.{'\n'}
            - <Text style={pointStyle.tipSubTitle}>Bond Funds:</Text> Invest in fixed-income securities such as government or corporate bonds, providing steady income with lower risk compared to equity funds.{'\n'}
            - <Text style={pointStyle.tipSubTitle}>Money Market Funds:</Text> Invest in short-term, low-risk securities like Treasury bills and commercial paper, offering stability and liquidity.{'\n'}
            - <Text style={pointStyle.tipSubTitle}>Balanced Funds:</Text> Maintain a mix of stocks and bonds to provide a balanced approach to investing, suitable for investors seeking both growth and income.{'\n\n'}
        </Text>
    </View>
</View>


    </ImageBackground>
    </ScrollView>
  );
};

const pointStyle = StyleSheet.create({
    container: {
      flex: 1,
      overflow:'scroll',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    backButton: {
      marginTop:20,
      marginRight: 30,
      backgroundColor:'blue',
      borderRadius:10,
      padding:15,
    },
    backButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color:'white',
    },
    input: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      color:'white',
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'white',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
    },
    mutualFund: {
      fontSize: 16,
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    closeButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 20,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    submitButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom:20,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    dropdownContainer: {
      margin: 20,
      width: 380,
      alignItems: 'center',
    },
    dropdown: {
      backgroundColor: '#f0f0f0', // Background color of the dropdown
      borderWidth: 1, // Border width
      borderRadius: 5, // Border radius
      borderColor: '#ccc', // Border color
    },
    dropdownItem: {
      justifyContent: 'center',
      paddingVertical: 10,
    },
    dropdownList: {
      maxHeight: 200,
    },
    dropdownContainerModal: {
      margin: 20,
      width: 300,
      alignItems: 'center',
    },
    dropdownListModal: {
      maxHeight: 200,
    },
    discountContainer: {
      marginTop: 20,
      marginBottom:20,
      width:'80%',
      padding:10,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 10,
      textAlign: 'center',
      justifyContent: 'center',
    },
    discountText: {
      fontSize: 16,
      marginBottom: 5,
      color: 'white',
      textAlign: 'center',
      justifyContent: 'center',
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    modalButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    confirmationText: {
      fontSize: 16,
      marginBottom: 10,
      color: 'black',
    },
    modalTitle1:{
      color:'black',
      textAlign:'center',
      fontWeight:'bold',
      fontSize:20,
      marginBottom:15,
    },
    successPopupContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      zIndex:1,
    },
    successPopupText: {
      color: 'black',
      fontSize: 16,
      textAlign: 'center',
    },
     
  
      okButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      okButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },

      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1,
      },

      tipsContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop:20,
    },
    tipsTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tip: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 5,
    },
  });

  export default Points;