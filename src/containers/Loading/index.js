import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

// Constants
import { StorageToken, Faker, env } from "../../constants";

// Services
import { apis, LocaleLoader, FontsLoader } from "../../services";

// Stores
import { connect } from "react-redux";
import { UserActions, SettingsActions } from "../../stores";

let Loading = (props) => {
  let {
    setLocale, // Set Locale Language
    navigation,
    setCategories,
    setUser,
    setUserResults,
  } = props;
  const isFocused = useIsFocused();
  /**
   *
   * @checker {Checker is about check the things inside our app}
   */

  let InstallAssetsWithOutAuth = () => {
    console.log("Assets");
    console.log(env.server);

    apis.main.index(
      (res) => {
        setCategories(res.categories);
        navigation.navigate("MainNavigation");
      },
      (err) => console.log(err)
    );
  };

  let InstallAssetsWithAuth = (id) => {
    apis.main.indexWithAuth(
      id,
      (res) => {
        setCategories(res.categories);
        setUserResults(res.userResults);
        navigation.navigate("MainNavigation");
      },
      (err) => console.log(err)
    );
  };

  let checker = async () => {
    await LocaleLoader();
    await FontsLoader();

    let _locale = await AsyncStorage.getItem(StorageToken.localeToken);
    if (!_locale) {
      setLocale({
        lang: "ar",
        rtl: true,
      });
    } else {
      if (_locale == "en") {
        setLocale({
          lang: "en",
          rtl: false,
        });
      } else if (_locale == "ar") {
        setLocale({
          lang: "ar",
          rtl: true,
        });
      }
    }

    // Navigation
    let _userToken = await AsyncStorage.getItem(StorageToken.userToken);
    if (!_userToken) {
      // If Not Auth Navigation to auth
      InstallAssetsWithOutAuth();
      return;
    }
    // If Auth @setUser in the stores
    let _token = "Bearer " + _userToken;
    apis.auth.auth(
      _token,
      (res) => {
        setUser(res.user);
        InstallAssetsWithAuth(res.user.ID);
      },
      (err) => {
        console.log(err);
        InstallAssetsWithOutAuth();
      }
    );
  };

  // UseEffect
  useEffect(() => {
    checker();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/backgrounds/loading.png")}
    >
      <Image
        source={require("../../assets/logo/raccoon.png")}
        style={styles.imageCard}
        resizeMode="contain"
      />
      <View style={styles.pt30}>
        <Spinner status="basic" />
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
    setLocale: (item) => dispatch(SettingsActions.setLocale(item)),
    setCategories: (item) => dispatch(SettingsActions.setCategories(item)),
    setUserResults: (item) => dispatch(UserActions.setUserResults(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
