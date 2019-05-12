import { TOGGLE_FILTER_FRIENDS } from "../actions/stateActions";

const initState = {
  activeFilter: false
};

export const stateReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER_FRIENDS:
      return {
        ...state,
        activeFilter: !state.activeFilter
      };
    default:
      return state;
  }
};
