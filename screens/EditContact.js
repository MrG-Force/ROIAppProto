import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

export default function EditContact({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is where you can add a new contact</Text>
      <Button
        title="Update contact"
        onPress={() => navigation.navigate("Details")}
      />
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
