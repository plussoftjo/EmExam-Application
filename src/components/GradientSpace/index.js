import React from 'react';
import {View,} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
// Constants
import {Models,colors} from '../../constants'

export default () => {
     return (
        <View style={{ position: "absolute", left: 0, top: 0, width: "100%", }}>
        <LinearGradient
        style={{ width: Models.window.width, height: Models.window.height }}
        colors={[colors.mauve4, colors.celeste]}
        ></LinearGradient>
        </View>
     )
}