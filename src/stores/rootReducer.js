import UserReducers from './User/UserReducers'
import SettingsReducers from './Settings/SettingsReducers'
import QuestionsReducers from './Questions/QuestionsReducers'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  user: UserReducers,
  settings:SettingsReducers,
  questions:QuestionsReducers
});

export default rootReducer;