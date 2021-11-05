import React, { useRef } from "react";
import { View, Animated } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
// Stores
import { QuestionsActions } from "../../../../stores";
import { Ads } from "../../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { translate } from "../../../../translations";
import { AdMobInterstitial } from "expo-ads-admob";
import * as FacebookAds from "expo-ads-facebook";
import { Platform } from "react-native";

// FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash);
FacebookAds.AdSettings.setAdvertiserTrackingEnabled(true);
let QuestionsShow = (props) => {
  let theme = useTheme();
  let { questions, question, selectedIndex, answersLogs } = props.questions;
  let { setSelectedIndex, setQuestion, changeToResults, setAnswersLogs } =
    props;
  let [correctAnswer, setCorrectAnswer] = React.useState(null);
  let [notCorrectAnswer, setNotCorrectAnswer] = React.useState(null);
  let [adsShow, setAdsShow] = React.useState(2);

  // let _showAds = async () => {
  //   await AdMobInterstitial.setAdUnitID(Platform.OS == 'android' ? Ads.android.QuestionsAds : Ads.ios.QuestionsAds); // Test ID, Replace with your-admob-unit-id
  //   await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  //   await AdMobInterstitial.showAdAsync();
  // }

  let checkPermission = async () => {
    await FacebookAds.AdSettings.requestPermissionsAsync();
  };
  React.useEffect(() => {
    checkPermission();
  }, []);
  let _showAds = async () => {
    // FacebookAds.InterstitialAdManager.showAd(
    //   Platform.OS == "android" ? Ads.android.QuestionsAds : Ads.ios.QuestionsAds
    // )
    //   .then((didClick) => {
    //     console.log(didClick);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    FacebookAds.InterstitialAdManager.showAd(
      "1970270336481309_1971966639645012"
    )
      .then((didClick) => {
        console.log(didClick);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let NextQuestion = () => {
    _showAds();
    if (adsShow == 0) {
      _showAds();
      setAdsShow(6);
    } else {
      setAdsShow(adsShow - 1);
    }
    AnimationHideQuestionDo("hide");
    setCorrectAnswer(null);
    setNotCorrectAnswer(null);
    let _length = questions.length - 1;
    if (selectedIndex == _length) {
      changeToResults();
    } else {
      AnimationQuestionColorEnter("hide");
      AnimationHideQuestionDo("enter");

      let _selectedIndex = selectedIndex + 1;
      setSelectedIndex(_selectedIndex);
      setQuestion(questions[_selectedIndex]);
    }
  };
  let CheckAnswer = (answer, index) => {
    AnimationQuestionColorEnter("enter");
    if (answer.correct) {
      // If The Correct Answer
      setCorrectAnswer(index);
      setNotCorrectAnswer(null);
    } else {
      setNotCorrectAnswer(index);
      question.answers.forEach((trg, index) => {
        if (trg.correct) {
          setCorrectAnswer(index);
        }
      });
    }
    let _answerWithQuestion = {
      ...question,
      answer: answer,
    };
    setAnswersLogs([...answersLogs, _answerWithQuestion]);
    setTimeout(() => {
      NextQuestion();
    }, 1500);
  };

  let _GetBackgroundColor = (index) => {
    if (correctAnswer == index) {
      return theme["color-success-600"];
    } else if (notCorrectAnswer == index) {
      return "#ff4444";
    } else {
      return "transparent";
    }
  };

  let AnimationQuestionColor = useRef(new Animated.Value(0)).current;
  let AnimationQuestionColorEnter = (type) => {
    if (type == "enter") {
      Animated.timing(AnimationQuestionColor, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(AnimationQuestionColor, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  let AnimationHideQuestion = useRef(new Animated.Value(1)).current;
  let AnimationHideQuestionDo = (type) => {
    if (type == "enter") {
      Animated.timing(AnimationHideQuestion, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(AnimationHideQuestion, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Layout style={{ flex: 1 }}>
      <LinearGradient
        // Button Linear Gradient
        colors={[theme["color-info-500"], theme["color-danger-500"]]}
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 0.9, y: 0.6 }}
        style={{ flex: 1, flexDirection: "column" }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            category="h4"
            style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
          >
            {translate("questions.level")} {selectedIndex + 1}
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            backgroundColor: "white",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            borderColor: "#7f7f7f",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              paddingBottom: 15,
              borderBottomColor: "#7e7e7e",
              borderBottomWidth: 0.5,
              padding: 20,
              marginBottom: 30,
              backgroundColor: "rgba(220,0,0,.06)",
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
          >
            <Animated.Text
              style={{
                fontSize: 16,
                fontFamily: "CairoBold",
                opacity: AnimationHideQuestion,
                textAlign: "left",
              }}
            >
              {question.title}
            </Animated.Text>
          </View>
          {question.answers.map((trg, index) => (
            <TouchableOpacity
              onPress={() => {
                CheckAnswer(trg, index);
              }}
              key={index}
              style={{ paddingVertical: 3 }}
            >
              <Animated.View
                style={{
                  backgroundColor: _GetBackgroundColor(index),
                  position: "absolute",
                  left: 0,
                  height: 0,
                  width: "100%",
                  height: "100%",
                  transform: [{ scaleX: AnimationQuestionColor }],
                }}
              ></Animated.View>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#7223",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    marginRight: 10,
                    borderRadius: 5,
                    borderColor:
                      _GetBackgroundColor(index) == "transparent"
                        ? "black"
                        : "white",
                    borderWidth: 0.5,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "CairoBold",
                    color:
                      _GetBackgroundColor(index) == "transparent"
                        ? "black"
                        : "white",
                  }}
                >
                  {trg.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <View
            style={{
              position: "absolute",
              left: 0,
              paddingHorizontal: 10,
              bottom: 10,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => {
                changeToResults();
              }}
              status="primary"
              size="small"
              style={{ width: "100%" }}
            >
              {translate("questions.end")}
            </Button>
          </View>
        </View>
      </LinearGradient>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedIndex: (item) =>
      dispatch(QuestionsActions.setSelectedIndex(item)),
    setQuestion: (item) => dispatch(QuestionsActions.setQuestion(item)),
    setAnswersLogs: (item) => dispatch(QuestionsActions.setAnswersLogs(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsShow);
