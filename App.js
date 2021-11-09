import { StatusBar } from "expo-status-bar";
import AllContacts from "./screens/AllContacts";
import DetailsScreen from "./screens/Details";
import AddContact from "./screens/AddContact";
import EditContact from "./screens/EditContact";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Home" component={AllContacts} />
          <Stack.Screen name="New Contact" component={AddContact} />
          <Stack.Screen name="Edit Contact" component={EditContact} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
