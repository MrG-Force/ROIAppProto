import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Card from "../shared/ContactCard";
//import Departments from "../app_data/DepartmentsDB";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ComposedIconBtn } from "../shared/RoiButton";
import { peoplePostApiCommand } from "../app_data/PeopleApi";
import UpDownCaret from "../shared/UpDownCaret";

export default function AddContact({ navigation, route }) {
  const { departments } = route.params;
  const [formName, setName] = useState("");
  const [formDepartment, setDepartment] = useState("");
  const [formPhone, setPhone] = useState("");
  const [formStreet, setStreet] = useState("");
  const [formCity, setCity] = useState("");
  const [formState, setState] = useState("");
  const [formZip, setZip] = useState("");
  const [formCountry, setCountry] = useState("");

  const person = {
    name: formName,
    phone: formPhone,
    department: parseInt(formDepartment),
    street: formStreet,
    city: formCity,
    state: formState,
    zip: formZip,
    country: formCountry,
  };

  const Submit = () => {
    if (
      !formName ||
      !formPhone ||
      !formDepartment ||
      !formStreet ||
      !formCity ||
      !formState ||
      !formZip ||
      !formCountry
    ) {
      alert("Please enter info in all fields and select a valid department.");
    } else {
      peoplePostApiCommand("AddPerson", person)
        .then((response) => {
          if (response.ok) {
            alert(`${formName} is now a ROI contact.`);
            navigation.navigate("Home");
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
      extraHeight={150}
      enableOnAndroid={true}
    >
      <Card style={styles.fieldCard}>
        <Text style={styles.attribName}>name</Text>
        <TextInput
          style={styles.fieldValue}
          value={formName}
          onChangeText={(name) => setName(name)}
          autoCapitalize="words"
          selectTextOnFocus={true}
          placeholder="Full name"
        />
      </Card>
      <Card style={styles.fieldCard}>
        <Text style={[styles.attribName, styles.attribNameDept]}>
          department
        </Text>
        <View style={styles.pickerView}>
          <UpDownCaret style={styles.pickerCaret} />
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={formDepartment}
            onValueChange={(itemValue) => setDepartment(itemValue)}
          >
            <Picker.Item
              key={-1}
              label="-- Select department --"
              value=""
              enabled={true}
            />
            {departments.map((obj) => (
              <Picker.Item key={obj.Id} label={obj.Name} value={obj.Id} />
            ))}
          </Picker>
        </View>
      </Card>
      <Card style={styles.fieldCard}>
        <Text style={styles.attribName}>phone</Text>
        <TextInput
          style={styles.fieldValue}
          value={formPhone}
          onChangeText={(phone) => setPhone(phone)}
          selectTextOnFocus={true}
          keyboardType="phone-pad"
          placeholder="0123456789"
        />
      </Card>
      <Card style={styles.fieldCard}>
        <Text style={styles.attribName}>street</Text>
        <TextInput
          style={styles.fieldValue}
          value={formStreet}
          onChangeText={(street) => setStreet(street)}
          selectTextOnFocus={true}
          placeholder="Number &amp; street name"
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
            iconName="account-plus-outline"
            size={35}
            color="#00534f"
            label="Add contact"
            onPress={Submit}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
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
    marginTop: 10,
    height: 45,
    width: "90%",
    backgroundColor: "#ffffff",
    marginLeft: "10%",
    borderRadius: 5,
    // --- debug
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "blue",
  },
  pickerItem: {
    height: 50,
    fontSize: 18,
  },
  pickerView: {
    flexDirection: "row",
    marginVertical: 5,
    marginLeft: 3,
    marginRight: 15,
    zIndex: 1,
    alignItems: "flex-start",
    //--- debug ---
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "red",
  },
  pickerCaret: {
    ...Platform.select({
      ios: {
        display: "flex",
        position: "absolute",
        zIndex: 2,
        marginTop: 10,
        //--- debug ---
        // borderWidth: 1,
        // borderStyle: "solid",
        // borderColor: "red",
      },
      android: {
        display: "none",
      },
      web: {
        display: "none",
      },
    }),
  },
});
