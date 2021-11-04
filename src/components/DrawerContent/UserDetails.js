import React from "react";

/** Components */
import { View } from "react-native";
import { Icon, Text, useTheme } from "@ui-kitten/components";

export default ({ user }) => {
  let theme = useTheme();
  return (
    <View style={{ padding: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Icon
            name="person-outline"
            style={{ width: 44, height: 44 }}
            fill={"black"}
          />
        </View>
        <View style={{ width: 10 }}></View>
        <View>
          <Text category="h4" style={{ color: theme["text-hint-color"] }}>
            {user.name}
          </Text>
          <Text category="h6" style={{ color: theme["text-hint-color"] }}>
            {user.phone}
          </Text>
        </View>
      </View>
    </View>
  );
};
