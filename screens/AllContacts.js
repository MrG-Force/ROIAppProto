// import People from "../app_data/PeopleDB";
// import Departments from "../app_data/DepartmentsDB";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import ContactsList from "../shared/ContactsList";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../shared/ContactCard";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import UpDownCaret from "../shared/UpDownCaret";
import { IconBtn } from "../shared/RoiButton";
import {
  getDepartmentsFromApi,
  getDummies,
  getPeopleFromApi,
} from "../app_data/PeopleApi";

const AllContacts = ({ navigation }) => {
  const [peopleData, setPeopleData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchNameInput, setSearchNameInput] = useState("");
  const [searchIdInput, setSearchIdInput] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState();
  const [departmentValue, setDepartmentValue] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // useState for filteredData
  const [filteredData, setFilteredData] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconBtn
          onPress={() =>
            navigation.navigate("New Contact", { departments: departments })
          }
          iconName="person-add"
          size={30}
          color="#ffffff"
          style={{ marginRight: 10 }}
        />
      ),
    });
  });

  useFocusEffect(
    React.useCallback(() => {
      getDepartmentsFromApi()
        .then((data) => {
          setDepartments(data.d);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      //---------- fetch data from WebService ----------
      getPeopleFromApi()
        .then((data) => {
          setPeopleData(data.d);
          setFilteredData(data.d);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
      //---------- Get dummy data ----------
      // setPeopleData(getDummies);

      return () => {
        setSearchNameInput("");
        setDepartmentValue("all");
        setDepartmentFilter("all"); // This may cause infinite trouble
      };
    }, [])
  );

  // To prevent the filterByName to be called on the first render
  const firstRender = useRef(true);
  // To control when filterByDepartment is called
  const filteringByDepartment = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setFilteredData(filterByName());
    if (filteringByDepartment.current) {
      setFilteredData(filterByDepartment());
      filteringByDepartment.current = false;
    }
    //
  }, [searchNameInput, departmentFilter]);

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
    if (departmentFilter == "all") {
      return filterByName();
    } else {
      return filterByName().filter(
        (contact) => contact.Department === parseInt(departmentFilter)
      );
    }
  };

  const submitSearch = (id) => {
    if (peopleData.find((contact) => contact.Id == id)) {
      setSearchIdInput("");
      navigation.navigate("Details", {
        itemId: parseInt(id),
        departments: departments,
      });
    } else {
      alert(`Contact with Id: ${id} does not exist.`);
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
            label="All departments..."
            value="all"
            enabled={true}
          />
          {departments.map((obj) => (
            <Picker.Item key={obj.Id} label={obj.Name} value={obj.Id} />
          ))}
        </Picker>
        <IconBtn
          style={styles.filterBtn}
          iconName="funnel-sharp"
          size={28}
          color="#ffffff"
          onPress={() => {
            filteringByDepartment.current = true;
            setDepartmentFilter(departmentValue);
          }}
        />
      </View>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ContactsList
            navigation={navigation}
            contactsData={filteredData}
            departments={departments}
          />
        )}
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
      default: {
        //--- debug ---
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
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
