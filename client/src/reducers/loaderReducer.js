import { SHOW_LOADER } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return action.payload;
    default:
      return state;
  }
}