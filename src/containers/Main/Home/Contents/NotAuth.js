import React, { useRef } from "react";
import { View, Platform, TouchableOpacity, Animated } from "react-native";
import { Layout, Text, Button, useTheme } from "@ui-kitten/components";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { SettingsActions } from "../../../../stores";
import { Header, AuthContent } from "./NotAuth/index.js";
import BottomSheet from "reanimated-bottom-sheet";
import { translate } from "../../../../translations";
import { NotificationHandler } from "../Components";
let NotAuth = (props) => {
  /**
   * Props
   */
  let { navigation, setCategory } = props;
  let { categories } = props.settings;
  let [selectedIndex, setSelectedIndex] = React.useState(0);
  const sheetRef = React.useRef(null);
  let theme = useTheme();

  /**
   * Methods
   */
  let StartTheQuestions = () => {
    setCategory(categories[selectedIndex]);
    navigation.navigate("Questions");
  };

  let authContent = () => (
    <AuthContent
      onInput={() => sheetRef.current.snapTo(0)}
      onOut={() => sheetRef.current.snapTo(1)}
      onComplete={() => sheetRef.current.snapTo(2)}
    />
  );

  /**
   * Content Animations ForCategories
   */
  let CategoriesBox = useRef(new Animated.Value(-500)).current;
  let CategoriesBoxEnter = () => {
    Animated.timing(CategoriesBox, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  let StartBox = useRef(new Animated.Value(0.5)).current;
  let StartBoxEnter = () => {
    Animated.timing(StartBox, {
      toValue: 1.1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(StartBox, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1001);
  };

  let Content = () => (
    <View style={{ paddingTop: 5, paddingHorizontal: 15 }}>
      <Text
        category="h5"
        style={{ color: theme["color-info-700"], textAlign: "left" }}
      >
        {translate("main.select_type")}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
          flexWrap: "wrap",
        }}
      >
        {categories.map((category, index) => (
          <Animated.View
            key={index}
            style={{
              transform: [{ translateX: CategoriesBox }],
              width: "45%",
              marginTop: 1,
              paddingVertical: 5,
              marginHorizontal: 5,
              borderRadius: 10,
              borderColor: theme["color-info-500"],
              borderWidth: 1,
              backgroundColor:
                selectedIndex == index
                  ? theme["color-info-600"]
                  : theme["color-info-400"],
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(index);
              }}
              style={{ width: "100%" }}
            >
              <Text
                category="s1"
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "CairoBold",
                }}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.View style={{ transform: [{ scale: StartBox }] }}>
          <Button
            onPress={StartTheQuestions}
            appearance="filled"
            status="primary"
            style={{ height: 100, width: 100, borderRadius: 50 }}
          >
            {translate("main.start")}
          </Button>
        </Animated.View>
      </View>
    </View>
  );

  let loginContentAnimation = useRef(new Animated.Value(0)).current;
  let loginContentAnimationEnter = () => {
    Animated.timing(loginContentAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  let LoginContent = () => (
    <Animated.View style={{ padding: 15, opacity: loginContentAnimation }}>
      <Text
        category="h5"
        style={{ color: theme["color-info-700"], textAlign: "left" }}
      >
        {translate("main.do_you_want_register")}
      </Text>
      <View
        style={{
          paddingTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 4 }}>
          <Button
            status="info"
            size="small"
            onPress={() => sheetRef.current.snapTo(1)}
          >
            {translate("auth.login")}
          </Button>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </Animated.View>
  );

  React.useEffect(() => {
    CategoriesBoxEnter();
    StartBoxEnter();
    loginContentAnimationEnter();
  }, []);
  return (
    <Layout style={{ flex: 1 }}>
      <LinearGradient
        // Button Linear Gradient
        colors={[theme["color-info-500"], theme["color-danger-500"]]}
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 0.9, y: 0.6 }}
        style={{ flex: 1 }}
      >
        <Header translate={translate} />
        <Content />
        <LoginContent />
        <BottomSheet
          ref={sheetRef}
          initialSnap={2}
          snapPoints={[550, 450, 0]}
          borderRadius={15}
          renderContent={authContent}
        />
        {Platform.OS !== "web" && <NotificationHandler />}
      </LinearGradient>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategory: (item) => dispatch(SettingsActions.setCategory(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotAuth);
