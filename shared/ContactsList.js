import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import People from "../app_data/PeopleDB";
import Card from "./ContactCard";
import { IconBtn } from "./RoiButton";

// TODO: Add some icons to indicate go to details: arrow chevron etc

const Contacts = ({ navigation, data }) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.Id}
        bounces="false"
        data={data}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.cardWrapper}>
              <View style={styles.cardContent}>
                <Text style={styles.contactName}>{item.Name}</Text>
                <Text style={styles.contactPhone}>{item.Phone}</Text>
              </View>
              <IconBtn
                style={styles.chevronRight}
                onPress={() =>
                  navigation.navigate("Details", { itemId: item.Id })
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

export default Contacts;
