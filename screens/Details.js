import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Card from "../shared/ContactCard";
import People from "../app_data/PeopleDB";
import Departments from "../app_data/DepartmentsDB";
import { ComposedIconBtn, IconBtn } from "../shared/RoiButton";
import { ModalConfirmDelete } from "./Modals";

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconBtn
          onPress={() => setModalVisible(true)}
          iconName="trash-outline"
          size={30}
          color="#ffffff"
        />
      ),
    });
  });

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
          <ComposedIconBtn
            iconName="account-edit-outline"
            size={35}
            color="#00a79e"
            label="Edit contact"
            onPress={() =>
              navigation.navigate("Edit Contact", { itemId: item.Id })
            }
          />
        </View>
      </View>
      <ModalConfirmDelete
        visible={modalVisible}
        onCancelAction={() => setModalVisible(!modalVisible)}
        onConfirmDelete={Delete}
        itemName={item.Name}
      />
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
});
