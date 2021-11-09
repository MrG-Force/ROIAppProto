import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Contacts from "../shared/ContactsList";
import { SafeAreaView } from "react-native-safe-area-context";

const AllContacts = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Contacts navigation={navigation} />
      </View>
      <Button
        title="Add New Contact"
        onPress={() => navigation.navigate("New Contact")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});

export default AllContacts;
