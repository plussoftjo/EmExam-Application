import QuestionsType from "./QuestionsType";

export const setQuestions = (item) => {
  return {
    type: QuestionsType.SET_QUESTIONS,
    payload: item,
  };
};

export const setSelectedIndex = (item) => {
  return {
    type: QuestionsType.SET_SELECTED_INDEX,
    payload: item,
  };
};


export const setQuestion = (item) => {
  return {
    type: QuestionsType.SET_QUESTION,
    payload: item,
  };
};


export const setAnswersLogs = (item) => {
  return {
    type: QuestionsType.SET_ANSWERS_LOGS,
    payload: item,
  };
};
