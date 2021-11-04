import React, { useRef } from "react";
import { View, Animated,Pressable } from "react-native";
import { Layout, Text, Button, useTheme, Icon } from "@ui-kitten/components";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {translate} from '../../../../translations'
let StartTheQuestions = ({ changeToQuestions,questions,navigation }) => {
  let theme = useTheme();
  let GoBox = useRef(new Animated.Value(0)).current;
  let GoBoxAnimationEnter = () => {
    Animated.timing(GoBox, {
      toValue: 1.3,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(GoBox, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1001);
  };

  let FadeText = useRef(new Animated.Value(0)).current;
  let FadeTextEnter = () => {
    Animated.timing(FadeText, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  React.useEffect(() => {
    GoBoxAnimationEnter();
    FadeTextEnter();
  }, []);
  return (
    <Layout style={{ flex: 1 }}>
      <View style={{ position: "absolute", left: 10, top: 30, zIndex: 101 }}>
      <Pressable onPress={() => {navigation.goBack()}}>
      <Icon
          name="close-circle-outline"
          fill={theme["text-primary-color"]}
          style={{ width: 40, height: 40 }}
        />
      </Pressable>
        
      </View>
      <LinearGradient // Button Linear Gradient
        colors={[theme["color-info-500"], theme["color-danger-500"]]}
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 0.9, y: 0.6 }}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Animated.Text
          style={{
            color: "white",
            fontFamily: "CairoBold",
            textAlign: "center",
            opacity:FadeText,
            fontSize:22
          }}
        >
          {translate("questions.did_you_ready")}
        </Animated.Text>
        <Animated.View style={{ transform: [{ scale: GoBox }] }}>
          <Button
            onPress={() => {
              if(questions.questions.length >= 1) {
                changeToQuestions();

              }
            }}
            style={{ width: 120, height: 120, borderRadius: 60, marginTop: 15 }}
          >
            {translate("questions.go")}
          </Button>
        </Animated.View>
      </LinearGradient>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StartTheQuestions);
