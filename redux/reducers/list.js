import { hasDuplicates, alreadyExists, sort } from '../../utils/utils';

export const REMOVE = 'REMOVE';
export const SHOW_ADD = 'SHOW_ADD';
export const ADD = 'ADD';

const strategies = {
  REMOVE: removeTransformer,
  SHOW_ADD: showAddTransformer,
  ADD: addTransformer,
  __default__: state => state
};

export function remove(index) {
  return {
    type: REMOVE,
    payload: index
  }
}

export function showAdd(index) {
  return {
    type: SHOW_ADD,
    payload: index
  }
}

export function add(numbers) {
  return {
    type: ADD,
    payload: numbers
  }
}

function addTransformer(state, action) {
  let string = (action.payload) ? action.payload : '';
  let array = (Array.isArray(string)) ? string : string.split(" ");
  array = sort(array);
  let boolean = handleValidation(array, state.list);
  if (boolean && !(state.list.length > 10)) {
    let list = [...state.list];
    list.push(array);
    return {
      ...state,
      list: list,
      show: false,
      error: false,
    }
  } else {
    return {
      ...state,
      error: true,
    }
  }
}

function showAddTransformer(state, action) {
  return {
    ...state,
    show: true,
  }
}

const handleValidation = (numbers, list) => {
  let boolean = true;
  if (numbers.length !== 6 || hasDuplicates(numbers) || alreadyExists(numbers, list)) {
    return false;
  }
  numbers.forEach(function(number) {
    if (isNaN(number) || number < 1 || number > 49) {
      boolean = false;
    }
  });
  return boolean;
}

function removeTransformer(state, action) {
  let index = action.payload;
  let list = state.list.filter((x, i) => i !== index);
  return {
    ...state,
    list: list,
  }
}

const initialState = {
    list: [
    ],
    show: false,
    error: false,
};

export function listReducer(state = initialState, action) {
  const transformer = strategies[action.type] ?? strategies.__default__;
  return transformer(state, action);
}

export default listReducer