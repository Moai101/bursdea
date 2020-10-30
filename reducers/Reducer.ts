import PublishReducer, { PublishState } from './PublishReducer';
import { combineReducers } from 'redux';

export interface AppState {
  publish: PublishState;
}

const appReducer = combineReducers<AppState>({
    publish: PublishReducer,
});

export default appReducer;