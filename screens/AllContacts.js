import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, Alert, TextInput } from "react-native";
import ContactsList from "../shared/ContactsList";
import { SafeAreaView } from "react-native-safe-area-context";
import People from "../app_data/PeopleDB";
import Departments from "../app_data/DepartmentsDB";
import Card from "../shared/ContactCard";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import UpDownCaret from "../shared/UpDownCaret";
import { IconBtn } from "../shared/RoiButton";

const filterItems = Departments.map((obj) => {
  return <Picker.Item key={obj.id} label={obj.name} value={obj.id} />;
});

const AllContacts = ({ navigation }) => {
  const peopleData = People;
  const [searchNameInput, setSearchNameInput] = useState("");
  const [searchIdInput, setSearchIdInput] = useState();
  const [departmentFilter, setDepartmentFilter] = useState();
  const [departmentValue, setDepartmentValue] = useState();
  // useState for filteredData
  const [filteredData, setFilteredData] = useState(peopleData);

  useFocusEffect(
    React.useCallback(() => {
      //alert("This screen was just focused");
      // fetch data from DB
      return () => {
        setSearchNameInput("");
        setFilteredData(peopleData);
        setDepartmentValue(null);
      };
    }, [])
  );

  useEffect(() => {
    setFilteredData(filterByName());
    setFilteredData(filterByDepartment());
  }, [departmentFilter, searchNameInput]);

  const filterByName = () => {
    if (searchNameInput) {
      return peopleData.filter((contact) =>
        contact.Name.toLocaleLowerCase().includes(
          searchNameInput.toLocaleLowerCase()
        )
      );
    } else {
      return peopleData;
    }
  };

  const filterByDepartment = () => {
    if (departmentFilter != null) {
      // alert(`${departmentFilter}`);
      return filterByName().filter(
        (contact) => contact.Department === parseInt(departmentFilter)
      );
    } else {
      return filterByName();
    }
  };

  const submitSearch = (id) => {
    if (peopleData.find((contact) => contact.Id == id)) {
      setSearchIdInput("");
      navigation.navigate("Details", { itemId: parseInt(id) });
    } else {
      Alert.alert(`Contact with Id: ${id} does not exist.`);
      setSearchIdInput("");
    }
  };

  // TODO: sort contacts?
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
      <View style={styles.pickerView}>
        <UpDownCaret style={styles.pickerCaret} />
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={departmentValue}
          onValueChange={(itemValue) => setDepartmentValue(itemValue)}
        >
          <Picker.Item
            key={-1}
            label=" All departments..."
            value={null}
            enabled={true}
          />
          {filterItems}
        </Picker>
        <IconBtn
          style={styles.filterBtn}
          iconName="funnel-sharp"
          size={28}
          color="#ffffff"
          onPress={() => setDepartmentFilter(departmentValue)}
        />
      </View>
      <View style={styles.container}>
        <ContactsList navigation={navigation} contactsData={filteredData} />
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
  picker: {
    height: 45,
    width: "85%",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#ffffff",
    marginHorizontal: 3,
    borderRadius: 5,
  },
  pickerItem: {
    height: 45,
    fontSize: 17,
    marginLeft: 15,
  },
  pickerView: {
    flexDirection: "row",
    marginVertical: 5,
    marginLeft: 3,
    marginRight: 15,
    zIndex: 1,
    alignItems: "center",
  },
  pickerCaret: {
    ...Platform.select({
      ios: {
        display: "flex",
        position: "absolute",
        zIndex: 2,
      },
      android: {
        display: "none",
      },
      web: {
        display: "none",
      },
    }),
  },
  filterBtn: {
    backgroundColor: "#00a79e",
    padding: 5,
    marginLeft: 5,
    borderRadius: 5,
    borderColor: "#3b3b3b",
    borderStyle: "solid",
    borderWidth: 1,
    width: "14%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AllContacts;
