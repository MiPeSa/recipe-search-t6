import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  // https://www.themealdb.com/api.php
  // www.themealdb.com/api/json/v1/1/search.php?s={keyword}
  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setRepositories(data.meals))
    .catch(error => {
      Alert.alert('Error', error);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
        <FlatList
          style={{margin: "5%"}}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({item}) =>
            <View>
              <Text 
                style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}
              </Text>
              <Image 
                style={{width: 50, height: 50}} 
                source={{
                  uri: item.strMealThumb,
                }}
              />
            </View>
          }
          data={repositories}
          ItemSeparatorComponent={listSeparator}
        />
        <View style={styles.button}>
          <TextInput
            style={{fontSize: 18, width: 200}}
            placeholder='keyword'
            value={keyword}
            onChangeText={text => setKeyword(text)} 
          />
          <Button title="Find" onPress={getRepositories} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
