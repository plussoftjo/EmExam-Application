import React,{useRef} from "react";
import { View, Animated } from "react-native";

export default (props) => {
  return (
        <View>
            <View style={{ padding: 15 }}>{props.children}</View>
        </View>
  );
};
