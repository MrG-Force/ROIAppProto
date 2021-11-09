import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

export default function AddContact({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is where you can add a new contact</Text>
      <Button title="Add Contact" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
