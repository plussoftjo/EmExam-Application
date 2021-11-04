import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
} from "@react-navigation/stack";


/** Screens */
import BottomTapNavigation from './BottomTapNavigation'
import {Questions} from '../containers/Main'

/** Stack Creator */
const Stack = createStackNavigator();

// ------- Constants -------//
import {Animations} from '../constants'

/** Render() */
export default function MainNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={Animations.screenOptions}
      headerMode="float"
      animation="fade"
      initialRouteName={"BottomTapNavigation"}
    >
     <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
     <Stack.Screen name="Questions" component={Questions} />
    </Stack.Navigator>
  );
}
