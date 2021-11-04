import React from "react";

/** Components */
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Layout, Text, useTheme, Icon } from "@ui-kitten/components";

export default ({ icon, title, onPress }) => {
  //theme
  let theme = useTheme();

  // Styles
  let styles = StyleSheet.create({
    box: {
      flexDirection: "row",
      padding: 15,
      marginLeft: 20,
      paddingLeft: 0,
      alignItems: "center",
      borderBottomColor: theme["text-hint-color"],
      borderBottomWidth: 0.5,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={styles.box}
    >
      <Icon
        name={icon}
        fill={theme["text-hint-color"]}
        style={{ width: 28, height: 28 }}
      />
      <View id="spacing" style={{ width: 15 }}></View>
      <Text category="s1">{title}</Text>
    </TouchableOpacity>
  );
};
