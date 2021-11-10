import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Card from "../shared/ContactCard";
import { SaveBtn } from "../shared/coolButtons";
import Departments from "../app_data/DepartmentsDB";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const pickerItems = Departments.map((obj) => {
  return <Picker.Item key={obj.id} label={obj.name} value={obj.name} />;
});

export default function EditContact({ navigation, route }) {
  const item = route.params;
  const paddedId = item.Id.toString().padStart(4, "0");

  const [formName, setName] = useState(item.Name);
  const [formDepartment, setDepartment] = useState(
    Departments[item.Department]
  );
  const [formPhone, setPhone] = useState(item.Phone);
  const [formStreet, setStreet] = useState(item.Address.Street);
  const [formCity, setCity] = useState(item.Address.City);
  const [formState, setState] = useState(item.Address.State);
  const [formZip, setZip] = useState(item.Address.Zip);
  const [formCountry, setCountry] = useState(item.Address.Country);

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
      Alert.alert("Contact details have been successfully updated.");
      navigation.navigate("Home");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      extraHeight={100}
      enableOnAndroid={true}
    >
      <Text style={styles.idHeading}>Employee ID: {paddedId}</Text>
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
          style={{ fontSize: 18 }}
          selectedValue={formDepartment}
          onValueChange={(itemValue) => setDepartment(itemValue)}
        >
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
          <SaveBtn style={styles.saveBtn} onPress={Submit}>
            <Text>Save changes</Text>
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
});
