export const SMART_TOGGLE = 'SMART_TOGGLE';
export const TOGGLE_BALANCER = 'TOGGLE_BALANCER';
export const TOGGLE_BAN = 'TOGGLE_BAN';

const strategies = {
  SMART_TOGGLE: smartToggleTransformer,
  TOGGLE_BALANCER: toggleBalancerTransformer,
  TOGGLE_BAN: toggleBanTransformer,
  __default__: state => state
};

export function smartToggle() {
  return {
    type: SMART_TOGGLE
  }
}

export function toggleBalancer() {
  return {
    type: TOGGLE_BALANCER
  }
}

export function toggleBan() {
  return {
    type: TOGGLE_BAN
  }
}


function smartToggleTransformer(state, action) {
  return {
    ...state,
    smartToggle: !state.smartToggle
  }
}

function toggleBalancerTransformer(state, action) {
  return {
    ...state,
    toggleBalancer: !state.toggleBalancer
  }
}

function toggleBanTransformer(state, action) {
  return {
    ...state,
    toggleBan: !state.toggleBan
  }
}

const initialState = {
  smartToggle: false,
  toggleBalancer: false,
  toggleBan: false,
};

export function configReducer(state = initialState, action) {
  const transformer = strategies[action.type] ?? strategies.__default__;
  return transformer(state, action);
}

export default configReducer