// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      {
        const t = state + 1
        return t > 5 ? 0 : t
      }
    case MOVE_COUNTERCLOCKWISE:
      {
        const t = state - 1;
        return t < 0 ? 5 : t
      }
    default:
      return state
  }
}

const initialQuizState = {
  quiz_id: '',
  question: '',
  answers: '',
  selectedAnswer: ''
}
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      console.log(action.payload);
      return {
        quiz_id: action.payload.quiz_id,
        question: action.payload.question,
        answers: action.payload.answers,
        selectedAnswer: action.payload.selectedAnswer


      }
        ;
    default:
      return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      console.log("reducer for selected answer with payload: ", action.payload);
      console.log(state);
      return action.payload;
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      console.log(state, action.payload);
      return action.payload.message;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case RESET_FORM:
      console.log("reset form");
      return {
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: ''
      }

    case INPUT_CHANGE:

      console.log("Input change: ", action.payload);

      return action.payload;




    default:
      console.log("default");
      return state;
  }

}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })