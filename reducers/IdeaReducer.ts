import { IdeaAction, IdeaActionType } from '../actions/Idea';

export interface IdeaState {
  value: {
    postId:string;
    userId:string;
    win:string;
    wni:string;
    ideas:any[]
  };
}

const initialState: IdeaState = {
  value: {
    postId:"",
    userId:"",
    win:"",
    wni:"",
    ideas:[""]
  
  },
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