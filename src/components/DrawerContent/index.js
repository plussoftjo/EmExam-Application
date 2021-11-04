import * as React from "react";

import { View, Image,Linking,TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTheme, Text } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

import UserDetails from './UserDetails'
import SettingsList from './SettingsList'
import {translate} from '../../translations'
import {setLogout} from '../../stores'
const DrawerContent = (props) => {
  let theme = useTheme();

  let {auth,user} = props.user;
  let {lang,rtl} = props.locale

  let sign_out = async () => {
    try {
      await AsyncStorage.removeItem("@blueberry_client_token");
      props.setLogout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ paddingTop: 0, marginTop: 0, backgroundColor: "#f4f9ff" }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f9ff",
        }}
      >
        <Image
          source={require("../../assets/logo/logo.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
      </View>
      {auth && (
        <View>
          <UserDetails user={user} />
          <SettingsList
            onPress={() => {
              props.navigation.navigate("MyOrders");
            }}
            icon="book-outline"
            title="Coins"
          />
        </View>
      )}
      {!auth && (
        <View>
          <SettingsList
            onPress={() => {
              props.navigation.navigate("Auth");
            }}
            icon="person"
            title="Login"
          />
        </View>
      )}
      <SettingsList
        onPress={() => {
          props.navigation.navigate("Language");
        }}
        icon="file-text-outline"
        title="Language"
      />
      {auth && (
        <SettingsList
          icon="log-out-outline"
          title={"Logout"}
          onPress={() => {
            sign_out();
          }}
        />
      )}
     
    </DrawerContentScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    user:state.user,
    locale:state.settings.locale
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLogout:() => dispatch(setLogout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
