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
import { Ionicons } from "@expo/vector-icons";

// TODO: Add some icons to indicate go to details: arrow chevron etc

const Contacts = ({ navigation }) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.Id}
        bounces="false"
        data={People}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.cardWrapper}>
              <View style={styles.cardContent}>
                <Text style={styles.contactName}>{item.Name}</Text>
                <Text style={styles.contactPhone}>{item.Phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.chevronRight}
                onPress={() =>
                  navigation.navigate("Details", { itemId: item.Id })
                }
              >
                <View>
                  <Ionicons
                    name="chevron-forward-circle"
                    size={45}
                    color="#00a79e"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  contactPhone: {
    marginTop: 5,
    fontSize: 16,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chevronRight: {
    justifyContent: "center",
    //--- debug ---
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
});

export default Contacts;
