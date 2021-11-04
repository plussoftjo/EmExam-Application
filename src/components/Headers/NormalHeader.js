import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import Svg, { Defs, Ellipse, LinearGradient, Stop } from "react-native-svg";
import {Text} from '@ui-kitten/components'
import {AntDesign} from '@expo/vector-icons'

// Constants
import { Models, colors } from "../../constants";

export default (props) => {
  /**
   *
   * @height {ScreenHeight}
   * @width {ScreenWidth}
   * */

  return (
    <View>
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: Models.window.width,
          height: Models.header.svgHeight + 20,
        }}
      >
        <View
          style={{
            width: Models.window.width,
            height: Models.header.svgHeight + 20,
          }}
        >
          <Svg
            height={Models.header.svgHeight + 20}
            width={Models.window.width}
          >
            <Defs>
              <LinearGradient id="grad" x1="1" x2="1" y2="100%">
                <Stop
                  offset="0"
                  stopColor={colors.uraninBlue}
                  stopOpacity="1"
                />
                <Stop offset="1" stopColor={colors.mauve5} stopOpacity="1" />
              </LinearGradient>
            </Defs>
            {/* TODO: Change the handler for arabic */}
            <Ellipse
              rx={Models.window.width}
              ry={Models.header.svgHeight}
              cx={Models.header.ltrSpace}
              fill="url(#grad)"
            />
          </Svg>
        </View>
      </View>
      <View id="Content" style={{ padding: 15,height: Models.header.svgHeight }}>
        <View
          style={{
            flexDirection: "row",
            alignItems:'center'
          }}
        >
          <AntDesign name="arrowleft" color="white" size={32} />
          <Text style={{ marginHorizontal: 10,color:'white' }} category="h3">Settings</Text>
        </View>
        {props.children}
      </View>
    </View>
  );
};
