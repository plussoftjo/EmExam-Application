import UserType from "./UserType";

const intintalState = {
  user: {},
  auth: false,
  userResults:[]
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case UserType.SET_USER:
      return { ...state, user: action.payload, auth: true };
      case UserType.SET_USER_RESULTS:
      return { ...state, userResults: action.payload };
    default:
      return state;
  }
};

export default reducer;
