import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert, Dimensions, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accelerometer } from 'expo-sensors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

//tela dos pilotos com mais vitorias
function TopDriversScreen() {
  const topDrivers = [
    { name: 'Lewis Hamilton', wins: 105, image: 'https://media.gettyimages.com/id/1809475095/pt/foto/abu-dhabi-united-arab-emirates-lewis-hamilton-of-great-britain-and-mercedes-looks-on-at-the.jpg?s=612x612&w=gi&k=20&c=scihQt3ACLgvkvSE_aBcEPGWpEGGL2Ff0AJ7OY6BtPQ=' },
    { name: 'Michael Schumacher', wins: 91, image: 'https://conteudo.imguol.com.br/c/splash/bf/2023/04/24/michael-schumacher-1682348334238_v2_4x3.jpg' },
    { name: 'Max Verstappen', wins: 62, image: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/06/max-verstappen-gp-espanha-e1719165031235.jpg?w=956' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maiores Vencedores</Text>
      <FlatList
        data={topDrivers}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.listItem}>{item.name} - {item.wins} vitórias</Text>
          </View>
        )}
      />
    </View>
  );
}