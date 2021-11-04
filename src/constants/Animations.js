import { Easing } from "react-native";
import { CardStyleInterpolators} from "@react-navigation/stack";

let Animations = {
  screenOptions: {
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    transitionSpec: {
      open: {
        animation: "spring",
        config: {
          stiffness: 1000,
          damping: 300,
          mass: 3,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        },
      },
      close: {
        animation: "timing",
        config: {
          duration: 100,
          easing: Easing.linear,
        },
      },
    },
  },
  screenOptionsHome:{
    headerShown: false,
    gestureEnabled: false,
    gestureDirection: "horizontal",
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    transitionSpec: {
      open: {
        animation: "spring",
        config: {
          stiffness: 1000,
          damping: 300,
          mass: 3,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        },
      },
      close: {
        animation: "timing",
        config: {
          duration: 100,
          easing: Easing.linear,
        },
      },
    },
  }
};

export default Animations;