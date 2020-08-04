import { Viewer } from '../../../graphql/types';
import { Action, ActionTypes } from './types';

export const viewerReducer = (state: Viewer|void, action: Action): (Viewer|void) => {
  if (!action.type) return state;

  if (action.type === ActionTypes.CREATE_VIEWER) {
    state = action.payload;
    return state;
  }

  if (action.type === ActionTypes.REMOVE_VIEWER) {
    state = undefined;
    return state;
  }

  return state;
};
