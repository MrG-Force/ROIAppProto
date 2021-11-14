import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <View>
        <Ionicons name={props.iconName} size={props.size} color={props.color} />
      </View>
    </TouchableOpacity>
  );
};

export { IconBtn };
