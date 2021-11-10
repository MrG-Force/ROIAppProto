import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, Pressable, Alert } from "react-native";
import Card from "../shared/ContactCard";
import { DeleteBtn, EditBtn } from "../shared/coolButtons";
import People from "../app_data/PeopleDB";
import Departments from "../app_data/DepartmentsDB";

export default function DetailsScreen({ navigation, route }) {
  const { itemId } = route.params;
  const item = People.find((person) => person.Id === itemId);
  const paddedId = item.Id.toString().padStart(4, "0");
  const [modalVisible, setModalVisible] = useState(false);

  const Delete = () => {
    setModalVisible(!modalVisible);
    //TODO: Add deletion logic
    Alert.alert(`${item.Name} has been deleted.`);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nameHeading}>{item.Name}</Text>
      <Text style={styles.idHeading}>Employee ID: {paddedId}</Text>
      <Card style={styles.fieldCard}>
        <Text style={styles.atribName}>department</Text>
        <Text style={styles.fieldValue}>
          {Departments[item.Department].name}
        </Text>
      </Card>
      <Card style={styles.fieldCard}>
        <Text style={styles.atribName}>phone</Text>
        <Text style={styles.fieldValue}>{item.Phone}</Text>
      </Card>
      <Card style={styles.fieldCard}>
        <Text style={styles.atribName}>street</Text>
        <Text style={styles.fieldValue}>{item.Address.Street}</Text>
      </Card>
      <View style={styles.fieldsRow}>
        <View style={styles.city}>
          <Card>
            <Text style={styles.atribName}>city</Text>
            <Text style={styles.fieldValue}>{item.Address.City}</Text>
          </Card>
        </View>
        <View style={styles.state}>
          <Card>
            <Text style={styles.atribName}>state</Text>
            <Text style={styles.fieldValue}>{item.Address.State}</Text>
          </Card>
        </View>
      </View>
      <View style={styles.fieldsRow}>
        <View style={styles.zipCode}>
          <Card>
            <Text style={styles.atribName}>zip code</Text>
            <Text style={styles.fieldValue}>{item.Address.Zip}</Text>
          </Card>
        </View>
        <View style={styles.country}>
          <Card>
            <Text style={styles.atribName}>country</Text>
            <Text style={styles.fieldValue}>{item.Address.Country}</Text>
          </Card>
        </View>
      </View>
      <View style={styles.buttonsRow}>
        <View style={styles.button}>
          <DeleteBtn onPress={() => setModalVisible(true)}>
            <Text>Delete contact</Text>
          </DeleteBtn>
        </View>
        <View style={styles.button}>
          <EditBtn onPress={() => navigation.navigate("Edit Contact", item)}>
            <Text>Edit contact</Text>
          </EditBtn>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete {item.Name} from the Contacts?
              This action is irreversible.
            </Text>
            <View style={styles.modalRow}>
              <Pressable
                style={[styles.modButton, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modButton, styles.buttonProceed]}
                onPress={Delete}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  nameHeading: {
    fontSize: 30,
    marginTop: 20,
    alignSelf: "center",
  },
  idHeading: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  fieldValue: {
    marginHorizontal: 10,
    marginBottom: 3,
    fontSize: 18,
  },
  atribName: {
    fontSize: 12,
    color: "#941a1d",
    marginTop: 0,
    marginBottom: 3,
    marginLeft: 3,
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

  //------ Modal -------

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(89, 89, 89, 0.5)",
  },
  modalView: { backgroundColor: "white", marginHorizontal: "10%" },
  modalText: {},
  modalRow: { flexDirection: "row" },
  modButton: {},
  buttonCancel: {},
  buttonProceed: {},
  buttonText: {},
});
