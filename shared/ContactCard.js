import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card(props) {
  return (
    <View style={[styles.card, props.style]}>
      <View>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "#ffff",
    shadowOffset: { width: 1, height: -1 },
    shadowColor: "#3b3b3b",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
});
