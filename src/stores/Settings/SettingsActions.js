import SettingsType from './SettingsType';



export const setLocale = (item) => {
  return {
    type:SettingsType.SET_LOCALE,
    payload:item
  }
}

export const setCategories = (item) => {
  return {
    type:SettingsType.SET_CATEGORIES,
    payload:item
  }
}

export const setCategory = (item) => {
  return {
    type:SettingsType.SET_CATEGORY,
    payload:item
  }
}