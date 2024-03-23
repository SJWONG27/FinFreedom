import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';

const NewsItem = () => {
  // News items for low income
  const lowIncomeNews = [
    {
      title: 'Low-income News',
      image: 'https://media.eliteagent.com/wp-content/uploads/2024/03/Wealthy-households-are-renting-more-than-ever.png',
      link: 'https://eliteagent.com/high-income-households-rent-more-low-income-renters-face-greater-stress/',
    }
  ];

  // News items for medium income
  const mediumIncomeNews = [
    {
      title: 'Medium-income News',
      image: 'https://media.eliteagent.com/wp-content/uploads/2021/04/12100242/Untitled-design-56-768x432.png',
      link: 'https://eliteagent.com/high-income-households-rent-more-low-income-renters-face-greater-stress/',
    }
  ];

  // News items for high income
  const highIncomeNews = [
    {
      title: 'High-income News',
      image: 'https://media.eliteagent.com/wp-content/uploads/2018/10/11123450/stressed-768x432.jpg',
      link: 'https://eliteagent.com/high-income-households-rent-more-low-income-renters-face-greater-stress/',
    }
  ];

  // Function to handle link press
  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <View style={styles.newsContainer}>
          {lowIncomeNews.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleLinkPress(item.link)}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.newsContainer}>
          {mediumIncomeNews.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleLinkPress(item.link)}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.newsContainer}>
          {highIncomeNews.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleLinkPress(item.link)}>
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius:10,
    marginBottom:25,
    
    
  },
  scrollView: {
    flexDirection: 'row',
    borderRadius:10,
    
  },
  newsContainer: {
    marginLeft:10,
    marginRight:10,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',  borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  marginBottom:5,
  
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewsItem;
