import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const IconBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View>
        <Ionicons name={props.iconName} size={props.size} color={props.color} />
      </View>
    </TouchableOpacity>
  );
};

const ComposedIconBtn = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.compButton, props.style]}
    >
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={props.iconName}
          size={props.size}
          color={props.color}
        />
        <View>
          <Text>{props.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export { IconBtn, ComposedIconBtn };

const styles = StyleSheet.create({
  compButton: {
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
});
