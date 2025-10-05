import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import {RootStackParamList} from './src/types/navigation';
import DetailsScreen from './src/screens/DetailsScreen';

import './global.css';

const Stack = createStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Events Around',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: 'Event details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
