import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {CurrencyDetailScreen} from './src/screens/CurrencyDetailScreen';

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen
          name="CurrencyDetailScreen"
          component={CurrencyDetailScreen}
        />
      </RootStack.Navigator>
      <StatusBar backgroundColor="#085FAD" translucent={true} />
    </NavigationContainer>
  );
};

export default App;
