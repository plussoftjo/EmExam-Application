import React,{useRef,useState} from "react";
import { connect } from "react-redux";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {StorageToken} from '../../../../constants'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apis } from "../../../../services";
let NotificationsHandler = (props) => {
    const notificationListener = useRef();
    const responseListener = useRef();
  let _Handler = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    // await AsyncStorage.removeItem('@blueberry_app_notification_token');
    // Save Token to the Storage
    let _token_from_storage = await AsyncStorage.getItem(StorageToken.notificationToken);
    if (!_token_from_storage) {
      apis.main.StoreNotificationToken(
        {
          token: token,
        },
        async (res) => {
          await AsyncStorage.setItem(StorageToken.notificationToken, token);
        },
        (err) => {
          console.log(err.response);
        }
      );
    }

    return token;
  };

  React.useEffect(() => {
    _Handler();

      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log(notification);
        }
      );

      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(response);
        }
      );
  }, []);
  return <></>;
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsHandler);
