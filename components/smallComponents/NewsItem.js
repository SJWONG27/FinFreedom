import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const NewsItem = ({ incomeRange }) => {
  // Function to get news based on income range
  const getNewsForIncomeRange = (range) => {
    if (range >= 10000) {
      return {
        title: 'High-income News',
        image: 'https://media.eliteagent.com/wp-content/uploads/2024/03/Wealthy-households-are-renting-more-than-ever.png',
        link: 'https://eliteagent.com/high-income-households-rent-more-low-income-renters-face-greater-stress/',
      };
    } else if (range >= 5000) {
      return {
        title: 'Medium-income News',
        image: 'https://media.eliteagent.com/wp-content/uploads/2024/03/Wealthy-households-are-renting-more-than-ever.png',
        link: 'https://eliteagent.com/high-income-households-rent-more-low-income-renters-face-greater-stress/',
      };
    } else {
      return {
        title: 'Low-income News',
        image: 'https://media.eliteagent.com/wp-content/uploads/2024/03/Wealthy-households-are-renting-more-than-ever.png',
        link: 'https://eliteagent.com/high-income-households-rent-more-low-income-renters-face-greater-stress/',
      };
    }
  };

  // Get news based on income range
  const newsItem = getNewsForIncomeRange(incomeRange);

  // Function to handle link press
  const handleLinkPress = () => {
    Linking.openURL(newsItem.link);
  };

  return (
    <TouchableOpacity onPress={handleLinkPress}>
      <View style={styles.container}>
        <Image source={{ uri: newsItem.image }} style={styles.image} />
        <Text style={styles.title}>{newsItem.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewsItem;
