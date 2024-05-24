import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Import your screens
import HomeScreen from '../screens/Home';


const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <Stack.Screen name="Home" component={HomeScreen} />
                    </Stack.Navigator>

                </SafeAreaView>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};


export default App;
