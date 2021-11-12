import React, { useState } from "react";
import { View, StyleSheet, Text, Modal, Pressable, Alert } from "react-native";
import Card from "../shared/ContactCard";
import { DeleteBtn, EditBtn } from "../shared/CoolButtons";
import People from "../app_data/PeopleDB";
import Departments from "../app_data/DepartmentsDB";

export default function DetailsScreen({ navigation, route }) {
  const { itemId } = route.params;
  const item = People.find((person) => person.Id === itemId);
  const paddedId = item.Id.toString().padStart(4, "0");
  const [modalVisible, setModalVisible] = useState(false);

  const B = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );

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
        <Text style={styles.attribName}>department</Text>
        <Text style={styles.fieldValue}>
          {Departments[item.Department].name}
        </Text>
      </Card>
      <Card style={styles.fieldCard}>
        <Text style={styles.attribName}>phone</Text>
        <Text style={styles.fieldValue}>{item.Phone}</Text>
      </Card>
      <Card style={styles.fieldCard}>
        <Text style={styles.attribName}>street</Text>
        <Text style={styles.fieldValue}>{item.Address.Street}</Text>
      </Card>
      <View style={styles.fieldsRow}>
        <View style={styles.city}>
          <Card>
            <Text style={styles.attribName}>city</Text>
            <Text style={styles.fieldValue}>{item.Address.City}</Text>
          </Card>
        </View>
        <View style={styles.state}>
          <Card>
            <Text style={styles.attribName}>state</Text>
            <Text style={styles.fieldValue}>{item.Address.State}</Text>
          </Card>
        </View>
      </View>
      <View style={styles.fieldsRow}>
        <View style={styles.zipCode}>
          <Card>
            <Text style={styles.attribName}>zip code</Text>
            <Text style={styles.fieldValue}>{item.Address.Zip}</Text>
          </Card>
        </View>
        <View style={styles.country}>
          <Card>
            <Text style={styles.attribName}>country</Text>
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
          <EditBtn
            onPress={() =>
              navigation.navigate("Edit Contact", { itemId: item.Id })
            }
          >
            <Text>Edit contact</Text>
          </EditBtn>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete <B>{item.Name}</B> from
              <B> Contacts</B>? {"\n"}This action is irreversible.
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
  attribName: {
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
  modalView: {
    backgroundColor: "white",
    marginHorizontal: "10%",
    borderRadius: 25,
    //--- debug ---
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 2,
  },
  modalText: {
    lineHeight: 25,
    textAlign: "justify",
    fontSize: 18,
    padding: 15,
    //--- debug ---
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modButton: {
    padding: 15,
    marginVertical: 25,
    width: "35%",
    alignItems: "center",
    borderRadius: 20,
    //--- debug ---
    borderStyle: "solid",
  },
  buttonCancel: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D9D9D9",
    borderWidth: 3,
  },
  buttonProceed: {
    backgroundColor: "rgba(0, 167, 158, 0.6)",
    borderColor: "#014a45",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
