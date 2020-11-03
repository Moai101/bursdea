import ideaReducer, { IdeaState } from './IdeaReducer';

import { combineReducers } from 'redux';

export interface AppState {
  idea:IdeaState
}

const appReducer = combineReducers<AppState>({
  idea:ideaReducer
});

export default appReducer;