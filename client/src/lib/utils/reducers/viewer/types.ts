import { Viewer } from '../../../graphql/types';

export enum ActionTypes {
  CREATE_VIEWER='CREATE_VIEWER',
  REMOVE_VIEWER='REMOVE_VIEWER'
}

interface CreateViewer {
  type: ActionTypes.CREATE_VIEWER;
  payload: Viewer;
}

interface RemoveViewer {
  type: ActionTypes.REMOVE_VIEWER;
}

export type Action = CreateViewer | RemoveViewer;
