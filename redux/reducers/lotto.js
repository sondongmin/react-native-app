import { getRandomInteger, getRandomIntegerFromArray, sort, alreadyExists } from '../../utils/utils';

export const GENERATE = 'GENERATE';
export const SHOW_EDIT = 'SHOW_EDIT';
export const EDIT = 'EDIT';
export const SELECT = 'SELECT';

const strategies = {
  GENERATE: generateTransformer,
  SHOW_EDIT: showEditTransformer,
  EDIT: editTransformer,
  SELECT: selectTransformer,
  __default__: state => state
};

export function generate() {
  return (dispatch, getState) => {
    const { list } = getState();
    const { config } = getState();
    dispatch({
      type: GENERATE,
      payload: {list: list.list, config: config},
    });
  }
}

export function showEdit() {
  return {
    type: SHOW_EDIT,
  }
}

export function edit(number) {
  return {
    type: EDIT,
    payload: number
  }
}

export function select(index) {
  return {
    type: SELECT,
    payload: index
  }
}

const handleGenerate = (list, config, state,) => {
  let times = 0;
  let chosen = [];
  let final = [];
  let even = [];
  let odd = [];
  
  while (times < 6) {
    times++;
    let number = null;
    if (times < 2 && config.smartToggle) {
      while (number === null || chosen.indexOf(number) !== -1) {
        number = getRandomIntegerFromArray(state.magic);
      }
    } else {
      while (number === null || chosen.indexOf(number) !== -1) {
        number = getRandomInteger(1, 49);
        if (config.toggleBalancer && (even.length > 3 && number % 2 === 0 || odd.length > 3 && number % 2 === 1)) {
          number++;
        }
      }
    }
    if (number % 2 === 0) {
      even.push(number);
    } else {
      odd.push(number);
    }
    final.push(number);
    chosen.push(number);
  }
  final = sort(final);
  if (config.toggleBan && alreadyExists(final, list)) {
    return handleGenerate(list);
  }
  return final
}

const handleEdit = (picks, index, number) => {
  let array = [...picks];
  if (picks === null || number === null) {
    return null;
  } else {
    array[index] = number;
    return array;
  }
}

const handleValidation = (picks, number) => {
  if (isNaN(number) || number < 1 || number > 49) {
    return false;
  } else if (picks.indexOf(number) !== -1) {
    return false;
  } else {
    return true;
  }
}

function generateTransformer(state, action) {
  let list = action.payload.list;
  let config = action.payload.config;
  let generated = handleGenerate(list, config, state);
  return {
    ...state,
    picks: generated,
  }
}

function showEditTransformer(state, action) {
  return {
    ...state,
    show: true,
  }
}

function editTransformer(state, action) {
  let number = action.payload;
  let integer = parseInt(number);
  let validation = handleValidation(state.picks, number);
  let modified = handleEdit(state.picks, state.selected, integer);

  if (validation && modified) {
    return {
      ...state,
      picks: sort(modified),
      selected: false,
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

function selectTransformer(state, action) {
  let index = action.payload
  return {
    ...state,
    selected: index,
  }
}


const initialState = {
    picks: null,
    selected: false,
    show: false,
    error: false,
    magic: [45, 4, 23, 38, 24, 48, 10, 15, 22, 41, 36, 20, 21, 31, 40]
};

export function lottoReducer(state = initialState, action) {
  const transformer = strategies[action.type] ?? strategies.__default__;
  return transformer(state, action);
}

export default lottoReducer