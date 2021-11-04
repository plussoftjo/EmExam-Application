import QuestionsType from "./QuestionsType";

const intintalState = {
  questions: [],
  question:{},
  selectedIndex: 0,
  answersLogs:[]
  
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case QuestionsType.SET_QUESTIONS:
      return { ...state, questions: action.payload, selectedIndex: 0,question:action.payload[0] };
    case QuestionsType.SET_SELECTED_INDEX:
      return { ...state, selectedIndex: action.payload };
      case QuestionsType.SET_QUESTION:
      return { ...state, question: action.payload };
      case QuestionsType.SET_ANSWERS_LOGS:
      return { ...state, answersLogs: action.payload };
    default:
      return state;
  }
};

export default reducer;
