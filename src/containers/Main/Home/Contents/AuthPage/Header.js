import React, { useRef } from "react";
import { View, Animated } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";

let Header = (props) => {
  let { user } = props.user;
  let {translate} = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let FadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    FadeIn();
  }, []);
  return (
    <Animated.View
      style={{ padding: 15, paddingVertical: "10%", opacity: fadeAnim }}
    >
      <Text
        category="h1"
        style={{ fontFamily: "CairoBold", color: "white",textAlign:'left' }}
      >
        {translate("main.header")} {user.name}
      </Text>
      <Text
        category="h3"
        style={{ fontFamily: "CairoBold", color: "white",textAlign:'left' }}
      >
        {translate("main.sub_title")}
      </Text>
    </Animated.View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
