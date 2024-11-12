import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//dados dos pilotos
const topDrivers = [
  { name: 'Lewis Hamilton', wins: 105, titles: 7, age: 38, team: 'Mercedes', image: 'https://media.gettyimages.com/id/1809475095/pt/foto/abu-dhabi-united-arab-emirates-lewis-hamilton-of-great-britain-and-mercedes-looks-on-at-the.jpg?s=612x612&w=gi&k=20&c=scihQt3ACLgvkvSE_aBcEPGWpEGGL2Ff0AJ7OY6BtPQ=' },
  { name: 'Michael Schumacher', wins: 91, titles: 7, age: 54, team: 'Sem time / Aposentado', image: 'https://conteudo.imguol.com.br/c/splash/bf/2023/04/24/michael-schumacher-1682348334238_v2_4x3.jpg' },
  { name: 'Max Verstappen', wins: 62, titles: 3, age: 26, team: 'Red Bull', image: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/06/max-verstappen-gp-espanha-e1719165031235.jpg?w=956' },
  { name: 'Sebastian Vettel', wins: 53, titles: 4, age: 37, team: 'Sem time / Aposentado', image: 'https://www.grandepremio.com.br/wp-content/uploads/2020/07/EceM2acXkAEmW-g.jpg'},
  { name: 'Alain Prost', wins: 51, titles: 3, age: 69, team: 'Sem time / Aposentado', image: 'https://media.gettyimages.com/id/537112233/pt/foto/alain-prost-of-france-driver-of-the-marlboro-mclaren-international-mclaren-tag-mp4-2c-during.jpg?s=612x612&w=gi&k=20&c=iby91J6GIJe6dnG4wxQJH0Eor6bBs1RI67vitj3os34=' },
  { name: 'Ayrton Senna', wins: 41, titles: 3, age: 34, team: 'Faleceu com 34 anos', image: 'https://clube101.com.br/wsite/_upl/noticias/9e29147e7ab45ecb6cd81860056769a3.jpg'},
  { name: 'Fernardo Alonso', wins: 32, titles: 2, age: 43, team: 'Aston Martin', image: 'https://blog.portoseguro.com.br/wordpress/wp-content/uploads/2022/10/fernando-alonso-2048x1365.jpg'}
];

//dados das equipes
const topTeams = [
  { 
    name: 'Ferrari', 
    titles: 16, 
    image: 'https://logos-world.net/wp-content/uploads/2020/05/Ferrari-Emblem.png',
    founded: '1929',
    drivers: ['Charles Leclerc', 'Carlos Sainz']
  },
  {
    name: 'Williams',
    titles: 9,
    image: 'https://speedstore.store/9816-large_default/williams-f1-logo-iron-on-patches-and-stickers.jpg',
    founded: '1977',
    drivers: ['Alex Albon', 'Franco Colapinto']
  },
  { 
    name: 'McLaren', 
    titles: 8, 
    image: 'https://static.vecteezy.com/system/resources/previews/020/500/043/non_2x/mclaren-brand-logo-symbol-orange-design-british-car-automobile-illustration-free-vector.jpg',
    founded: '1963',
    drivers: ['Lando Norris', 'Oscar Piastri']
  },
  { 
    name: 'Mercedes', 
    titles: 8, 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png',
    founded: '1954',
    drivers: ['Lewis Hamilton', 'George Russell']
  },
  {
    name: 'Red Bull',
    titles: 6,
    image: 'https://cdn-7.motorsport.com/static/img/ugl/6100000/6190000/6195000/6195400/6195400/s700/f1-logo-da-red-bull-2014.jpg',
    founded: '2005',
    drivers: ['Max Verstappen', 'Sergio Perez']
  }
];

//funcao para fazer o login
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const storedPassword = await AsyncStorage.getItem(username);
    if (storedPassword === password) {
      navigation.replace('MainTabs'); //vai para a aba principal apos fazer o login
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Usuário"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} 
       color = 'gray'/>
    </View>
  );
}

//funcao para fazer o cadastro
function SignupScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    await AsyncStorage.setItem(username, password);
    Alert.alert('Cadastro', 'Usuário cadastrado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        placeholder="Novo Usuário"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
      <TextInput
        placeholder="Nova Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Cadastrar" onPress={handleSignup} 
       color = 'gray'/>
    </View>
  );
}

//tela dos pilotos com mais vitorias
function TopDriversScreen({ navigation }) {
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/751867__geoff-bremner-audio__formula-1-racecar-passby.wav') 
    );
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maiores Vencedores</Text>
      <FlatList
        data={topDrivers}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              playSound();
              navigation.navigate('DriverDetails', { driver: item });
            }}
          >
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.listItem}>{item.name} - {item.wins} vitórias</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

//tela de detalhes do piloto selecionado com botao de voltar
function DriverDetailsScreen({ route, navigation }) {
  const { driver } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: driver.image }} style={styles.imageLarge} />
      <Text style={styles.title}>{driver.name}</Text>
      <Text style={styles.details}>Vitórias: {driver.wins}</Text>
      <Text style={styles.details}>Títulos: {driver.titles}</Text>
      <Text style={styles.details}>Idade: {driver.age} anos</Text>
      <Text style={styles.details}>Equipe: {driver.team}</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} /> 
    </View>
  );
}

//tela de detalhes da equipe selecionada com botao de voltar
function TeamDetailsScreen({ route, navigation }) {
  const { team } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: team.image }} style={styles.imageLarge} />
      <Text style={styles.title}>{team.name}</Text>
      <Text style={styles.details}>Títulos: {team.titles}</Text>
      <Text style={styles.details}>Fundada em: {team.founded}</Text>
      <Text style={styles.details}>Pilotos Atuais:</Text>
      {team.drivers.map((driver, index) => (
        <Text key={index} style={styles.details}>{driver}</Text>
      ))}
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

//tela para mostrar as equipes com mais titulos
function TopTeamsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipes com Mais Títulos</Text>
      <FlatList
        data={topTeams}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('TeamDetails', { team: item })}
          >
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.listItem}>{item.name} - {item.titles} títulos</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

//configuracao da navegacao principal usando as abas
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

//funcao para navegar entre as abas de login e cadastro
function AuthTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Faça Login no App da Formula 1"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Faça Cadastro no App da Formula 1"
        component={SignupScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//funcao para configurar o stack navigator para alterar entre as abas de login e cadastro e as abas principais do app
function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthTabs" component={AuthTabs} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="DriverDetails" component={DriverDetailsScreen} />
      <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} />
    </Stack.Navigator>
  );
}

//componente principal para fazer a nevagação
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  listItem: {
    fontSize: 18,
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  imageLarge: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 30, 
  },
  details: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 8,
  },
});
