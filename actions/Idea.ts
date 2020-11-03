export enum IdeaActionType {
    ADD_IDEA = 'ADD_IDEA',
  }

  export interface IdeaAction {
    type: IdeaActionType;  
    value?: {
      postId:string;
      userId:string;
      win:string;
      wni:string;
      ideas:any[]

    };  
  }

  export const addIdea = (value: 
    {
      postId:string;
      userId:string;
      win:string;
      wni:string;
      ideas:any[]

  }): IdeaAction => ({
    type: IdeaActionType.ADD_IDEA,
    value,
  });