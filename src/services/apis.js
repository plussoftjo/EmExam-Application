import axios from "axios";
import { env } from "../constants";

let apis = {
  auth:{
      login(data,onSuccess,onError){
          axios.post(env.server + 'auth/login',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
      register(data,onSuccess,onError){
        axios.post(env.server + 'auth/register',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
      auth(token,onSuccess,onError) {
        axios
        .get(env.server + "auth/auth", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
      },
      update(data,onSuccess,onError){
        axios.post(env.server + 'auth/update',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
  },
  main:{
    index(onSuccess,onError) {
      axios.get(env.server + 'main/index').then((res) => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    indexWithAuth(user_id,onSuccess,onError) {
      axios.get(env.server + 'main/index_with_auth/' +user_id).then((res) => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    StoreNotificationToken(data,onSuccess,onError) {
      axios.post(env.server + 'main/store_notification_token',data).then((res) => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    }
  },
  questions:{
    index(CategoryID,onSuccess,onError) {
      axios.get(env.server + 'main/index/questions/' + CategoryID).then((res) => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    storeUserResults(data,onSuccess,onError) {
      axios.post(env.server + 'auth/store/results',data).then((res) => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    }
  }
};

export default apis;
