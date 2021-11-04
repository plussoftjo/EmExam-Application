import UserType from './UserType'

export const setUser = (item) => {
  return {
    type:UserType.SET_USER,
    payload:item
  }
}

export const setUserResults = (item) => {
  return {
    type:UserType.SET_USER_RESULTS,
    payload:item
  }
}