/** LocaleLoader */

import React from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { setI18nConfig, SetFirstTime } from '../translations';

// Constants
import {StorageToken} from '../constants'

async function LocaleLoader() {
        /* Load Locale and translation from storage  */
        const locale = await AsyncStorage.getItem(StorageToken.localeToken);
        // Check If the first time is load
        if (!locale) {
            // Set it to english if the first time
            SetFirstTime("ar", true);
        } else {
            if (locale == "en") {
                await SetFirstTime("en", false);
            } else if (locale == "ar") {
               await setI18nConfig("ar", true);
            }
        }

        return 'Done';
}

export default LocaleLoader;