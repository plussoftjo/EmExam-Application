import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, CheckBox,useTheme } from "@ui-kitten/components";
import { connect } from "react-redux";
import { changeLanguage, translate } from "../../../translations";
let Languages = (props) => {
  let { user } = props.user;
  let theme = useTheme()
  let { locale } = props.settings;
  let [inx, setInx] = React.useState(0);
  React.useEffect(() => {
    let lang = locale.lang;
    if (lang == "en") {
      setInx(0);
    } else if (lang == "ar") {
      setInx(1);
    }
  }, []);
  return (
    <View style={{ backgroundColor: "white", padding: 16, height: 550 }}>
      <Text category="h3" style={{textAlign:'left'}}>{translate("settings.select_language")}</Text>
      <TouchableOpacity
        onPress={() => {
          if (inx !== 0) {
            changeLanguage("en", false);
          }
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomColor: "#7e7e7e",
          borderBottomWidth: 0.5,
        }}
      >
        <CheckBox status="success" checked={inx == 0 ? true : false} />
        <View style={{ width: 15 }}></View>
        <Text category="h5">English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (inx !== 1) {
            changeLanguage("ar", true);
          }
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomColor: "#7e7e7e",
          borderBottomWidth: 0.5,
        }}
      >
        <CheckBox status="success" checked={inx == 1 ? true : false} />
        <View style={{ width: 15 }}></View>
        <Text category="h5">العربية</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
