import React, { useState } from "react";
import { View, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import Card from "../shared/ContactCard";
// import People from "../app_data/PeopleDB";
//import Departments from "../app_data/DepartmentsDB";
import { ComposedIconBtn, IconBtn } from "../shared/RoiButton";
import { ModalConfirmDelete } from "./Modals";
import { getPersonfromApi, peoplePostApiCommand } from "../app_data/PeopleApi";
import { useFocusEffect } from "@react-navigation/native";

export default function DetailsScreen({ navigation, route }) {
  const { itemId, departments } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getPersonfromApi(itemId)
        .then((data) => {
          setPerson(data.d);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }, [])
  );

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

  const Delete = () => {
    peoplePostApiCommand("DeletePerson", { id: person.Id }).then((response) => {
      if (response.ok) {
        setModalVisible(!modalVisible);
        navigation.navigate("Home");
        alert(`${person.Name} has been deleted.`);
      } else {
        setModalVisible(!modalVisible);
        return Promise.reject(
          alert(
            `Error: Something went wrong. User could not be deleted.\nStatus: ${response.status}\nStatus Message: ${response.statusText}`
          )
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.nameHeading}>{person.Name}</Text>
          <Text style={styles.idHeading}>
            Employee ID: {person.Id.toString().padStart(4, "0")}
          </Text>
          <Card style={styles.fieldCard}>
            <Text style={styles.attribName}>department</Text>
            <Text style={styles.fieldValue}>
              {departments[person.Department].Name}
            </Text>
          </Card>
          <Card style={styles.fieldCard}>
            <Text style={styles.attribName}>phone</Text>
            <Text style={styles.fieldValue}>{person.Phone}</Text>
          </Card>
          <Card style={styles.fieldCard}>
            <Text style={styles.attribName}>street</Text>
            <Text style={styles.fieldValue}>{person.Address.Street}</Text>
          </Card>
          <View style={styles.fieldsRow}>
            <View style={styles.city}>
              <Card>
                <Text style={styles.attribName}>city</Text>
                <Text style={styles.fieldValue}>{person.Address.City}</Text>
              </Card>
            </View>
            <View style={styles.state}>
              <Card>
                <Text style={styles.attribName}>state</Text>
                <Text style={styles.fieldValue}>{person.Address.State}</Text>
              </Card>
            </View>
          </View>
          <View style={styles.fieldsRow}>
            <View style={styles.zipCode}>
              <Card>
                <Text style={styles.attribName}>zip code</Text>
                <Text style={styles.fieldValue}>{person.Address.Zip}</Text>
              </Card>
            </View>
            <View style={styles.country}>
              <Card>
                <Text style={styles.attribName}>country</Text>
                <Text style={styles.fieldValue}>{person.Address.Country}</Text>
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
                  navigation.navigate("Edit Contact", {
                    itemId: person.Id,
                    departments: departments,
                  })
                }
              />
            </View>
          </View>
          <ModalConfirmDelete
            visible={modalVisible}
            onCancelAction={() => setModalVisible(!modalVisible)}
            onConfirmDelete={Delete}
            itemName={person.Name}
          />
        </View>
      )}
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
