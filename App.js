import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import LoginProvider from "./context/LoginProvider";
import Home from "./components/Home";

const Stack = createNativeStackNavigator();
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <LoginProvider>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </LoginProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
