import React from 'react';
import {

} from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Openning from './src/components/openning';
import Login from './src/components/login';
import SignUp from './src/components/signUp';

import MainPage from './src/components/mainPage';
import AddUser from './src/components/addUser';
import Profile from './src/components/profile';
console.disableYellowBox = true; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function TabBar() {
  return (
    <Tab.Navigator
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Ana Sayfa') {
              iconName = 'home'
            } else if (route.name === 'Mesajlar') {
              iconName = 'envelope';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Ana Sayfa" component={MainPage}/>
        <Tab.Screen name="Add" component={AddUser} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        
          <Stack.Screen name="Openning" component={Openning} options = {{headerShown: false}} />
          <Stack.Screen name="Giris" component={Login} options = {{ headerTitle: "", headerBackTitle: " "}} />
          <Stack.Screen name="Kayit" component={SignUp} options = {{ headerTitle: "", headerBackTitle: " "}} />
          <Stack.Screen name="App" component= {TabBar} options = {{headerShown : false ,}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


