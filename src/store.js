import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import logger from "redux-logger";

const TOKEN = "token";
//////////////////////////////////// ACTION TYPES below:

const LOAD_GOLFERS = "LOAD_GOLFERS";
const LOAD_PARTS = "LOAD_PARTS";
const UPDATE_PART = "UPDATE_PART";
const SET_PART = "SET_PART";
const ADD_PART = "ADD_PART";

//////////////////////////////////// ACTION CREATORS below:

const _loadGolfers = (golfers) => {
  return { type: LOAD_GOLFERS, golfers };
};

const _loadParts = (parts) => {
  return { type: LOAD_PARTS, parts };
};

const _updatePart = (part) => {
  return { type: UPDATE_PART, part };
};

const _addPart = (part) => {
  return { type: ADD_PART, part };
};

export const setPart = (part) => ({ type: SET_PART, part });

//////////////////////////////////// THUNKS below:

const loadGolfers = () => {
  return async (dispatch) => {
    const golfers = (await axios.get("/api/golfers")).data;
    dispatch(_loadGolfers(golfers));
  };
};

const loadParts = () => {
  return async (dispatch) => {
    const parts = (await axios.get("/api/participants")).data;
    dispatch(_loadParts(parts));
  };
};

export const updatePart = (part, history) => {
  return async (dispatch) => {
    part = (await axios.put(`/api/participants/${part.id}`, part)).data;
    dispatch(_updatePart(part));
    history.push("/my_picks");
  };
};

export const addPart = (part) => {
  return async (dispatch) => {
    part = (await axios.post("/api/add/auth", part)).data;
    dispatch(_addPart(part));
  };
};

export const init = () => {
  return async (dispatch) => {
    dispatch(loadGolfers());
    dispatch(loadParts());
  };
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);

  if (token) {
    const response = await axios.get("/oauth/token", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setPart(response.data));
  }
};

export const authenticate = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("oauth/authorize", { email, password });
    const { token } = response.data;
    window.localStorage.setItem(TOKEN, token);
    return dispatch(me());
  } catch (authError) {
    return dispatch(setPart({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  return {
    type: SET_PART,
    part: {},
  };
};

//////////////////////////////////// REDUCERS below:

const golfers = (state = [], action) => {
  switch (action.type) {
    case LOAD_GOLFERS:
      return action.golfers;
    default:
      return state;
  }
};

const participants = (state = [], action) => {
  switch (action.type) {
    case LOAD_PARTS:
      return action.parts;
    case ADD_PART:
      return [...state, action.part];
    default:
      return state;
  }
};

const part = (state = {}, action) => {
  switch (action.type) {
    case SET_PART:
      return action.part;
    default:
      return state;
  }
};

const reducer = combineReducers({
  golfers,
  participants,
  part,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export * from "./funcs";
