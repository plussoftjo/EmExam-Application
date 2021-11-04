/**
 * Root.js
 * Make By Ahmed Altommy
 * #Main App Bootstrap.
 */

import * as SplashScreen from "expo-splash-screen";
import * as eva from "@eva-design/eva"; //Design System

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"; // UI Application Provider
import { Platform, StatusBar, StyleSheet } from "react-native";
import { FontsLoader, LocaleLoader } from "./services";

import { EvaIconsPack } from "@ui-kitten/eva-icons"; // Icons Pack

import { Provider } from "react-redux";
import React from "react";
import Router from "./Router";
import store from "./stores/store";
import { default as mapping } from './assets/theme/mapping.json';
import { default as theme } from './assets/theme/theme.json'

export default function App(props) {
  // Constants
  const [isLoadingComplete, setLoadingComplete] = React.useState(false); // Async Loading

  // Install
  let install = async () => {
    try {
      // Splash Screen
      await SplashScreen.preventAutoHideAsync();

      // Load Fonts
      await FontsLoader();

      // Locale Loader
      await LocaleLoader();

      // End
    } catch (error) {
      // On Error
      console.log(error);
    } finally {
      // When Complete
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setLoadingComplete(true);
      }, 1000);
    }
  };

  React.useEffect(() => {
    // Call Install Function
    install();
  }, []);

  // --------------- Return -------------- //

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store} style={styles.container}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light,...theme }} customMapping={mapping}>
          <StatusBar barStyle="default" />
          <Router />
        </ApplicationProvider>
      </Provider>
    );
  }
}

// ---------- Styles --------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});