export enum IdeaActionType {
    ADD_IDEA = 'ADD_IDEA',
  }

  export interface IdeaAction {
    type: IdeaActionType;  
    value?: string;  
  }

  export const addIdea = (value: string): IdeaAction => ({
    type: IdeaActionType.ADD_IDEA,
    value,
  });