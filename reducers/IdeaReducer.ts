import { IdeaAction, IdeaActionType } from '../actions/Idea';

export interface IdeaState {
  value: string;
}

const initialState: IdeaState = {
  value: "ideastate",
};

const ideaReducer = (
    state: IdeaState = initialState,
    action: IdeaAction,
  ): IdeaState => {
    switch (action.type) {
      case IdeaActionType.ADD_IDEA:
        return {
          ...state,
          value:action.value,
        };
      default:
        return state;
    }
  };
  
  export default ideaReducer;