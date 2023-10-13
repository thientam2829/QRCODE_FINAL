import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClockComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    // Clear interval khi component unmount
    return () => clearInterval(intervalId);
  }, []); 

  const formattedTime = currentTime.toLocaleString();

  return (
    <View style={styles.clockContainer}>
      <Text style={styles.clockText}>{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clockContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  clockText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClockComponent;
