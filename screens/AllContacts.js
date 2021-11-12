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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#D9D9D9",
  },
});

export default AllContacts;
