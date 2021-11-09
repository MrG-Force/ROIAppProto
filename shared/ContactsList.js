import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import People from "../app_data/PeopleDB";
import ContactCard from "./ContactCard";

const Contacts = ({ navigation }) => {
  const contactItem = ({ item }) => {
    return (
      <ContactCard>
        <Text style={styles.contactName}>{item.Name}</Text>
        <Text style={styles.contactPhone}>{item.Phone}</Text>
      </ContactCard>
    );
  };
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.Id}
        bounces="false"
        data={People}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", item)}
          >
            <ContactCard>
              <Text style={styles.contactName}>{item.Name}</Text>
              <Text style={styles.contactPhone}>{item.Phone}</Text>
            </ContactCard>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactName: {
    fontWeight: "bold",
  },
  contactPhone: {
    marginTop: 5,
  },
  contentContainer: {
    paddingBottom: 10,
  },
});

export default Contacts;
