import i18n from "i18n-js";
import memoize from "lodash.memoize"; 
import {I18nManager} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

// Stores
import store from '../stores/store'
import {SettingsActions} from '../stores' 

// Constants
import {StorageToken} from '../constants'

const translationGetters = {
  ar: () => require('./ar.json'),
  en: () => require('./en.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = async(lang,isRTL) => {

  // Set lang in AsyncStorage => string 'en','ar'
  await AsyncStorage.setItem(StorageToken.localeToken, lang);
  // check if is rtl 
  I18nManager.forceRTL(isRTL);
  // Set TRanslations
  i18n.translations = { [lang]: translationGetters[lang]() };
  // Set Locale in i18n
  i18n.locale = lang;
  // Set store disppatch to locale in settings locale
  return "Done";
};

export const SetFirstTime = async (lang, isRTL) => {
  await AsyncStorage.setItem(StorageToken.localeToken, lang);
  I18nManager.forceRTL(isRTL);
  i18n.translations = { [lang]: translationGetters[lang]() };
  i18n.locale = lang;
  
   // Set store disppatch to locale in settings locale
  return 'Done';
};

export const changeLanguage = async(lang,isRTL) => {
  await AsyncStorage.setItem(StorageToken.localeToken, lang);
  I18nManager.forceRTL(isRTL);
  i18n.translations = { [lang]: translationGetters[lang]() };
  i18n.locale = lang;
   // Set store disppatch to locale in settings locale
  Updates.reloadAsync();
}