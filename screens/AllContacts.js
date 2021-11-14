import React, { useState } from "react";
import { View, StyleSheet, Platform, Alert, TextInput } from "react-native";
import Contacts from "../shared/ContactsList";
import { SafeAreaView } from "react-native-safe-area-context";
import People from "../app_data/PeopleDB";
import Card from "../shared/ContactCard";
import { useFocusEffect } from "@react-navigation/native";

const AllContacts = ({ navigation }) => {
  const peopleData = People;
  const [searchNameInput, setSearchNameInput] = useState("");
  const [searchIdInput, setSearchIdInput] = useState();

  useFocusEffect(
    React.useCallback(() => {
      alert("This screen was just focused");
      // fetch data from DB
      return () => {
        setSearchNameInput("");
      };
    }, [])
  );

  const filteredData = searchNameInput
    ? peopleData.filter((contact) =>
        contact.Name.toLocaleLowerCase().includes(
          searchNameInput.toLocaleLowerCase()
        )
      )
    : peopleData;

  const submitSearch = (id) => {
    // Alert.alert(`${id}`);
    if (peopleData.find((contact) => contact.Id == id)) {
      setSearchIdInput("");
      navigation.navigate("Details", { itemId: parseInt(id) });
    } else {
      Alert.alert(`Contact with Id: ${id} does not exist.`);
      setSearchIdInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputsRow}>
        <View style={styles.nameSearchWrapper}>
          <Card style={styles.searchBox}>
            <TextInput
              style={styles.searchField}
              value={searchNameInput}
              onChangeText={(text) => setSearchNameInput(text)}
              selectTextOnFocus={true}
              placeholder="&#x1F50E; Search by name"
            />
          </Card>
        </View>
        <View style={styles.idSearchwrapper}>
          <Card style={styles.searchBox}>
            <TextInput
              style={styles.searchField}
              placeholder="&#x1F50E; Id"
              value={searchIdInput}
              onChangeText={(input) => setSearchIdInput(input)}
              onSubmitEditing={(e) => submitSearch(e.nativeEvent.text)}
              keyboardType={Platform.OS === "ios" ? "default" : "numeric"}
            />
          </Card>
        </View>
      </View>
      <View style={styles.container}>
        <Contacts navigation={navigation} data={filteredData} />
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
  searchField: {
    marginHorizontal: 10,
    marginBottom: 3,
    fontSize: 18,
  },
  searchBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#014a45",
    paddingVertical: 5,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameSearchWrapper: {
    width: "70%",
  },
  idSearchwrapper: {
    width: "28%",
  },
});

export default AllContacts;
