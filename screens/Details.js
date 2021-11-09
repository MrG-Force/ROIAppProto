import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

export default function DetailsScreen({ navigation, route }) {
  const item = route.params;
  const paddedId = item.Id.toString().padStart(4, "0");
  return (
    <View style={styles.container}>
      <Text style={styles.nameHeading}>{item.Name}</Text>
      <Text style={styles.idHeading}>Employee ID: {paddedId}</Text>
      <Button
        title="Edit contact"
        onPress={() => navigation.navigate("Edit Contact")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  nameHeading: {
    fontSize: 30,
    marginTop: 20,
  },
  idHeading: {
    fontSize: 15,
    marginTop: 10,
  },
});
