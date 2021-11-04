import React from "react";
import { View, Pressable, Keyboard } from "react-native";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Services
import { apis } from "../../../../../services";
import { StorageToken } from "../../../../../constants";
import { UserActions } from "../../../../../stores";
import { translate } from "../../../../../translations";
let AuthContent = (props) => {
  let { setUser, onComplete, onInput, onOut } = props;
  let [model, setModel] = React.useState("login");
  let [data, setData] = React.useState({
    name: "",
    phone: "",
    password: "",
  });

  let _Login = () => {
    apis.auth.login(
      data,
      async (res) => {
        await AsyncStorage.setItem(StorageToken.userToken, res.token);
        setUser(res.user);
        Keyboard.dismiss();
        onComplete();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  let _Register = () => {
    apis.auth.register(
      data,
      async (res) => {
        await AsyncStorage.setItem(StorageToken.userToken, res.token);
        setUser(res.user);
        Keyboard.dismiss();
        onComplete();
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ backgroundColor: "white", padding: 16, height: 450 }}
    >
      {model == "login" && <Text category="h1" style={{textAlign:'left'}}>{translate("auth.login")}</Text>}
      {model == "register" && (
        <Text category="h1" style={{textAlign:'left'}}>{translate("auth.register")}</Text>
      )}
      <View style={{ paddingTop: 16 }}>
        {model == "register" && (
          <Input
            onBlur={() => {
              onOut();
            }}
            onFocus={() => {
              onInput();
            }}
            value={data.name}
            onChangeText={(val) => setData({ ...data, name: val })}
            label={translate("auth.name")}
          />
        )}
        <Input
          label={translate("auth.phone")}
          onBlur={() => {
            onOut();
          }}
          onFocus={() => {
            onInput();
          }}
          value={data.phone}
          keyboardType={"phone-pad"}
          onChangeText={(val) => setData({ ...data, phone: val })}
        />
        <Input
          label={translate("auth.password")}
          onBlur={() => {
            onOut();
          }}
          onFocus={() => {
            onInput();
          }}
          value={data.password}
          onChangeText={(val) => setData({ ...data, password: val })}
          secureTextEntry={true}
        />

        <View style={{ paddingTop: 16 }}>
          {model == "login" && (
            <Button status="info" onPress={_Login}>
              {translate("auth.login")}
            </Button>
          )}
          {model == "register" && (
            <Button status="info" onPress={_Register}>
              {translate("auth.register")}
            </Button>
          )}
        </View>
      </View>
      <View style={{ paddingTop: 30 }}>
        {model == "login" && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{translate("auth.do_not_have_account")}</Text>
            <Pressable
              onPress={() => {
                setModel("register");
              }}
            >
              <Text style={{ fontFamily: "CairoBold" }}>
                {" "}
                {translate("auth.register")}
              </Text>
            </Pressable>
          </View>
        )}
        {model == "register" && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{translate("auth.have_account")}</Text>
            <Pressable
              onPress={() => {
                setModel("login");
              }}
            >
              <Text style={{ fontFamily: "CairoBold" }}>
                {" "}
                {translate("auth.login")}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContent);
