import { StatusBar } from "expo-status-bar";
import AllContacts from "./screens/AllContacts";
import DetailsScreen from "./screens/Details";
import AddContact from "./screens/AddContact";
import EditContact from "./screens/EditContact";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AddContactBtn } from "./shared/CoolButtons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#3b3b3b" },
          }}
        >
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen
            name="Home"
            component={AllContacts}
            options={({ navigation }) => ({
              headerTitle: "ROI Contacts",
              headerRight: () => (
                <AddContactBtn
                  onPress={() => navigation.navigate("New Contact")}
                />
              ),
              headerTitleStyle: { fontSize: 25 },
            })}
          />
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
