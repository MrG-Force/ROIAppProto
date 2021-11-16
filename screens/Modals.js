import React from "react";
import { View, StyleSheet, Text, Modal, Pressable, Alert } from "react-native";

const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

const ModalConfirmDelete = ({
  visible,
  onCancelAction,
  onConfirmDelete,
  itemName,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Are you sure you want to delete <B>{itemName}</B> from
            <B> Contacts</B>? {"\n"}This action is irreversible.
          </Text>
          <View style={styles.modalRow}>
            <Pressable
              style={[styles.modButton, styles.buttonCancel]}
              onPress={onCancelAction}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.modButton, styles.buttonProceed]}
              onPress={onConfirmDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export { ModalConfirmDelete };
