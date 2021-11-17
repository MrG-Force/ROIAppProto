import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UpDownCaret({ style }) {
  return (
    <View style={[style, styles.container]}>
      <Ionicons name="caret-up" size={20} color="#757575" />
      <Ionicons name="caret-down" size={20} color="#757575" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    justifyContent: "center",
    //--- debug ---
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
});
