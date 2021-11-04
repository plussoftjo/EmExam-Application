import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Layout, Text, useTheme, Icon } from "@ui-kitten/components";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
// Stores
import { QuestionsActions } from "../../../../stores";
import { apis } from "../../../../services";
import { translate } from "../../../../translations";

let Results = (props) => {
  let theme = useTheme();

  let { answersLogs } = props.questions;
  let { auth, user } = props.user;
  let [correctAnswers, setCorrectAnswers] = React.useState(0);
  let _CheckAnswers = () => {
    let _correctAnswers = 0;
    let _allAnswers = answersLogs.length;
    answersLogs.forEach((trg, index) => {
      if (trg.answer.correct) {
        _correctAnswers = _correctAnswers + 1;
      }
    });
    setCorrectAnswers(_correctAnswers);

    // Store If It Auth
    if (auth) {
      StoreUserResults(_correctAnswers);
    }
  };

  let StoreUserResults = (_correctAnswers) => {
    let _data = {
      user_id: user.ID,
      results: _correctAnswers,
      questions: answersLogs.length,
    };
    apis.questions.storeUserResults(
      _data,
      (res) => {},
      (err) => {
        console.log(err.response);
      }
    );
  };

  React.useEffect(() => {
    _CheckAnswers();

    return () => {
      props.setAnswersLogs([]);
    };
  }, []);

  let GetColors = (question, thisAnswer) => {
    let _userAnswer = question.answer;
    let _correctAnswer = null;
    question.answers.forEach((question_answer) => {
      if (question_answer.correct) {
        _correctAnswer = question_answer;
      }
    });
    if (thisAnswer.ID == _correctAnswer.ID) {
      return theme["color-success-600"];
    } else if (thisAnswer.ID == _userAnswer.ID) {
      return "#ff4444";
    }
    return "black";
  };
  return (
    <Layout style={{ flex: 1 }}>
      <View style={{ position: "absolute", right: 10, top: 30, zIndex: 101 }}>
        <Pressable
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Icon
            name="close-circle-outline"
            fill={theme["text-primary-color"]}
            style={{ width: 40, height: 40 }}
          />
        </Pressable>
      </View>
      <LinearGradient
        // Button Linear Gradient
        colors={[theme["color-info-500"], theme["color-danger-500"]]}
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 0.9, y: 0.6 }}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <ScrollView>
          <View style={{ margin: 15, marginTop: 15 }}>
            <Text style={{ fontSize: 42, color: "white", textAlign: "left" }}>
              {translate("questions.results")}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    fontFamily: "CairoBold",
                    textAlign: "left",
                  }}
                >
                  {translate("questions.correct")} :
                </Text>
              </View>
              <View style={{ marginHorizontal: 3 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    fontFamily: "CairoBold",
                    textAlign: "left",
                    color:correctAnswers == answersLogs.length ?theme['color-success-500']:theme['color-warning-500']
                  }}
                >
                  {correctAnswers}
                </Text>
              </View>
              <View style={{ marginHorizontal: 3 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    fontFamily: "CairoBold",
                    textAlign: "left",
                  }}
                >
                  من {answersLogs.length}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              borderBottomColor: "#7e7e7e",
              borderBottomWidth: 1,
            }}
          >
            <Text
              category="h3"
              style={{
                fontFamily: "openSansBold",
                color: "white",
                textAlign: "left",
              }}
            >
              {translate("questions.answers")}
            </Text>
          </View>
          {answersLogs.map((trg, index) => (
            <View key={index} style={{ paddingTop: 15 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginHorizontal: 15,
                  textAlign: "left",
                }}
              >
                {trg.title}
              </Text>
              {trg.answers.map((ans, inx) => (
                <View
                  key={ans.ID}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomColor: "#7e7e7e",
                    borderBottomWidth: 0.5,
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 0.5,
                      borderColor: "#7e7e7e",
                      marginHorizontal: 15,
                    }}
                  ></View>
                  <Text
                    category="s1"
                    style={{
                      color: GetColors(trg, ans),
                      fontSize: 16,
                      fontFamily: "openSansBold",
                      textAlign: "left",
                    }}
                  >
                    {ans.title}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAnswersLogs: (item) => dispatch(QuestionsActions.setAnswersLogs(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
