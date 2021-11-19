import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Card from "../shared/ContactCard";
//import Departments from "../app_data/DepartmentsDB";
//import People from "../app_data/PeopleDB";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ComposedIconBtn } from "../shared/RoiButton";
import { getPersonfromApi, peoplePostApiCommand } from "../app_data/PeopleApi";
import { useFocusEffect } from "@react-navigation/native";

export default function EditContact({ navigation, route }) {
  //const paddedId = person.Id.toString().padStart(4, "0");
  //const person = People.find((person) => person.Id === itemId);
  const { itemId, departments } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState({});
  // --- Form ---
  const [formName, setName] = useState("");
  const [formDepartment, setDepartment] = useState("");
  const [formPhone, setPhone] = useState("");
  const [formStreet, setStreet] = useState("");
  const [formCity, setCity] = useState("");
  const [formState, setState] = useState("");
  const [formZip, setZip] = useState("");
  const [formCountry, setCountry] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getPersonfromApi(itemId)
        .then((data) => {
          setPerson(data.d);
          setName(data.d.Name);
          setDepartment(departments[data.d.Department]);
          setPhone(data.d.Phone);
          setStreet(data.d.Address.Street);
          setCity(data.d.Address.City);
          setState(data.d.Address.State);
          setZip(data.d.Address.Zip);
          setCountry(data.d.Address.Country);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }, [])
  );

  const Submit = () => {
    if (
      !formName ||
      !formPhone ||
      !formStreet ||
      !formCity ||
      !formState ||
      !formZip ||
      !formCountry
    ) {
      alert("Please enter info in all required fields.");
    } else {
      peoplePostApiCommand("EditPerson", {
        id: person.Id,
        name: formName,
        phone: formPhone,
        department: parseInt(formDepartment),
        street: formStreet,
        city: formCity,
        state: formState,
        zip: formZip,
        country: formCountry,
      })
        .then((response) => {
          if (response.ok) {
            navigation.navigate("Details", {
              itemId: person.Id,
              departments: departments,
            });
            alert("Contact details have been successfully updated.");
          } else {
            return Promise.reject(
              alert(
                "Error: Something went awfully wrong. \n" +
                  "Status: " +
                  response.status +
                  "\n" +
                  "Status Message: " +
                  response.statusText
              )
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      extraHeight={100}
      enableOnAndroid={true}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.idHeading}>
            Employee ID: {person.Id.toString().padStart(4, "0")}
          </Text>
          <Card style={styles.fieldCard}>
            <Text style={styles.attribName}>name</Text>
            <TextInput
              style={styles.fieldValue}
              value={formName}
              onChangeText={(name) => setName(name)}
              autoCapitalize="words"
              selectTextOnFocus={true}
            />
          </Card>
          <Text style={styles.attribName}>department</Text>
          <Card style={styles.fieldCard}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={formDepartment}
              onValueChange={(itemValue) => setDepartment(itemValue)}
            >
              {departments.map((obj) => (
                <Picker.Item key={obj.Id} label={obj.Name} value={obj.Id} />
              ))}
            </Picker>
          </Card>
          <Card style={styles.fieldCard}>
            <Text style={styles.attribName}>phone</Text>
            <TextInput
              style={styles.fieldValue}
              value={formPhone}
              onChangeText={(phone) => setPhone(phone)}
              selectTextOnFocus={true}
              keyboardType="phone-pad"
            />
          </Card>
          <Card style={styles.fieldCard}>
            <Text style={styles.attribName}>street</Text>
            <TextInput
              style={styles.fieldValue}
              value={formStreet}
              onChangeText={(street) => setStreet(street)}
              selectTextOnFocus={true}
            />
          </Card>
          <View style={styles.fieldsRow}>
            <View style={styles.city}>
              <Card style={styles.fieldCard}>
                <Text style={styles.attribName}>city</Text>
                <TextInput
                  style={styles.fieldValue}
                  value={formCity}
                  onChangeText={(city) => setCity(city)}
                  selectTextOnFocus={true}
                  maxLength={85}
                />
              </Card>
            </View>
            <View style={styles.state}>
              <Card style={styles.fieldCard}>
                <Text style={styles.attribName}>state</Text>
                <TextInput
                  style={styles.fieldValue}
                  value={formState}
                  onChangeText={(state) => setState(state)}
                  selectTextOnFocus={true}
                  maxLength={20}
                />
              </Card>
            </View>
          </View>
          <View style={styles.fieldsRow}>
            <View style={styles.zipCode}>
              <Card style={styles.fieldCard}>
                <Text style={styles.attribName}>zip code</Text>
                <TextInput
                  style={styles.fieldValue}
                  value={formZip}
                  onChangeText={(zip) => setZip(zip)}
                  selectTextOnFocus={true}
                  maxLength={10}
                  keyboardType="decimal-pad"
                />
              </Card>
            </View>
            <View style={styles.country}>
              <Card style={styles.fieldCard}>
                <Text style={styles.attribName}>country</Text>
                <TextInput
                  style={styles.fieldValue}
                  value={formCountry}
                  onChangeText={(country) => setCountry(country)}
                  selectTextOnFocus={true}
                  maxLength={56}
                />
              </Card>
            </View>
          </View>
          <View style={styles.buttonsRow}>
            <View style={styles.button}>
              <ComposedIconBtn
                style={styles.saveBtn}
                iconName="account-check-outline"
                size={35}
                color="#00534f"
                label="Save changes"
                onPress={Submit}
              />
            </View>
          </View>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  idHeading: {
    fontSize: 30,
    marginVertical: 20,
    alignSelf: "center",
  },
  fieldCard: {
    marginVertical: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#014a45",
  },
  fieldValue: {
    marginHorizontal: 10,
    marginBottom: 3,
    fontSize: 18,
  },
  attribName: {
    fontSize: 12,
    color: "#00a79e",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 3,
  },
  attribNameDept: {
    fontSize: 12,
    color: "#00a79e",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 3,
    position: "absolute",
  },
  fieldsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  city: { width: "55%" },
  state: { width: "45%" },
  zipCode: { width: "30%" },
  country: { width: "70%" },
  button: { width: "30%" },
  saveBtn: {
    shadowColor: "#00a79e",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#00a79e",
  },
  picker: {
    height: 50,
  },
  pickerItem: {
    height: 50,
    fontSize: 18,
  },
});
