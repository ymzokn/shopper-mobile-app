import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SignUp from './src/screens/SignUp';
import ListCreateScreen from './src/screens/ListCreateScreen';
import Lists from './src/screens/Lists';
import { Provider as AuthProvider } from "./src/context/AuthContext"
import { navigationRef } from './RootNavigation';


export default function App() {
  const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="ResolveAuthScreen">
          <Stack.Screen name="ResolveAuthScreen" component={ResolveAuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Sign Up" }, { headerShown: false }} />
          <Stack.Screen name="Lists" component={Lists} options={{ title: "Your lists" }} />
          <Stack.Screen name="ListCreateScreen" component={ListCreateScreen} options={{ title: "Create a new list" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
