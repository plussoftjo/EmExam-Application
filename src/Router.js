/**
 * Router.js
 * Make By Ahmed Altommy
 * #Main Navigation Handler.
 */

import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { Animations } from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

// Navigation Screens
import {Loading} from './containers'
import MainNavigation from './navigation/MainNavigation'

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={Animations.screenOptionsHome}
        initialRouteName={"Loading"}
        headerMode="float"
        animation="fade"
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="MainNavigation" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
