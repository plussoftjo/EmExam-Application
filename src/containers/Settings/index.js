import React, { useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  Icon,
  Button,
  useTheme,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { EditUser, Languages } from "./Components";
import { AuthContent } from "../Main/Home/Contents/NotAuth/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageToken } from "../../constants";
import { translate } from "../../translations";
let Settings = (props) => {
  let theme = useTheme();
  let { auth, user } = props.user;
  let { navigation } = props;
  let {locale} = props.settings
  let {rtl} = locale

  const editUserRef = React.useRef(null);
  const loginUserRef = React.useRef(null);
  const languageRef = React.useRef(null);
  let editUserContent = () => (
    <EditUser
      onSnap={(snap) => {
        editUserRef.current.snapTo(snap);
      }}
    />
  );

  let loginUserContent = () => (
    <AuthContent
      onInput={() => loginUserRef.current.snapTo(0)}
      onOut={() => loginUserRef.current.snapTo(1)}
      onComplete={() => loginUserRef.current.snapTo(2)}
    />
  );
  let languageContent = () => <Languages />;

  let _logOut = async () => {
    await AsyncStorage.removeItem(StorageToken.userToken);
    navigation.popToTop();
  };

  let ListView = ({ icon, title, onPress = () => {} }) => (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        borderBottomWidth: 1,
        paddingHorizontal: 5,
        borderBottomColor: "#7e7e7e",
        borderTopWidth: 1,
        borderTopColor: "#7e7e7e",
        backgroundColor: "rgba(0,0,0,0.02)",
        paddingVertical: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name={icon} style={{ width: 22, height: 22 }} fill="black" />
        <Text style={{ fontFamily: "openSansBold", fontSize: 16 }}>
          {" " + title}
        </Text>
      </View>

      <Icon
        name={rtl ? "arrow-ios-back":"arrow-ios-forward"}
        style={{ width: 22, height: 22 }}
        fill="black"
      />
    </TouchableOpacity>
  );

  return (
    <Layout style={{ flex: 1 }}>
      <LinearGradient
        // Button Linear Gradient
        colors={[theme["color-info-500"], theme["color-danger-500"]]}
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 0.9, y: 0.6 }}
        style={{ flex: 1 }}
      >
        <TopNavigation
          backgroundColor="transparent"
          title={translate("settings.settings")}
        />
        <Text
          category="h3"
          style={{ fontFamily: "CairoBold", paddingHorizontal: 5,textAlign:'left' }}
        >
          {translate("settings.user_details")}
        </Text>
        {auth && (
          <View style={{ padding: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="person"
                style={{ width: 18, height: 18 }}
                fill="black"
              />
              <Text style={{ fontSize: 16, fontFamily: "CairoBold" }}>
                {" "}
                {user.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="phone"
                style={{ width: 18, height: 18 }}
                fill="black"
              />
              <Text style={{ fontSize: 16, fontFamily: "CairoBold" }}>
                {" "}
                {user.phone}
              </Text>
            </View>
          </View>
        )}
        {auth && (
          <ListView
            title={translate("settings.user_edit.title")}
            onPress={() => {
              editUserRef.current.snapTo(1);
            }}
            icon="person-done"
          />
        )}

        {!auth && (
          <ListView
            title={translate("auth.login")}
            onPress={() => {
              loginUserRef.current.snapTo(1);
            }}
            icon="person"
          />
        )}

        <Text
          category="h3"
          style={{
            fontFamily: "CairoBold",
            marginTop: 15,
            paddingHorizontal: 5,
            textAlign:'left'
          }}
        >
          {translate("settings.settings")}
        </Text>
        <ListView
          title={translate("settings.languages")}
          onPress={() => {
            languageRef.current.snapTo(1);
          }}
          icon="globe"
        />
        {auth && (
          <ListView
            title={translate("settings.logout")}
            onPress={() => {
              _logOut();
            }}
            icon="person-delete"
          />
        )}
        <BottomSheet
          ref={editUserRef}
          initialSnap={2}
          snapPoints={[550, 550, 0]}
          borderRadius={15}
          renderContent={editUserContent}
        />
        <BottomSheet
          ref={loginUserRef}
          initialSnap={2}
          snapPoints={[550, 550, 0]}
          borderRadius={15}
          renderContent={loginUserContent}
        />
        <BottomSheet
          ref={languageRef}
          initialSnap={2}
          snapPoints={[550, 550, 0]}
          borderRadius={15}
          renderContent={languageContent}
        />
      </LinearGradient>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    settings:state.settings
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
