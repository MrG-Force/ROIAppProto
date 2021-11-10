import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import People from "../app_data/PeopleDB";
import Card from "./ContactCard";

const Contacts = ({ navigation }) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.Id}
        bounces="false"
        data={People}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { itemId: item.Id })}
          >
            <Card>
              <View style={styles.cardContent}>
                <Text style={styles.contactName}>{item.Name}</Text>
                <Text style={styles.contactPhone}>{item.Phone}</Text>
              </View>
            </Card>
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
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
});

export default Contacts;
