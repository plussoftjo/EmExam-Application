import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@ui-kitten/components";

import { connect } from "react-redux";

import { Main, ResultsHistory,Settings } from "../containers";

const Tab = createBottomTabNavigator();

let BottomTapNavigation = (props) => {
  let theme = useTheme();
  let { auth } = props.user;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "tablet" : "tablet";
          } else if (route.name === "ResultsHistory") {
            iconName = focused ? "globe" : "globe";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings";
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                borderBottomColor: color,
                borderBottomWidth: focused ? 2 : 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme["color-primary-500"],
        inactiveTintColor: "gray",
        showLabel: false,
      }}
      initialRouteName={"Home"}
    >
      <Tab.Screen name="Home" component={Main.Home} />
      {auth && <Tab.Screen name="ResultsHistory" component={ResultsHistory} />}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomTapNavigation);
