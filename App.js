import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import EmptyListScreen from "./src/screens/EmptyListScreen";
import CreateListScreen from "./src/screens/CreateListScreen";
import ListDetailsScreen from "./src/screens/ListDetailsScreen";
import Lists from "./src/screens/Lists";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as ListProvider } from "./src/context/ListContext";
import { navigationRef } from "./RootNavigation";
import { Button } from "react-native";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <ListProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="ResolveAuthScreen">
            <Stack.Screen
              name="ResolveAuthScreen"
              component={ResolveAuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={({ title: "Sign Up" }, { headerShown: false })}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={({ title: "Sign In" }, { headerShown: false })}
            />
            <Stack.Screen
              name="Lists"
              component={Lists}
              options={{ title: "My Lists" }}
            />
            <Stack.Screen
              name="EmptyListScreen"
              component={EmptyListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateListScreen"
              component={CreateListScreen}
              options={{ title: "New list" }}
            />
            <Stack.Screen
              name="ListDetailsScreen"
              component={ListDetailsScreen}
              options={{ title: "My List" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ListProvider>
    </AuthProvider>
  );
}

// options={{ headerTitle: (navigation) => <ListDetailsScreenHeader navigation={navigation} /> }}
// options={({ route }) => ({ title: route.params.item.name })}
