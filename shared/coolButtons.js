import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Pressable,
} from "react-native";

function DeleteBtn(props) {
  return (
    <TouchableOpacity
      style={[styles.button, styles.deleteBtn]}
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Image source={require("../images/ROI_del_icon.png")} />
        <View style={{ marginTop: 10 }}>{props.children}</View>
      </View>
    </TouchableOpacity>
  );
}

const EditBtn = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.editBtn]}
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Image source={require("../images/ROI_edit_icon.png")} />
        <View style={{ marginTop: 10 }}>{props.children}</View>
      </View>
    </TouchableOpacity>
  );
};

const SaveBtn = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <View style={{ marginBottom: 15 }}>
          <Image source={require("../images/ROI_ok_icon.png")} />
        </View>
        <View>{props.children}</View>
      </View>
    </TouchableOpacity>
  );
};

const AddContactBtn = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <View>
        <Image source={require("../images/ROI_add_button.png")} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 7,
    elevation: 5,
    backgroundColor: "#ffff",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 9,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  deleteBtn: {
    shadowColor: "#941a1d",
  },
  editBtn: {
    shadowColor: "#00a79e",
  },
});

export { DeleteBtn, EditBtn, SaveBtn, AddContactBtn };
