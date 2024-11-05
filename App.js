import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

//tela para mostrar as equipes com mais titulos
function TopTeamsScreen() {
  const topTeams = [
    { name: 'Ferrari', titles: 16, image: 'https://logos-world.net/wp-content/uploads/2020/05/Ferrari-Emblem.png' },
    { name: 'McLaren', titles: 8, image: 'https://static.vecteezy.com/system/resources/previews/020/500/043/non_2x/mclaren-brand-logo-symbol-orange-design-british-car-automobile-illustration-free-vector.jpg' },
    { name: 'Mercedes', titles: 8, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipes com Mais Títulos</Text>
      <FlatList
        data={topTeams}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.listItem}>{item.name} - {item.titles} títulos</Text>
          </View>
        )}
      />
    </View>
  );
}

//configuracao da navegacao usando as abas
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Maiores Vencedores"
        component={TopDriversScreen}
        options={{
          tabBarLabel: 'Maiores Vencedores',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Equipes Com Mais Títulos"
        component={TopTeamsScreen}
        options={{
          tabBarLabel: 'Equipes Com Mais Títulos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shield-check" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//componente principal para fazer a nevagação
export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}