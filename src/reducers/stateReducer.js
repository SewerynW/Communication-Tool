import { TOGGLE_FILTER_FRIENDS, TOGGLE_CHAT } from "../actions/stateActions";

const initState = {
  activeFilter: false,
  chatFeatureStatus: false
};

export const stateReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER_FRIENDS:
      return {
        ...state,
        activeFilter: !state.activeFilter
      };
    case TOGGLE_CHAT:
      return {
        chatFeatureStatus: !state.chatFeatureStatus
      };
    default:
      return state;
  }
};
