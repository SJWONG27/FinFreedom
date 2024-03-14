import React from 'react';
import {View, Text, StyleSheet, ImageBackground, FlatList} from 'react-native';


const dataHome=[
    { id: '1', title: 'Monthly Debt Payment', info: 'RM 2500' , imageUrl: require('../assets/image5.png')},
    { id: '2', title: 'Current DSR', info: '30%', imageUrl: require('../assets/image6.png') },
    { id: '3', title: 'Monthly Loan Balance Available', info: 'RM 1500' , imageUrl: require('../assets/image7.png')}
];


const Item = ({ title, info, imageUrl }) => (
    <ImageBackground
        source={imageUrl}
        style={discoverStyle.item}
        imageStyle={discoverStyle.imageBackground}
    >
        <View style={discoverStyle.content}>
        <Text style={discoverStyle.message3}>{title}</Text>
        <Text style={discoverStyle.message4}>{info}</Text>
        </View>
  </ImageBackground>
  );


function Discover(){
    return(
        <ImageBackground
            source={require('../assets/background.png')}
            style={discoverStyle.container}
        >
            <View>
                    <FlatList
                        style={{margin:10, marginTop:30}}
                        data={dataHome}
                        horizontal
                        renderItem={({ item, index }) => (
                            <Item
                            title={item.title}
                            info={item.info}
                            imageUrl={item.imageUrl}
                            />
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={true}
                        snapToInterval={139} 
                        decelerationRate="fast"
                        indicatorStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                    />
                </View>
        </ImageBackground>
    );
}

const discoverStyle = StyleSheet.create({
    container:{
        flex:1,
    },
    container2:{
        flex:1,
        marginTop:20,
    },
    container3:{
        flex:0.25,
        flexDirection:'row',
        margin:20,
        marginTop:40,
        alignItems:'center',
    },
    container4:{
        marginLeft:25,
    },
    container5:{
        flex:0.6,
        flexDirection:'row',
        marginTop: 10,
        alignItems:'center',
    },
    container6:{
        alignItems:'center',
        width: 160,
        height: 160,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        margin:10,
        paddingTop:20,
    },
    message1:{
        color:'#FFFFFF',
        fontSize: 16,
        fontWeight:'bold',
    },
    message2:{
        color:'#FFFFFF',
        fontSize: 12,
    },
    message3:{
        marginTop:30,
        color:'#FFFFFF',
        fontSize: 16,
    },
    message4:{
        color:'#FFFFFF',
        marginTop:60,
        fontSize: 22,
        fontWeight:'bold',
    },
    profileImage: {
        width: 100, 
        height: 100,
        borderRadius: 50, 
    },
    item: {
        width: 165,
        height: 230,
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
})

export default Discover;