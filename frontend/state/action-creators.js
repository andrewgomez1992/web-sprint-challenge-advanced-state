import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
  LOADING,
  ERROR
} from "./action-types"
import axios from "axios"
// import './reducer'



// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  console.log("action creator working for clockwise")
  return { type: MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  console.log("action creator working for counter clockwise")
  return { type: MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer }
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(quizData) {
  return { type: SET_QUIZ_INTO_STATE, payload: quizData }
}

export function inputChange({ inputId: e, value: t }) {
  return { type: INPUT_CHANGE, payload: { inputId: e, value: t } }
}

export function resetForm() {
  return { type: RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        debugger
      })
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
