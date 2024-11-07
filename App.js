import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      <Button title="Entrar" onPress={handleLogin} />
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
      <Button title="Cadastrar" onPress={handleSignup} />
    </View>
  );
}

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
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cadastro"
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
});
