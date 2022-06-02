import { db } from "../../firebase";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions type
const LOAD = "dict/LOAD";
const CREATE = "dict/CREATE";
const UPDATE = "dict/UPDATE";
const DELETE = "dict/DELETE";
const LOADED = "dict/LOADED";
const CHANGE = "dict/CHANGE";

const initialState = {
  is_loaded: false,
  list: [],
};

// Action Creators
export function loadDict(dict_list) {
  return { type: LOAD, dict_list };
}

export function createDict(dict) {
  return { type: CREATE, dict };
}

export function updateDict(dict_index, dict) {
  return { type: UPDATE, dict_index, dict };
}

export function deleteDict(dict_index) {
  return { type: DELETE, dict_index };
}

export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}

export function changeDict(dict_index) {
  return { type: CHANGE, dict_index };
}

// middlewares

export const loadDictFB = () => {
  return async function (dispatch) {
    const dict_data = await getDocs(collection(db, "dict"));

    let dict_list = [];

    dict_data.forEach((doc) => {
      dict_list.push({ id: doc.id, ...doc.data() });
    });

    dispatch(loadDict(dict_list));
  };
};

export const createDictFB = (dict) => {
  return async function (dispatch) {
    dispatch(isLoaded(false));
    const docRef = await addDoc(collection(db, "dict"), dict);
    const _dict = await getDoc(docRef);
    const dict_data = { id: _dict.id, ..._dict.data() };

    dispatch(createDict(dict_data));
  };
};

export const updateDictFB = (dict_id, dict) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "dict", dict_id);
    await updateDoc(docRef, dict);

    const _dict_list = getState().dict.list;
    const dict_index = _dict_list.findIndex((b) => {
      return b.id === dict_id;
    });

    dispatch(updateDict(dict_index, dict));
  };
};

export const deleteDictFB = (dict_id) => {
  return async function (dispatch, getState) {
    if (!dict_id) {
      window.alert("아이디가 없네요");
      return;
    }

    const docRef = doc(db, "dict", dict_id);
    await deleteDoc(docRef);

    const _dict_list = getState().dict.list;
    const dict_index = _dict_list.findIndex((b) => {
      return b.id === dict_id;
    });
    dispatch(deleteDict(dict_index));
  };
};

export const changeDictFB = (dict_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "dict", dict_id);
    await updateDoc(docRef, { completed: true });

    const _dict_list = getState().dict.list;
    const dict_index = _dict_list.findIndex((b) => {
      return b.id === dict_id;
    });
    dispatch(changeDict(dict_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dict/LOAD": {
      return { list: action.dict_list, is_loaded: true };
    }

    case "dict/CREATE": {
      const new_dict_list = [...state.list, action.dict];
      return { ...state, list: new_dict_list, is_loaded: true };
    }

    case "dict/UPDATE": {
      const new_dict_list = state.list.map((l, idx) => {
        if (parseInt(action.dict_index) === idx) {
          return {
            ...l,
            text: action.dict.text,
            mean: action.dict.mean,
            example: action.dict.example,
          };
        } else {
          return l;
        }
      });
      return { ...state, list: new_dict_list };
    }

    case "dict/DELETE": {
      const new_dict_list = state.list.filter((l, idx) => {
        return parseInt(action.dict_index) !== idx;
      });
      return { ...state, list: new_dict_list };
    }

    case "dict/LOADED": {
      return { ...state, is_loaded: action.loaded };
    }

    case "dict/CHANGE": {
      const new_dict_list = state.list.map((l, idx) => {
        if (parseInt(action.dict_index) === idx) {
          if (l.completed === true) {
            return { ...l, completed: false };
          } else {
            return { ...l, completed: true };
          }
        } else {
          return l;
        }
      });

      return { ...state, list: new_dict_list };
    }

    default:
      return state;
  }
}