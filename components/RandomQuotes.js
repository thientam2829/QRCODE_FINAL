import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RandomQuoteComponent = () => {
  const [randomQuote, setRandomQuote] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRandomQuote(data.content))
      .catch(error => setError(error.message));
  }, []);

  return (
    <View style={styles.quoteContainer}>
      {error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <Text style={styles.quoteText}>{randomQuote}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 10,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default RandomQuoteComponent;
