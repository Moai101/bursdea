import { PublishAction, PublishActionType } from '../actions/PublishAction';


export interface PublishState {
    idea: string;
  }
  
  const initialState: PublishState = {
    idea: "",
  };


  const publishReducer = (
    state: PublishState = initialState,
    action: PublishAction,
  ): PublishState => {
    switch (action.type) {
      case PublishActionType.UPDATE_IDEA:
        return {
          ...state,
          idea: state.idea,
        };
      default:
        return state;
    }
  };
  
  export default publishReducer;