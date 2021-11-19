import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Card from "./ContactCard";
import { IconBtn } from "./RoiButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// TODO: Add some icons to indicate go to details: arrow chevron etc

const ContactsList = ({ navigation, contactsData, departments }) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.Name}
        bounces="false"
        data={contactsData}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.cardWrapper}>
              <View style={styles.cardContent}>
                <Text style={styles.contactName}>{item.Name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 5, marginTop: 5 }}
                    name="cellphone-iphone"
                    size={20}
                    color="#595959"
                  />
                  <Text style={styles.contactPhone}>{item.Phone}</Text>
                </View>
              </View>
              <IconBtn
                style={styles.chevronRight}
                onPress={() =>
                  navigation.navigate("Details", {
                    itemId: item.Id,
                    departments: departments,
                  })
                }
                iconName="chevron-forward-circle-outline"
                size={45}
                color="#00a79e"
              />
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
    marginRight: 2,

    //--- debug ---
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
});

export default ContactsList;
