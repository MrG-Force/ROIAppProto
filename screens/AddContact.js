import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Card from "../shared/ContactCard";
import { SaveBtn } from "../shared/CoolButtons";
import Departments from "../app_data/DepartmentsDB";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const pickerItems = Departments.map((obj) => {
  return <Picker.Item key={obj.id} label={obj.name} value={obj.name} />;
});

export default function AddContact({ navigation }) {
  const [formName, setName] = useState();
  const [formDepartment, setDepartment] = useState();
  const [formPhone, setPhone] = useState();
  const [formStreet, setStreet] = useState();
  const [formCity, setCity] = useState();
  const [formState, setState] = useState();
  const [formZip, setZip] = useState();
  const [formCountry, setCountry] = useState();

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
      Alert.alert("Please enter info in all required fields.");
    } else {
      Alert.alert("New contact has been successfully added.");
      navigation.navigate("Home");
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
      <Text style={styles.attribName}>department</Text>
      <Card style={styles.fieldCard}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={formDepartment}
          onValueChange={(itemValue) => setDepartment(itemValue)}
        >
          <Picker.Item
            key=""
            label="-- Select department --"
            value={null}
            enabled={false}
          />
          {pickerItems}
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
          <SaveBtn style={styles.saveBtn} onPress={Submit}>
            <Text>Add contact</Text>
          </SaveBtn>
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
