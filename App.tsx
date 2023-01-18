import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {HomeScreen} from './src/screens/HomeScreen';
import {CurrencyDetailScreen} from './src/screens/CurrencyDetailScreen';
import {SearchScreen} from './src/screens/SearchScreen';

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="HomeScreen" component={HomeScreen} />
          <RootStack.Screen
            name="CurrencyDetailScreen"
            component={CurrencyDetailScreen}
          />
          <RootStack.Screen name="SearchScreen" component={SearchScreen} />
        </RootStack.Navigator>
        <StatusBar backgroundColor="#085FAD" translucent={true} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
