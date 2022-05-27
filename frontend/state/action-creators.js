// ❗ You don't need to add extra action creators to achieve MVP
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

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(questionNumber) {
  return { type: SET_SELECTED_ANSWER, payload: questionNumber };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz() { }

export function inputChange(newValue) {
  console.log(newValue);
  return { type: INPUT_CHANGE, payload: newValue };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    console.log("dispatch by thunk");

    dispatch({
      type: SET_QUIZ_INTO_STATE,
      payload: { quiz_id: null, question: null, answers: null },
    });
    fetch("http://localhost:9000/api/quiz/next")
      .then((response) => response.json())
      .then((quiz) => {
        console.log(quiz);
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: quiz });
      })
      .catch((err) => console.error(err));
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    fetch("http://localhost:9000/api/quiz/answer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quiz_id,
        answer_id,
      }),
    })
      .then((response) => response.json())
      .then((message) => {
        dispatch({ type: SET_INFO_MESSAGE, payload: message });
        dispatch({ type: SET_SELECTED_ANSWER, payload: null });
        dispatch({
          type: SET_QUIZ_INTO_STATE,
          payload: {
            quiz_id: "",
            question: "",
            answers: "",
            selectedAnswer: "",
          },
        });
        fetch("http://localhost:9000/api/quiz/next")
          .then((response) => response.json())
          .then((quiz) => {
            console.log(quiz);
            dispatch({ type: SET_QUIZ_INTO_STATE, payload: quiz });
          })
          .catch((err) => console.error(err));
      })

      .catch((err) => console.error(err));
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz(question_text, true_answer_text, false_answer_text) {
  return function (dispatch) {
    fetch("http://localhost:9000/api/quiz/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question_text,
        true_answer_text,
        false_answer_text
      }),
    })
      .then((response) => response.json())
      .then((message) => {
        dispatch({ type: SET_INFO_MESSAGE, payload: { message: `Congrats: "${message.question}" is a great question!` } });
        dispatch({ type: RESET_FORM });

      })

    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state