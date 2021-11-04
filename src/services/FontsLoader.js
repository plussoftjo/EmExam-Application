/** FontLoader */

import React from 'react';

import * as Font from "expo-font"; // Expo Fonts
import { Ionicons } from "@expo/vector-icons"; // Vector Icons Register

let FontsLoader = async () => {
    async function InstallFonts() {
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../../assets/fonts/SpaceMono-Regular.ttf"),
          "OpenSans":require("../../assets/fonts/OpenSans-Regular.ttf"),
          "openSansBold":require("../../assets/fonts/OpenSans-Bold.ttf"),
          "Cairo":require('../../assets/fonts/Cairo-Regular.ttf'),
          "CairoBold":require('../../assets/fonts/Cairo-Bold.ttf')
        });
    }

    // Call Function
    await InstallFonts();
}

export default FontsLoader;